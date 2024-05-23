'use client'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { logIn } from "@/app/store/slices/authSlice"
export default function Footer(){
    
    return(
       <div className="footer">
            <div className="footer-links">
                <a href="">Meta</a>
                <a href="">About</a>
                <a href="">Blog</a>
                <a href="">Jobs</a>
                <a href="">Help</a>
                <a href="">API</a>
                <a href="">Privacy</a>
                <a href="">Terms</a>
                <a href="">Top Accounts</a>
                <a href="">Locations</a>
                <a href="">Instagram Lite</a>
                <a href="">Contact Uploading & Non-Users</a>
                <a href="">Meta Verified</a>
            </div>
            <div className="footer-links">
                <a href="" className="footer-links-language">
                    English
                    <img src="/images/arrowDown.svg" alt="" />
                </a>
                <span>© 2023 Instagram from Meta</span>
            </div>
       </div>
    )
}