import { useEffect, useRef, useState } from "react";
import { Space } from "./Space";
import { FaArrowRight, FaBold, FaHeading, FaItalic, FaList, FaParagraph, FaUnderline } from "react-icons/fa6";
import { removeFromString } from "@/utils/helpers";

export const Draft = ({ val, onChange }) => {
    const contentRef = useRef(null);
    const previewRef = useRef(null);
    const toolbarRef = useRef(null);
    const cursorRef = useState(null);
    const [typing, setTyping] = useState(false);
    const [onPreview, setOnPreview] = useState(false);
    const [content, setContent] = useState("");
    const [lastPoint, setLastPont] = useState(0);

    useEffect(() => {

        if (val !== undefined) {
            setTyping(true);
            if (contentRef.current.innerHTML == "") {
                contentRef.current.innerHTML += val

            }
        }
    }, [val])

    const appendElementAtCursor = (element) => {
        lastPoint.insertNode(element);
        lastPoint.setStartAfter(element);
        lastPoint.collapse(true);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(lastPoint);
        contentRef.current.focus();

    }

    const handleFormatting = (type) => {

        setTyping(true);

        switch (type) {
            case "h":

                let h = document.createElement("h3");
                h.innerHTML = "``";
                appendElementAtCursor(h);

                break;

            case "p":
                let p = document.createElement("p");
                p.innerHTML = "``";
                appendElementAtCursor(p);

                break;
            case "i":
                let i = document.createElement("i");
                i.innerHTML = "``";
                appendElementAtCursor(i);

                break;
            case "li":
                let ul = document.createElement("ul");
                let li = document.createElement("li");
                ul.appendChild(li)
                li.innerHTML = "``";
                appendElementAtCursor(ul);

                break;
            case "b":
                let b = document.createElement("b");
                b.innerHTML = "``";
                appendElementAtCursor(b);

                break;
            case "tag":
                let tag = document.createElement("i");
                let space = document.createElement("i")
                space.innerHTML = " ``"
                space.style.fontStyle = "normal"
                tag.className = "tag"
                tag.innerHTML = "``";
                appendElementAtCursor(tag);
                appendElementAtCursor(space);
                break;

            case "u":
                let u = document.createElement("u");
                u.innerHTML = "``";
                appendElementAtCursor(u);

                break;
            case "cont":
                let cont = document.createElement("i")
                cont.innerHTML = " ``"
                cont.style.fontStyle = "normal"
                cont.style.fontWeight = "normal"
                cont.style.textDecoration = "none"
                appendElementAtCursor(cont);
                
                break;


        }
    };

    function saveCursorPosition(contentEditableElement) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (contentEditableElement.contains(range.commonAncestorContainer)) {
                setLastPont(range.cloneRange());
            }
        }
    }

    const handleText = (e) => {
        const text = e.target.innerHTML;
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
            <div className={`tools ${typing ? "visible" : "visible"}`} ref={toolbarRef}>
                <div
                    className="format-btn pointer c-white"
                    onClick={() => handleFormatting("h")}
                >
                    <FaHeading />
                </div>

                {/* <Space val={".3rem"} /> */}

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("p")}
                >
                    <FaParagraph />
                </div>
                {/* <Space val={".3rem"} /> */}

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("i")}
                >
                    <FaItalic />
                </div>
                {/* <Space val={".3rem"} /> */}

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("li")}
                >
                    <FaList />
                </div>
                {/* <Space val={".3rem"} /> */}

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("b")}
                >
                    <FaBold />
                </div>
                {/* <Space val={".3rem"} /> */}

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("u")}
                >
                    <FaUnderline />
                </div>
                {/* <Space val={".3rem"} /> */}

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("tag")}
                >
                    ``
                </div>
                {/* <Space val={".3rem"} /> */}

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("cont")}
                >
                    <FaArrowRight />
                </div>
            </div>

            <Space val={".3rem"} />
            <div className={`textarea ${onPreview ? 'not-visible' : 'visible'}`}>
                <div

                    onBlur={e => saveCursorPosition(e.target)}
                    contentEditable={true}
                    className="text"
                    onInput={(e) => handleText(e)}
                    ref={contentRef}
                    defaultValue={val}
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
