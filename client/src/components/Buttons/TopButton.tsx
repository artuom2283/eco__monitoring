import React from "react";

export const TopButton = () => {
    return (
        <div className="top-button-container">
            <button className="top-button" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                Top
            </button>
        </div>
    )
}