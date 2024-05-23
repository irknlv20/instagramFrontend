import { END_POINT } from "@/app/config";
import { subscribeTo, unSubscribeTo } from "@/app/store/slices/followerSlice";
import { getUser } from "@/app/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FeedSuggestion({suggestion}){
    const dispatch = useDispatch();
    const router = useRouter();
    const curUser = useSelector((state) => state.auth.currentUser);
    const [isFollowing, setIsFollowing] = useState(suggestion.isFollowing);
    const handleFollowAction = () => {
        dispatch(subscribeTo(curUser.login, suggestion.id))
        setIsFollowing(true);
    }
    const handleUnFollowAction = () => {
        dispatch(unSubscribeTo(curUser.login, suggestion.id))
        setIsFollowing(false);
    }
    const handleClickProfile = () => {
        dispatch(getUser(suggestion.login))
        router.push('/profile');
    }
    return(
        <div className="feedSuggestion">
            <div className="feedSuggestion-left">
                {suggestion.photoUrl && <img onClick={handleClickProfile} src={`${END_POINT}/${suggestion.photoUrl}`} alt=""/>}
                {!suggestion.photoUrl && <img onClick={handleClickProfile} src={`images/icons/profilePicture.svg`} alt="" />}
                <div>
                    <p>{suggestion.login}</p>
                    <span>Recommended for you</span>
                </div>
            </div>
            <div className="feedSuggestion-right">
                {isFollowing && <button onClick={handleUnFollowAction}>Followed</button>}
                {!isFollowing && <button onClick={handleFollowAction}>Follow</button>}
            </div>
        </div>
    )
}