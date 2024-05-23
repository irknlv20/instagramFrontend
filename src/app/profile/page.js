'use client'
import { useRouter } from "next/router";
import HeaderProfile from "@/components/headerProfile";
import UserProfile from "@/components/userProfile";
import NewPost from "@/components/newPost";
import Footer from "@/components/footer";
export default function ProfilePage(){
  return (
    <main>
      <div className="border-header">
        <div className="wrapper-page">
          <HeaderProfile></HeaderProfile>
        </div>
      </div>
      <div className="wrapper-page">
        <UserProfile></UserProfile>
      </div>
      <Footer></Footer>
    </main>
  )
}
