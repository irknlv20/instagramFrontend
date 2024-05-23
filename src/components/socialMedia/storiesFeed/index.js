'use client'
import React, { useState } from "react"
import FeedStory from "./feedStory"
export default function StoriesFeed({stories}){

    const visiblePlate = 580.54;
    const cardInPlate = 7;
    const maxScroll = (stories.length/cardInPlate * visiblePlate)-visiblePlate;
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleClickLeft = () => {
        setScrollPosition((prevPosition) =>
            prevPosition - visiblePlate < 0 ? 0 : prevPosition - visiblePlate
        );
    }
    const handleClickRight = () => {
        setScrollPosition((prevPosition) =>
            prevPosition + visiblePlate > maxScroll ? maxScroll : prevPosition + visiblePlate
        );
    }
    const showStories = stories.map((story, index) => {
        return (
            <React.Fragment key={index}>
                <FeedStory story={story}></FeedStory>
            </React.Fragment>
        )    
    })
    return(
    <section className="storiesFeed">
        <div
            style={{transform: `translateX(-${scrollPosition}px)`}} 
            className="storiesFeed-scroll"
        >
            {showStories}       
        </div>
        <div className="storiesFeed-navigation">
            <button className={`${scrollPosition === 0 ? '' : 'visible'}`}
                disabled={scrollPosition === 0}
                onClick={handleClickLeft}
            >
                <img src="/images/icons/buttonArrow.svg" alt="" />
            </button>
            <button className={`${scrollPosition === maxScroll ? '' : 'visible'}`}
                disabled={scrollPosition === maxScroll}
                onClick={handleClickRight}
            >
                <img src="/images/icons/buttonArrow.svg" alt="" />
            </button>
        </div>
    </section>
    )
}