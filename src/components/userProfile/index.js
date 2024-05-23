'use client'
import { useSelector } from "react-redux";
import Followers from "../followers";
import Posts from "../posts";
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import jwt, { decode } from 'jsonwebtoken'
import { logIn } from "@/app/store/slices/authSlice";
import { getFollowers, getProfiles, subscribeTo, setFollowing, unSubscribeTo } from "@/app/store/slices/followerSlice";
import { getUser, updateUserPhoto } from "@/app/store/slices/userSlice";
import { END_POINT } from "@/app/config";
import { getPosts } from "@/app/store/slices/postSlice";
import EditProfile from "./editProfile";
export default function UserProfile(){
    const dispatch = useDispatch()
    const curUser = useSelector((state) => state.auth.currentUser)
    const user = useSelector((state) => state.user.user)
    const followers = useSelector((state) => state.follower.followers)
    const profiles = useSelector((state) => state.follower.profiles)
    const posts = useSelector((state) => state.post.posts)
    const isFollowing = useSelector((state) => state.follower.isFollowing);
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
    const [isProfilesModalOpen, setIsProfilesModalOpen] = useState(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

    const closeModal = () => {
        setIsFollowersModalOpen(false);
        setIsProfilesModalOpen(false);
        setIsEditProfileModalOpen(false)
    }
    const handleSubscribeTo = () => {
        dispatch(subscribeTo(user.login, user.id))
    }
    const handleUnsubscribeTo = () => {
        dispatch(unSubscribeTo(user.login, user.id))
    }
    const handleUpdatePhoto = (e) => {
        const file = e.target.files[0];
        dispatch(updateUserPhoto(curUser?.login, file))
    }
    const renderBiography = () => {
        if(user.biography){
            const lines = user.biography.split('\n');
            return lines.map((line, index) => (
                <div key={index}>{line}</div>
            ));
        }
    };
    useEffect(() => {
        if(user && user.login){
            dispatch(getFollowers(user.login));
            dispatch(getProfiles(user.login));
            dispatch(getPosts(user.login));
        }
    }, [user])
    useEffect(() => {
        if(!user && curUser){
            dispatch(getUser(curUser?.login))
        }
    }, [curUser])
    useEffect(() => {
        if (followers) {
            let isFollowing = false;
            for (let person of followers) {
                if (person.follower.id === curUser?.id) {
                    isFollowing = true;
                    break;
                }
            }
            dispatch(setFollowing(isFollowing));
        } else {
            dispatch(setFollowing(false));
        }
    }, [user, followers, profiles]);
    return(
       <section>
            {user && <div className="user-profile">
                <div className="user-profile-img">
                    {user.photoUrl && <img src={`${END_POINT}/${user.photoUrl}`} alt="" className="user-profile-logo" />}
                    {!user.photoUrl && <img src={`images/icons/profilePicture.svg`} alt="" className="user-profile-logo" />}
                    {curUser?.login === user.login && <div>
                        <input  
                            onChange={handleUpdatePhoto} 
                            type="file" 
                            name="avatar" 
                            id="upload-photo"
                        />
                        <label className="user-profile-label" htmlFor="upload-photo">
                            <img src="images/icons/camera.svg" alt="" />
                        </label>
                    </div>}
                </div>
                <div className="user-profile-content">
                    <div className="user-profile-menu">
                        <h3>{user.login}</h3>
                        {!isFollowing && user.login!=curUser?.login && (<button
                                                            onClick={handleSubscribeTo} 
                                                            className="user-profile-followButton"
                                                            >Follow</button>)
                        }
                        {isFollowing && user.login!=curUser?.login && (<button
                                                            onClick={handleUnsubscribeTo} 
                                                            className="user-profile-followButton followedButton"
                                                            >Followed</button>)
                        }
                        {curUser?.id === user.id ? <button 
                            className="user-profile-burgerButton"
                            onClick={() => setIsEditProfileModalOpen(true)}
                        >
                            <img src="/images/icons/editIcon.png" alt="" />
                        </button> : ''}
                    </div>
                    <div className="user-profile-info">
                        <small><span>{posts?.length}</span> posts</small>
                        <button onClick={() => setIsFollowersModalOpen(true)}><small><span>{followers?.length}</span> followers</small></button>
                        <button onClick={() => setIsProfilesModalOpen(true)}><small><span>{profiles?.length}</span> following</small></button>
                    </div>
                    <span>{user.fullname}</span>
                    <small>{renderBiography()}</small>
                </div>
            </div>}
            <Posts posts={posts}></Posts>
            {isProfilesModalOpen && <Followers header='Following' users={profiles} closeModal={closeModal}></Followers>}
            {isFollowersModalOpen && <Followers header='Followers' users={followers} closeModal={closeModal}></Followers>}
            {isEditProfileModalOpen && <EditProfile closeModal={closeModal}></EditProfile>}
       </section>
    )
}