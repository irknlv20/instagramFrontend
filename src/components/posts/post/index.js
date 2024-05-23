'use client'
import { END_POINT } from "@/app/config";
import { getComments } from "@/app/store/slices/commentSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Post({post, onClick}){
    const postImg = `${END_POINT}/${post.photoURL}`
    let iconSrc = "";
    if (post.photoURL === 'multiple') {
        iconSrc = "/images/icons/multipleTypeIcon.svg";
    } else if (post.photoURL === 'video') {
        iconSrc = "/images/icons/videoTypeIcon.svg";
    }
    return(
        <div className="profile-post" onClick={onClick}>
            <div className="profile-post-image">
                <img src={postImg} alt="" />
            </div>
            {iconSrc && <img src={iconSrc} alt="" className="profile-post-typeIcon" />}
        </div>
    )
}

