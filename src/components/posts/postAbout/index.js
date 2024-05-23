import React, { useEffect, useState } from "react";
import Comment from "@/components/comment"
import { END_POINT } from "@/app/config";
import { useDispatch, useSelector } from "react-redux";
import { addComment, clear, getComments } from "@/app/store/slices/commentSlice";
import { deletePost, dislikePost, editPost, likePost, newPost, savePost, unSavePost } from "@/app/store/slices/postSlice";
import EmojiPicker from "@emoji-mart/react";
export default function PostAbout({selectedPost, setSelectedPost, comments, closeModal, isEditing, setIsEditing}){
    const dispatch = useDispatch();
    const imgUrl = `${END_POINT}/${selectedPost?.photoURL}`
    const curUser = useSelector((state) => state.auth.currentUser)
    const [content, setContent] = useState('');
    const [refCom, setRefCom] = useState(null);
    const [lastLiked, setLastLiked] = useState('')
    const [coms, setComs] = useState([]);
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [caption, setCaption] = useState(selectedPost.caption);
    const [location, setLocation] = useState(selectedPost.location);
    const biographyCom = {
        id: 100000000,
        content: selectedPost.caption,
        isLikedByMe: false,
        likes: [],
        userId: selectedPost.userId,
        postId: selectedPost.id,
        refComId: null,
        user: curUser,
        createdAt: selectedPost.createdAt,
        updatedAt: selectedPost.updatedAt,
        isBiography: true,
    }
    useEffect(() => {
        if(comments){
            setComs([]);
            setComs(prevComs => {
                const newComs = [];
                for(let com of comments){
                    if(!com.refComId){
                        newComs.push(com);
                    }
                }
                return [...prevComs, ...newComs];
            })
        }
    }, [comments])
    const closeModalFunc = () => {
        dispatch(clear());
        closeModal();
    }
    const showComments = coms?.map(com => (
        <React.Fragment key={com.id}>
            <Comment com={com} comments={comments} setContent={setContent} setRefCom={setRefCom} closeModal={closeModalFunc}></Comment>
        </React.Fragment>
    ))
    const handleChangeCaption = (event) => {
        const newText = event.target.value
        if(newText.length <= 200) {
            setCaption(newText);
        }
    }
    const handleChangeLocation = (event) => {
        const newText = event.target.value
        if(newText.length <= 30) {
            setLocation(event.target.value)
        }
    }
    const handleSubmit = e => {
        let postId = selectedPost.id;
        e.preventDefault();
        if(!content.trim() == ''){    
            dispatch(addComment(content, postId, refCom));
            setContent('')
        }       
    }
    const handleBurgerAction = () => {
        if(isBurgerOpen){
            setIsBurgerOpen(false)
        } else if(!isBurgerOpen){
            setIsBurgerOpen(true)
        }
    }
    const handleEmojiAction = () => {
        if(isEmojiOpen){
            setIsEmojiOpen(false)
        } else if(!isEmojiOpen){
            setIsEmojiOpen(true)
        }
    }
    const handleEmojiSelect = (emoji) => {
        setContent(prevContent => {
            return(prevContent + emoji.native)
        })
    }
    const likeSelectedPostFunc = () => {
        let newPost = {...selectedPost};
        const newUser = { userId: curUser.id, postId: selectedPost.id };
        newPost.likes = [...selectedPost.likes, newUser]; 
        newPost.isLikedByMe = true;
        setSelectedPost(newPost);
    }
    const dislikeSelectedPostFunc = () => {
        const newPost = { ...selectedPost };
        newPost.likes = selectedPost.likes.filter(item => item.userId !== curUser.id);
        newPost.isLikedByMe = false;
        setSelectedPost(newPost);
    }
    const saveSelectedPostFunc = () => {
        let newPost = {...selectedPost};
        newPost.isSavedByMe = true;
        setSelectedPost(newPost);
    }
    const unSaveSelectedPostFunc = () => {
        let newPost = {...selectedPost};
        newPost.isSavedByMe = false;
        setSelectedPost(newPost);
    }
    const handleEditPost = () => {
        if(caption && location){
            dispatch(editPost(curUser?.login, selectedPost.id, caption, location))
            setSelectedPost(prevPost => {
                const newPost = {...prevPost}
                newPost.location = location
                newPost.caption = caption
                return newPost
            })
            setIsEditing(false);
        } else {
            alert('Заполните обязательные поля!')
        }
    }
    const handleDeletePost = () => {
        const confirmed = window.confirm('Вы уверены, что хотите продолжить?');
        if (confirmed) {
            dispatch(deletePost(curUser?.login, selectedPost.id))
            closeModal();
        } else {
            
        }
    }
    useEffect(() => {
        let id = selectedPost.id;
        dispatch(getComments(id));
        if(selectedPost.likes.length > 0){
            setLastLiked(selectedPost.likes[selectedPost.likes.length-1].user)
        }
        if(selectedPost.likes.length === 0){
            setLastLiked(curUser)
        }
    }, [])

    useEffect(() => {
        if(content == ''){
            setRefCom(null);
        }
    }, [content])

    return(
        <section>
            <div className="modalWindow">
                <button 
                    onClick={closeModalFunc}
                    className="modalWindow-closeButton"
                >
                    &times;
                </button>
                <div className="postAbout-modal">
                    <div className="postAbout-left">
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className="postAbout-right">
                        <div className="postAbout-right-header">
                            <div>
                                {selectedPost.user.photoUrl && <img src={`${END_POINT}/${selectedPost.user?.photoUrl}`} alt="" className="user-profile-logo" />}
                                {!selectedPost.user.photoUrl && <img src={`images/icons/profilePicture.svg`} alt="" className="user-profile-logo" />}
                            </div>
                            <div>
                                <h4>{selectedPost.user?.login}</h4>
                                <span>{selectedPost.location}</span>
                            </div>
                            {!isEditing && <div
                                onClick={handleBurgerAction} 
                                className="postAbout-right-header-menu"
                            >
                                ...
                                {isBurgerOpen && <div class="postAbout-burger-menu">
                                    <div onClick={() => setIsEditing(true)}
                                        class="postAbout-burger-menu-item"
                                    >Edit Post</div>
                                    <div 
                                        onClick={handleDeletePost}
                                        class="postAbout-burger-menu-item"
                                    >Delete Post</div>
                                </div>}
                            </div>}
                        </div>
                        {!isEditing && <div className="postAbout-right-container">
                            <div className="comments">
                                <Comment com={biographyCom} ></Comment>
                                {showComments}
                            </div>
                            <div className="comments-action">
                                <div className="comments-action-buttons">
                                    <div>
                                        {selectedPost.isLikedByMe ? 
                                            <img 
                                                onClick={() => {
                                                    dispatch(dislikePost(selectedPost));
                                                    dislikeSelectedPostFunc();
                                                }}
                                                style={{width: '21px'}} 
                                                src="/images/icons/heartRed.svg" alt="" /> 
                                            : 
                                            <img 
                                                onClick={() => {
                                                    dispatch(likePost(selectedPost));
                                                    likeSelectedPostFunc();
                                                }}
                                                src="/images/icons/heart.svg" alt="" />
                                        }
                                        <img src="/images/icons/comment.svg" alt="" />
                                    </div>
                                    <div>
                                        {!selectedPost.isSavedByMe ? 
                                            <img 
                                                onClick={() => {
                                                    dispatch(savePost(selectedPost));
                                                    saveSelectedPostFunc();
                                                }}
                                                style={{width: '21px'}} 
                                                src="/images/icons/bookmark.svg" alt="" /> 
                                            : 
                                            <img 
                                                onClick={() => {
                                                    dispatch(unSavePost(selectedPost));
                                                    unSaveSelectedPostFunc();
                                                }}
                                                src="/images/icons/bookmarkBlack.svg" alt="" />
                                        }
                                    </div>
                                </div>
                                <div className="comments-action-info">
                                    <div>
                                        {selectedPost.likes.length > 0 && <img src={lastLiked.photoUrl ? `${END_POINT}/${lastLiked.photoUrl}` : 'images/icons/profilePicture.svg'} alt="" />}
                                        {selectedPost.likes.length > 1 && <p>Liked by <span>{lastLiked?.login}</span> and <span>{selectedPost.likes.length-1} others</span></p>}
                                        {selectedPost.likes.length == 1 && <p>Liked by <span>{lastLiked?.login}</span></p>}
                                        {selectedPost.likes.length == 0 && <p><span>Not Liked</span></p>}
                                    </div>
                                    <div>
                                        <small>1 DAY AGO</small>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} className="comments-action-form">
                                    <img
                                        onClick={handleEmojiAction} 
                                        src="/images/icons/smileIcon.svg" alt="" 
                                    />
                                    {isEmojiOpen && <div className="emoji-picker">
                                        <EmojiPicker 
                                            theme={'light'} 
                                            emojiSize={14} 
                                            perLine={6} 
                                            maxFrequentRows={0} 
                                            searchPosition={'none'}
                                            previewPosition={'none'}
                                            onEmojiSelect={handleEmojiSelect}
                                        />
                                    </div>}
                                    <input 
                                        name="content" 
                                        type="text" 
                                        value={content}
                                        onChange={e => setContent(e.target.value)}
                                        placeholder="Add a comment..."/>
                                    <button type="submit">Post</button>
                                </form>
                            </div>
                        </div>}
                        {isEditing && <div className="postAbout-right-container">
                            <div className="postAbout-right-container-edit">
                                <div className="postAbout-right-container-input">
                                    <small>Location*</small>
                                    <input
                                        value={location}
                                        type="text"
                                        onChange={handleChangeLocation}
                                        placeholder="Write a location..."
                                    />
                                    <span>{location.length}/{30 - location.length}</span>
                                </div>
                                <div className="postAbout-right-container-textarea">
                                    <small>Caption*</small>
                                    <textarea
                                        value={caption}
                                        onChange={handleChangeCaption}
                                        rows="10"
                                        cols="50"
                                        maxLength="200"
                                        placeholder="Write a caption..."
                                    ></textarea>
                                    <span>{caption.length}/{200 - caption.length}</span>
                                </div>
                                <button onClick={handleEditPost}>Apply</button>
                                <button onClick={() => setIsEditing(false)}>Go back</button>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </section>
    )
}