'use client'
import HeaderProfile from "@/components/headerProfile";
import Footer from "@/components/footer"
import SocialMedia from "@/components/socialMedia";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../store/slices/postSlice";
export default function Home(){
    
  return (
    <main>
      <div className="border-header">
        <div className="wrapper-page">
          <HeaderProfile></HeaderProfile>
        </div>
      </div>
      <div className="wrapper-page">
        <SocialMedia></SocialMedia>
      </div>
      <Footer></Footer>
    </main>
  )
}
