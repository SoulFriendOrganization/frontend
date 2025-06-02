import { useState, useEffect } from "react";

function StreamText({text, speed = 50, autoNext = false,  setNext= null}) {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [index, text, speed]);

    if (autoNext && index >= text.length) {
        setTimeout(() => {
            if (setNext) {
                setNext(true);
            }
            autoNext = false;
        }, 1000);
    }

    return displayText;
}

export default StreamText;
