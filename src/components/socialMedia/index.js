'use client'
import { useDispatch, useSelector } from "react-redux";
import PostAbout from "../posts/postAbout";
import PostsFeed from "./postsFeed"
import StoriesFeed from "./storiesFeed"
import SuggestionsFeed from "./suggestionsFeed"
import React, { useEffect, useState } from "react";
import { getAllPosts } from "@/app/store/slices/postSlice";
import { getSuggestions } from "@/app/store/slices/userSlice";
export default function SocialMedia(){
    const dispatch = useDispatch();
    const [stories, setStories] = useState([
        {
            id: 1,
            username: 'irkenaliyev',
            fullname: 'Irkenaliyev Alibi',
            media: 'post2.png'
        },
        {
            id: 2,
            username: 't_azamatov',
            fullname: 'Timur Azamatov',
            media: 'post1.png'
        },
        {
            id: 3,
            username: 'ivanov999',
            fullname: 'Ivanov Dmitriu',
            media: 'post2.png'
        },
        {
            id: 4,
            username: 'johndoe',
            fullname: 'John Doe',
            media: 'post1.png'
        },
        {
            id: 5,
            username: 'janedoe',
            fullname: 'Jane Doe',
            media: 'post6.png'
        },
        {
            id: 6,
            username: 'alexsmith',
            fullname: 'Alex Smith',
            media: 'post1.png'
        },
        {
            id: 7,
            username: 'emilyjones',
            fullname: 'Emily Jones',
            media: 'post2.png'
        },
        {
            id: 8,
            username: 'michaelbrown',
            fullname: 'Michael Brown',
            media: 'post1.png'
        },
        {
            id: 9,
            username: 'sarahwilson',
            fullname: 'Sarah Wilson',
            media: 'post3.png'
        },
        {
            id: 10,
            username: 'robertjohnson',
            fullname: 'Robert Johnson',
            media: 'post1.png'
        },
        {
            id: 11,
            username: 'lisasmith',
            fullname: 'Lisa Smith',
            media: 'storyImage.png'
        },
        {
            id: 12,
            username: 'peterparker',
            fullname: 'Peter Parker',
            media: 'post1.png'
        },
        {
            id: 13,
            username: 'maryjones',
            fullname: 'Mary Jones',
            media: 'post6.png'
        },
        {
            id: 14,
            username: 'davidmiller',
            fullname: 'David Miller',
            media: 'post1.png'
        },
        {
            id: 15,
            username: 'susanwhite',
            fullname: 'Susan White',
            media: 'post2.png'
        },
        {
            id: 16,
            username: 'michaelwilson',
            fullname: 'Michael Wilson',
            media: 'post1.png'
        },
        {
            id: 17,
            username: 'kateadams',
            fullname: 'Kate Adams',
            media: 'post2.png'
        },
        {
            id: 18,
            username: 'danielthomas',
            fullname: 'Daniel Thomas',
            media: 'post1.png'
        },
        {
            id: 19,
            username: 'elizabethbrown',
            fullname: 'Elizabeth Brown',
            media: 'post5.png'
        },
        {
            id: 20,
            username: 'williamjones',
            fullname: 'William Jones',
            media: 'post1.png'
        }
    ]);
    const suggestions = useSelector((state) => state.user.suggestions);
    const [isEditing, setIsEditing] = useState(false);
    const posts = useSelector((state) => state.post.allPosts)
    const comments = useSelector((state) => state.comment.comments)
    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setSelectedPost(null);
        setIsModalOpen(false);
    }
    useEffect(()=>{
        dispatch(getAllPosts());
        dispatch(getSuggestions())
    },[])
    return (
        <section className="socialMedia">
            <div className="socialMedia-left">
                <StoriesFeed stories={stories}></StoriesFeed>
                {posts && <PostsFeed posts={posts} openModal={openModal} setIsEditing={setIsEditing}></PostsFeed>}
            </div>
            <div className="socialMedia-right">
                <SuggestionsFeed suggestions={suggestions}></SuggestionsFeed>
            </div>
            {isModalOpen && <div>
                <PostAbout selectedPost={selectedPost} setSelectedPost={setSelectedPost} isEditing={isEditing} setIsEditing={setIsEditing} comments={comments} closeModal={closeModal} ></PostAbout>
                </div>
            }
        </section>
    )
}