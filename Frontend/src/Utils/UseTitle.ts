import { useEffect } from "react";

function UseTitle(title: string) {
    useEffect(() => {
        document.title = title;
    }, []);
}
export default UseTitle;