'use client'
import Post from "./post";
import React, { use, useEffect, useState } from "react";
import PostAbout from "./postAbout";
import { useSelector } from "react-redux";

export default function Posts({posts}){
    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const comments = useSelector((state) => state.comment.comments)

    const openModal = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setSelectedPost(null);
        setIsModalOpen(false);
    }
    const showPosts = posts?.map(post => (
            <React.Fragment key={post.id}>
                <Post post={post} onClick={() => openModal(post)}/>
            </React.Fragment>
    ))
    return(
        <section>
            <div className="profile-media">
                <div>
                    <img src="/images/icons/postsIcon.svg" alt="" />
                    <span>POSTS</span>
                </div>
            </div>
            <div className="profile-posts">
                {posts!=null && showPosts}
            </div>
            {isModalOpen && <div>
                <PostAbout selectedPost={selectedPost} setSelectedPost={setSelectedPost} isEditing={isEditing} setIsEditing={setIsEditing} comments={comments} closeModal={closeModal}></PostAbout>
                </div>
            }
        </section>
  )
}