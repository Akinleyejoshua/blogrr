import { useEffect, useRef, useState } from "react";
import { Space } from "./Space";
import { FaBold, FaHeading, FaItalic, FaList, FaParagraph } from "react-icons/fa6";
import { removeFromString } from "@/utils/helpers";

export const Draft = ({ val, onChange }) => {
    const contentRef = useRef(null);
    const previewRef = useRef(null);
    const [typing, setTyping] = useState(false);
    const [onPreview, setOnPreview] = useState(false);
    const [content, setContent] = useState("");
if (val != ""){
    setTyping(true)
}
    const handleFormatting = (type) => {

        setTyping(true);
        switch (type) {
            case "h":
                contentRef.current.innerHTML += "<h1>``</h1>";
                break;

            case "p":
                contentRef.current.innerHTML += "<p>``</p>";

                break;
            case "i":
                contentRef.current.innerHTML += "<i>``</i>";

                break;
            case "li":
                contentRef.current.innerHTML += "<br><ul><li>``</li></ul>";

                break;
            case "b":
                contentRef.current.innerHTML += "<b>``</b>";

                break;
            case "tag":
                contentRef.current.innerHTML += "<div class='flex row items-center'><p class='tag'>``</p><div>``</div></div>";
                break;
            
        }
    };

    const handleText = (text) => {
        const formatedText = removeFromString(text, "`");
        setContent(formatedText);

        onChange(formatedText);
        if (text.length > 0) {
            setTyping(true);
        } else {
            setTyping(false);
        }
    };

    useEffect(() => {
        const updateContent = () => {
            const linkRegex =
                /((http|https):\/\/)?(wwww\.)?([^\s]+)(\.[^\s])*(\/[^\s]*)?/g;
            let newContent = contentRef.current.innerHTML.replace(
                linkRegex,
                (url) => {
                    return `<a href=${url}>${url}</a>`;
                }
            );
        };

        updateContent();
    }, [contentRef]);

    return (
        <div className="draft">
            <div className="tools flex">
                <div
                    className="format-btn pointer c-white"
                    onClick={() => handleFormatting("h")}
                >
                    <FaHeading />
                </div>

                <Space val={".3rem"} />

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("p")}
                >
                    <FaParagraph />
                </div>
                <Space val={".3rem"} />

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("i")}
                >
                    <FaItalic />
                </div>
                <Space val={".3rem"} />

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("li")}
                >
                    <FaList />
                </div>
                <Space val={".3rem"} />

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("b")}
                >
                    <FaBold />
                </div>
                <Space val={".3rem"} />

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("tag")}
                >
                    ``
                </div>
                
            </div>

            <Space val={".3rem"} />
            <div className={`textarea ${onPreview ? 'not-visible' : 'visible'}`}>
                <div
                    contentEditable={true}
                    className="text"
                    onInput={(e) => handleText(e.target.innerHTML)}
                    ref={contentRef}
                    dangerouslySetInnerHTML={{ __html: val }}
                ></div>
                {!typing && (
                    <p className="placeholder dim">What do you want to publish?</p>
                )}
            </div>

            <div className={`textarea ${!onPreview ? 'not-visible' : 'visible'}`}>
                <div
                    className="text"
                    ref={previewRef}
                    dangerouslySetInnerHTML={{ __html: content }}
                ></div>

            </div>

            <Space val={".3rem"} />

            {onPreview ? (
                <small className="pointer under" onClick={() => setOnPreview(false)}>Continue editing</small>
            ) : (
                <small className="pointer under" onClick={() => setOnPreview(true)}>Preview</small>
            )}
        </div>
    );
};
