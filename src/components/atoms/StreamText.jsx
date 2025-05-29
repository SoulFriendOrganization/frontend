import { useState, useEffect } from "react";

function StreamText({text, speed = 50}) {
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

    return displayText;
}

export default StreamText;
