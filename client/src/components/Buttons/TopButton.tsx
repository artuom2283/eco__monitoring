import React, {useEffect, useState} from "react";

export const TopButton = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowScrollToTop(true);
        } else {
            setShowScrollToTop(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="page-container">
            {showScrollToTop && (
                <button className="scroll-to-top" onClick={scrollToTop}>
                    Top
                </button>
            )}
        </div>
    )
}