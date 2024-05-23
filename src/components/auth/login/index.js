'use client'
import { sendLogin } from "@/app/store/slices/authSlice";
import { useEffect } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
export default function Login(){
    const router = useRouter();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const isAuth = useSelector((state) => state.auth.isAuth)
    const dispatch = useDispatch()
    const loginFunc = () => {
        dispatch(sendLogin(login, password));
    }
    
    useEffect(() => {
        if(isAuth){
            router.push('/profile')
        }
    },[isAuth])

    return (
    <div className="login">
        <div className="auth-left">
            <img src="/images/loginLogo.svg" alt="" />
        </div>
        <div className="login-container">
            <div className="auth-main auth-main-login">
                <img src="/images/logo.svg" className="auth-main-logo"></img>
                <form action="" className="auth-form">
                    <input 
                        type="text"
                        placeholder="Phone number, username, or email"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                        onClick={()=>loginFunc()}
                        type="button"
                        className="auth-button">
                            Log in
                    </button>
                </form>
                <span>OR</span>
                <a href="" className="auth-button auth-button-facebook-blue">
                        <img src="/images/facebookBlue.svg" alt="" />
                        Log in with Facebook
                </a>
                <a href="" className="auth-password-link">Forgot password?</a>
            </div>
            <div className="auth-link">
                <p>Don't have an account? <Link href="/">Sign up</Link></p>
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
    </div>
    )
}