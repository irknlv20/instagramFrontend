export default function FeedStory({story}){
    return(
        <button className="feedStory">
            <div className="feedStory-img">
                <img src="/images/userProfilePicture.png" alt="" />
            </div>
            <p>{story.username}</p>
        </button>
    )
}