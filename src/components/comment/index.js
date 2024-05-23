import { useDispatch, useSelector } from "react-redux";
import { getComments, deleteComment, likeComment, dislikeComment } from "@/app/store/slices/commentSlice";
import axios from "axios";
import { END_POINT } from "@/app/config";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/app/store/slices/userSlice";

export default function Comment({com, comments, setContent, setRefCom, constRefCom, closeModal}){
    const curUser = useSelector((state) => state.auth.currentUser)
    const dispatch = useDispatch();
    const router = useRouter();
    const comId = com.id;
    const postId = com.postId;
    let currentDate = new Date();
    let commentDate = new Date(com.createdAt);
    let timeDifferenceInMilliseconds = currentDate - commentDate;
    let timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
    let timeDifferenceInHours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
    let timeDifferenceInDays = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));
    let timeDifferenceInWeeks = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 7));
    const [refComs, setRefComs] = useState([]);
    const [filterContent, setFilterContent] = useState('');
    const handleClickTag = (clickedLogin) => {
        if(clickedLogin){
            dispatch(getUser(clickedLogin))
            closeModal();
            router.push('/profile')
        }
    }
    useEffect(()=>{
        if(comments){
            let newComs = [];
            for(let refCom of comments){
                if(refCom.refComId == comId){
                    newComs.push(refCom);
                }
            }
            setRefComs(newComs);
        }
        if (com) {
            let newContent = com.content;
            const regex = /@(\w+)/;
            const match = newContent.match(regex);
            if (match) {
                const index = match.index;
                const loginTag = match[0];
                const login = match[1];
                newContent = (
                    <>
                        {newContent.slice(0, index)}
                        <small
                            onClick={() => handleClickTag(login)} 
                            className="comment-content"
                        >{loginTag}</small>
                        {newContent.slice(index + loginTag.length)}
                    </>
                )
                setFilterContent(newContent)
            } else {
                setFilterContent(newContent)
            }
        }
    }, [com])
    const setContentFunc = () => {
        setContent('@' + com.user.login + ', ');
        if(constRefCom){
            setRefCom(constRefCom.id)
        } else {
            setRefCom(com.id);
        }
    }

    return(
        <section>
            <div className="comment">
                <div className="comment-left">
                    <div className="comment-left-logo">
                        <img onClick={() => handleClickTag(com.user.login)} src={`${END_POINT}/${com.user.photoUrl}`} alt="" />
                    </div>
                    <div className="comment-left-container">
                        <div>
                            <p><span onClick={() => handleClickTag(com.user.login)}>{com.user.login}</span>{filterContent}</p>
                        </div>
                        {!com.isBiography?(<div>
                            {timeDifferenceInMinutes < 60 ? (<span>{timeDifferenceInMinutes}m </span>) : null}
                            {timeDifferenceInHours < 24 && timeDifferenceInMinutes >= 60 ? (<span>{timeDifferenceInHours}h </span>) : null}
                            {timeDifferenceInDays < 7 && timeDifferenceInHours >= 24 ? (<span>{timeDifferenceInDays} d</span>) : null}
                            {timeDifferenceInWeeks < 4 && timeDifferenceInDays >= 7 ? (<span>{timeDifferenceInWeeks} w</span>) : null}

                            {com.likes.length == 1 && <small>{com.likes.length} like</small>}
                            {com.likes.length > 1 && <small>{com.likes.length} likes</small>}
                            
                            <small onClick={setContentFunc}>Reply</small>
                            
                            {com.userId == curUser.id && <small onClick={() => dispatch(deleteComment(comId, postId))}>Delete</small>}
                        </div>):''}  
                    </div>
                </div>
                {!com.isBiography?(<div className="comment-right">
                    {!com.isLikedByMe && 
                        <button onClick={() => dispatch(likeComment(com.id, com.postId))}>
                            {com.isLikedByMe ? <img src="/images/icons/heartRed.svg" alt="" /> : <img src="/images/icons/heart.svg" alt="" />}
                        </button> 
                    }
                    {com.isLikedByMe && 
                        <button onClick={() => dispatch(dislikeComment(com.id, com.postId))}>
                            {com.isLikedByMe ? <img src="/images/icons/heartRed.svg" alt="" /> : <img src="/images/icons/heart.svg" alt="" />}
                        </button> 
                    }
                </div>):''}
            </div>
            {
                refComs && refComs?.map((comRef, index) => (
                    <div className="refCom">
                        <Comment key={index} com={comRef} setContent={setContent} setRefCom={setRefCom} constRefCom={com} ></Comment>
                    </div>
                ))
            }
        </section>
    )
}

