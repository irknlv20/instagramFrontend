import { END_POINT } from "@/app/config";
import { unSubscribeTo } from "@/app/store/slices/followerSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Follower({profile}){
    const dispatch = useDispatch();
    const curUser = useSelector((state) => state.auth.currentUser);
    const user = useSelector((state) => state.user.user);
    let photoUrl, fullname, login, type;
    if(profile && profile.follower){
        type = 'followers'
        if(profile.follower.photoUrl){
            photoUrl = profile.follower.photoUrl;
        }
        if(profile.follower.login){
            login = profile.follower.login;
        }
        if(profile.follower.fullname){
            fullname = profile.follower.fullname;
        }
    }   
    if(profile && profile.profile){
        type = 'following'
        if(profile.profile.photoUrl){
            photoUrl = profile.profile.photoUrl;
        }
        if(profile.profile.login){
            login = profile.profile.login;
        }
        if(profile.profile.fullname){
            fullname = profile.profile.fullname;
        }
    } 
    const handleUnSubscribeTo = () => {
        if(type === 'followers'){
            if(profile && profile.followerId){
                dispatch(unSubscribeTo(curUser.login, profile.followerId))
                console.log(profile.followerId)
            }
        } else if (type=== 'following') {
            if(profile && profile.profileId){
                dispatch(unSubscribeTo(curUser.login, profile.profileId))
                console.log(profile.profileId)
            }
        }
    }
    return(
        <div className="follower">
            <div className="follower-left">
                <div className="follower-left-img">
                    {photoUrl && <img src={`${END_POINT}/${photoUrl}`} alt="" />}
                    {!photoUrl && <img src="/images/icons/profilePicture.svg" alt="" />}
                </div>
                <div className="follower-left-info">
                    <div>
                        <h4>{login}</h4>
                    </div>
                    <span>{fullname}</span>
                </div>
            </div>
            <div className="follower-right">
                {type === 'following' && curUser.login===user.login ? <button onClick={handleUnSubscribeTo}>Remove</button> : ''}
            </div>
        </div>
    )
}