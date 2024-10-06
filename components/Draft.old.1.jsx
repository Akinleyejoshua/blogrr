import { useEffect, useRef, useState } from "react";
import { Space } from "./Space";
import {
    FaArrowRight,
    FaBold,
    FaHeading,
    FaImage,
    FaItalic,
    FaList,
    FaParagraph,
    FaUnderline,
} from "react-icons/fa6";
import { atlify, removeFromString, urlify } from "@/utils/helpers";

export const Draft = ({ val, onChange }) => {
    const contentRef = useRef(null);
    const previewRef = useRef(null);
    const toolbarRef = useRef(null);
    const [typing, setTyping] = useState(false);
    const [onPreview, setOnPreview] = useState(false);
    const [content, setContent] = useState("");
    const [lastPoint, setLastPont] = useState(null);

    useEffect(() => {
        if (val !== undefined) {
            setTyping(true);
            if (contentRef.current.innerHTML == "") {
                contentRef.current.innerHTML += val;
                setContent(val);
            }
        }
    }, [val]);

    const appendElementAtCursor = (element) => {
        try {
            lastPoint.insertNode(element);
            lastPoint.setStartAfter(element);
            lastPoint.collapse(true);

            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(lastPoint);
            contentRef.current.focus();
        } catch (error) {

        }

    };

    const handleFormatting = (type) => {
        setTyping(true);
        let space = document.createElement("i");
        space.innerHTML = "&nbsp;";
        space.className = "cont"

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
                appendElementAtCursor(space);

                break;
            case "li":
                let ul = document.createElement("ul");
                let li = document.createElement("li");
                ul.appendChild(li);
                li.innerHTML = "``";
                appendElementAtCursor(ul);
                break;
            case "b":
                let b = document.createElement("b");
                b.innerHTML = "``";
                appendElementAtCursor(b);
                appendElementAtCursor(space);

                break;
            case "tag":
                let tag = document.createElement("i");
                tag.className = "tag";
                tag.innerHTML = "``";
                appendElementAtCursor(tag);
                appendElementAtCursor(space);
                break;
            case "u":
                let u = document.createElement("u");
                u.innerHTML = "``";
                appendElementAtCursor(u);
                appendElementAtCursor(space);

                break;

            case "cont":
                appendElementAtCursor(space);
                break;
        }
    };

    const handleImage = (blob) => {
        setTyping(true);
        let img = document.createElement("img");
        img.className = "content-img";
        img.src = blob;
        let space = document.createElement("br");
        appendElementAtCursor(img);
        appendElementAtCursor(space);
    }

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
        const removeLiterals = removeFromString(text, "`");
        const formatedText = removeLiterals;

        setContent(formatedText);
        onChange(formatedText);

        if (text.length > 0) {
            setTyping(true);
        } else {
            setTyping(false);
        }
    };

    return (
        <div className="draft">
            <div className={`flex col ${onPreview ? "not-visible" : "visible"}`}>
            <div
                className={`tools ${typing ? "visible" : "visible"}`}
                ref={toolbarRef}
            >
                <div
                    className="format-btn pointer c-white"
                    onClick={() => handleFormatting("h")}
                >
                    <FaHeading />
                </div>

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("p")}
                >
                    <FaParagraph />
                </div>

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("i")}
                >
                    <FaItalic />
                </div>

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("li")}
                >
                    <FaList />
                </div>

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("b")}
                >
                    <FaBold />
                </div>

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("u")}
                >
                    <FaUnderline />
                </div>
                <div
                    className="format-btn pointer items-center"

                ><div className="input-file flex items-center">
                        <FaImage className="icon" />
                        <input className="fit" type="file" onChange={(e) => {
                            const file = new FileReader();
                            try {
                                file.readAsDataURL(e.target.files[0]);
                                file.onload = () => handleImage(file.result);

                            } catch {

                            }
                        }} />
                    </div>

                </div>
                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("tag")}
                >
                    ``
                </div>

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("cont")}
                >
                    <FaArrowRight />
                </div>
            </div>

            <Space val={".3rem"} />
            <div className={`textarea`}>
                <div
                    onBlur={(e) => saveCursorPosition(e.target)}
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

            </div>
            

            <div className={`textarea ${!onPreview ? "not-visible" : "visible"}`}>
                <div
                    className="text"
                    ref={previewRef}
                    dangerouslySetInnerHTML={{ __html: atlify(urlify(content)) }}
                ></div>
            </div>
            
            <Space val={".3rem"} />

            {onPreview ? (
                <small className="pointer under" onClick={() => setOnPreview(false)}>
                    Continue editing
                </small>
            ) : (
                <small className="pointer under" onClick={() => setOnPreview(true)}>
                    Preview
                </small>
            )}
        </div>
    );
};
