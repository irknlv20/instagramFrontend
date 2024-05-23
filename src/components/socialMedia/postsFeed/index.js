import React from "react"
import FeedPost from "./feedPost"
export default function PostsFeed({posts, openModal, setIsEditing}){
    const showPosts = posts.map((post, index) => {
        return(
            <React.Fragment key={index}>
                <FeedPost post={post} openModal={openModal} setIsEditing={setIsEditing}></FeedPost>
            </React.Fragment>
        )
    }) 
    return(
    <section className="postsFeed">
        {showPosts}
    </section>
    )
}