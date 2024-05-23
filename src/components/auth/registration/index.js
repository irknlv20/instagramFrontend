'use client'
import Footer from "@/components/footer";
import React, { useState } from 'react';
import Link from 'next/link';
import { sendRegistration } from "@/app/store/slices/authSlice";
import { useDispatch } from "react-redux";
export default function Registration(){
    const dispatch = useDispatch();
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    return (
        <div className="auth">
            <div className="auth-main">
                <img src="/images/logo.svg"></img>
                <p>Sign up to see photos and videos from your friends.</p>
                <a href="" className="auth-button">
                    <img src="/images/facebook.svg" alt="" />
                    Log in with Facebook
                </a>
                <span>OR</span>
                <form className="auth-form">
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        placeholder="Mobile Number or Email"
                    />
                    <input 
                        type="text" 
                        value={fullname} 
                        onChange={(e)=>setFullname(e.target.value)} 
                        placeholder="Full Name"
                    />
                    <input 
                        type="text" 
                        value={login} 
                        onChange={(e)=>setLogin(e.target.value)} 
                        placeholder="Username"
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        placeholder="Password"
                    />
                    <span>People who use our service may have uploaded your contact information to Instagram. <a href="">Learn More</a></span>
                    <span>By signing up, you agree to our <a href="">Terms</a> , <a href="">Privacy Policy</a> and <a href="">Cookies Policy.</a></span>
                    <button
                        onClick={()=> dispatch(sendRegistration(email, login, password, fullname))}
                        className="auth-button"
                        type="button"
                    >
                            Sign Up
                    </button>
                </form>
            </div>
            <div className="auth-link">
                <p>Have an account? <Link href="/login">Log in</Link></p>
            </div>
            <span>Get the app.</span>
            <div className="auth-links">
                <a href="">
                    <img src="/images/googlePlay.svg" alt="" />
                </a>
                <a href="">
                    <img src="/images/microsoft.svg" alt="" />
                </a>
            </div>
        </div>
    )
}