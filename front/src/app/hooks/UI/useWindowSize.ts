import { useEffect, useState } from "react";

export const useWindowSize = () => {
    
    const [windowSize, setWindowSize] = useState<{width:number; height: number}>({
        width: window.innerWidth && 0,
        height: window.innerHeight && 0
    });

    const isMobile: boolean = window.innerWidth < 768;

    useEffect(() => {

        function handleResize(): void {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleResize)

        handleResize();

        return () => window.removeEventListener('resize', handleResize)
    },[])

    return {windowSize, isMobile};
}