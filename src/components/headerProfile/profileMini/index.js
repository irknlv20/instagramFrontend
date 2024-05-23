import { END_POINT } from "@/app/config";
import { getUser } from "@/app/store/slices/userSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
export default function ProfileMini({profile}){
    const dispatch = useDispatch();
    const router = useRouter();
    let photoUrl = profile.photoUrl;
    const changeProfile = () => {
        if(profile && profile.login){
            dispatch(getUser(profile.login));
            router.push('/profile');
        }
    }
    return(
        <div onClick={changeProfile} className="follower profileMini">
            <div className="follower-left">
                <div className="follower-left-img profile-mini-img">
                    {photoUrl && <img src={`${END_POINT}/${photoUrl}`} alt="" />}
                    {!photoUrl && <img src="/images/icons/profilePicture.svg" alt="" />}
                </div>
                <div className="follower-left-info profile-mini-flex">
                    <h4 className="profile-mini">{profile.login}</h4>
                    <small className="profile-mini">{profile.fullname}</small>
                </div>
            </div>
        </div>
    )
}