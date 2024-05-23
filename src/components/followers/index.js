import React from "react"
import { useSelector } from "react-redux"
import Follower from "./follower"

export default function Followers({header, users, closeModal}){
    const followers = users;
    const showFollowers = followers.map((follower, index) => {
        return(
            <React.Fragment key={index}>
                <Follower profile={follower}></Follower>
            </React.Fragment>
        )
    })
    return(
        <section>
            <div className="modalWindow">
                <div className="followers">
                    <div className="followers-header">
                        <h4>{header}</h4>
                        <button 
                            onClick={closeModal}
                            className="followers-header-closeButton"
                        >
                            &times;
                        </button>
                    </div>
                    <div className="followers-container">
                        {showFollowers}
                    </div>
                </div>
            </div>
        </section>
    )
}