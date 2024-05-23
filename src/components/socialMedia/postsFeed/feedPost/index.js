'use client'
import { END_POINT } from "@/app/config";
import { deletePost, dislikePost, likePost } from "@/app/store/slices/postSlice";
import { getUser } from "@/app/store/slices/userSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";

export default function feedPost({post, openModal, setIsEditing}){
    const dispatch = useDispatch();
    const router = useRouter();
    const curUser = useSelector((state) => state.auth.currentUser)
    const [expanded, setExpanded] = useState(true);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const toggleDescription = ()=>{
        setExpanded(!expanded);
    }
    let currentDate = new Date();
    let postDate = new Date(post.createdAt);
    let timeDifferenceInMilliseconds = currentDate - postDate;
    let timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
    let timeDifferenceInHours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
    let timeDifferenceInDays = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));
    let timeDifferenceInWeeks = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 7));
    const handleClickTag = (login) => {
        if(login){
            dispatch(getUser(login));
            router.push('/profile')
        }
    }
    const handleBurgerAction = () => {
        if(isBurgerOpen){
            setIsBurgerOpen(false)
        } else if(!isBurgerOpen){
            setIsBurgerOpen(true)
        }
    }
    const handleDeletePost = () => {
        const confirmed = window.confirm('Вы уверены, что хотите продолжить?');
        if (confirmed) {
            dispatch(deletePost(curUser?.login, post.id))
            setIsBurgerOpen(false);
        } else {
            
        }
    }
    const handleBurgerEdit = () => {
        openModal(post)
        setIsEditing(true);
        setIsBurgerOpen(false);
    }
    return(
        <div className="feedPost">
            <div className="feedPost-header">
                <div className="feedPost-header-item">
                    <button className="feedStory feedPost-logo">
                        <div
                            onClick={() => handleClickTag(post.user.login)} 
                            className="feedPost-logo-img">
                            {post.user.photoUrl && <img src={`${END_POINT}/${post.user.photoUrl}`} alt="" className="user-profile-logo" />}
                            {!post.user.photoUrl && <img src={`images/icons/profilePicture.svg`} alt="" className="user-profile-logo" />}
                        </div>
                    </button>
                    <div>
                        <h5 className="pointer" onClick={() => handleClickTag(post.user.login)}>{post.user.login}</h5>
                        <span>{post.location}</span>
                    </div>
                </div>
                <button className="feedPost-burger"  onClick={handleBurgerAction}>...</button>
                {isBurgerOpen && <div class="postAbout-burger-menu">
                    <div onClick={handleBurgerEdit}
                        class="postAbout-burger-menu-item"
                    >Edit Post</div>
                    <div 
                        onClick={handleDeletePost}
                        class="postAbout-burger-menu-item"
                    >Delete Post</div>
                </div>}
            </div>
            <div className="feedPost-content">
                {<img src={`${END_POINT}/${post.photoURL}`} alt="" />}
            </div>
            <div className="feedPost-info">
                <div className="feedPost-info-action">
                    <div>
                        {post.isLikedByMe ? 
                            <img
                                onClick={() => {
                                    dispatch(dislikePost(post));
                                }} 
                                src="/images/icons/heartRed.svg" alt="" /> 
                            : 
                            <img 
                                onClick={() => {
                                    dispatch(likePost(post));
                                }}
                                src="/images/icons/heart.svg" alt="" />
                        }
                        <img onClick={() => openModal(post)} src="/images/icons/comment.svg" alt="" />
                    </div>
                </div>
                <p>{post.likes?.length} {post.likes?.length == 1 ? 'like' : 'likes'}</p>
                <div>
                    <div className="feedPost-info-text">
                        <h5>{post.user.login}
                            <span>
                                {post.caption.length > 30 ? (expanded ? post.caption.slice(0, 30): post.caption) : post.caption}
                            </span>                           
                            {post.caption.length > 30 ? (<small onClick={toggleDescription}>
                                {expanded ? '...more' : '...less'}
                            </small>): null}
                        </h5>
                    </div>
                </div>
                <small onClick={() => openModal(post)}>View all comments</small>
                <span>
                    {timeDifferenceInMinutes < 60 ? (<span>{timeDifferenceInMinutes} MINUTES </span>) : null}
                    {timeDifferenceInHours < 24 && timeDifferenceInMinutes >= 60 ? (<span>{timeDifferenceInHours} HOURS </span>) : null}
                    {timeDifferenceInDays < 7 && timeDifferenceInHours >= 24 ? (<span>{timeDifferenceInDays} DAYS </span>) : null}
                    {timeDifferenceInWeeks < 4 && timeDifferenceInDays >= 7 ? (<span>{timeDifferenceInWeeks} WEEKS </span>) : null}
                    AGO
                </span>
            </div>
        </div>
    )
}