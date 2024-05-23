import React, { useState } from "react"
import FeedSuggestion from "./feedSuggestion"
export default function SuggestionsFeed({suggestions}){
    const [maxIndex, setMaxIndex] = useState(5);
    const showSuggestions = suggestions.map((suggestion, index) => {
        if(index<maxIndex){
            return (
                <React.Fragment key={index}>
                    <FeedSuggestion suggestion={suggestion}></FeedSuggestion>
                </React.Fragment>
            )    
        }
    })
    return(
    <section className="suggestionsFeed">
        <div className="suggestionsFeed-header">
            <h5>Suggestions For You</h5>
            {maxIndex==5 ? <button onClick={() => setMaxIndex(suggestions.length)}>See More</button>: <button onClick={() => setMaxIndex(5)}>See Less</button>}
        </div>
        <div className="suggestionsFeed-container">
            {showSuggestions}
        </div>
    </section>
    )
}