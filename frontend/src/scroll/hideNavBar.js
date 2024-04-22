import { useState, useEffect } from "react";

export function useScroll() {

    const [scrollDirection, setScrollDirection] = useState("up");
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) {
            setScrollDirection("down");
        } else {
            setScrollDirection("up");
        }


        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);

       
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    });

    return (
        scrollDirection
    );
}