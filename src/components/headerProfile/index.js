'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import NewPost from "@/components/newPost";
import { ReactSVG } from 'react-svg';
import { useDispatch, useSelector } from 'react-redux';
import ProfileMini from './profileMini';
import { getUser, getUserList } from '@/app/store/slices/userSlice';
import jwt, { decode } from 'jsonwebtoken'
import { logIn } from "@/app/store/slices/authSlice";

export default function HeaderProfile(){
    const dispatch = useDispatch();
    const curUser = useSelector((state) => state.auth.currentUser)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [inputValue, setInputValue] = useState('');
    const searchList = useSelector((state) => state.user.searchList);
    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value); 
    };
    const handleToProfile = () => {
        dispatch(getUser(curUser.login));
    }
    const handleResetInput = () => {
        setInputValue('');
    }
    const showList = searchList.map((profile, index) => {
        return(
            <ProfileMini profile={profile} key={index}></ProfileMini>
        )
    })
    useEffect(()=>{
        dispatch(getUserList(inputValue));
    }, [inputValue]);
    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('token'));
        if(token){
            const decoded = jwt.decode(token);
            if(decoded.exp * 1000000 > Date.now()){
                dispatch(logIn({token}))  
            } else {
                localStorage.removeItem('token')
            }
        }; 
    },[]);
    return (
        <section>
            <div className="header-profile">
                <div className="header-profile-logo">
                    <Link href='/home'>
                        <img src="/images/logo.svg" alt="" />
                    </Link>
                </div>
                <div className="header-profile-search">
                    <input 
                        id="searchInput" 
                        type="text" 
                        placeholder="Search" 
                        value={inputValue}
                        onChange={handleInputChange} 
                        autoComplete='off'
                    />
                    {inputValue ? (
                        <div className="header-profile-search-list">
                            {showList}
                        </div>) : ''
                    }
                    {inputValue ? (
                        <span onClick={handleResetInput}>&times;</span>
                    ) : ''}
                </div>
                <div className="header-profile-menu">
                    <Link onClick={handleToProfile} href="/profile">
                        <img src="/images/icons/home.svg" alt="" />
                    </Link>
                    <a href="">
                        <img src="/images/icons/direct.svg" alt="" />
                    </a>
                    <button
                        onClick={openModal}
                    >
                        <img src="/images/icons/newPost.svg" alt="" />
                    </button>
                    <a href="">
                        <img src="/images/icons/news.svg" alt="" />
                    </a>
                    <a href="">
                        <img src="/images/icons/like.svg" alt="" />
                    </a>
                    <a href="/profile">
                        <img src="/images/icons/profilePicture.svg" alt="" />
                    </a>
                </div>
            </div>
            <NewPost isModalOpen={isModalOpen} closeModal={closeModal}></NewPost>
        </section>
    )
}