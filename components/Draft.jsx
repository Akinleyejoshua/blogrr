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
    FaVideo,
} from "react-icons/fa6";
import { atlify, removeFromString, urlify } from "@/utils/helpers";
import { Avater } from "./Avater";

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

            if (lastPoint != null) {
                lastPoint.insertNode(element);
                lastPoint.setStartAfter(element);
                lastPoint.collapse(true);

                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(lastPoint);
                contentRef.current.focus();
            } else {
                contentRef.current.append(element)
            }

        } catch (error) {

        }

    };

    const handleFormatting = (type) => {
        if (content == "" && type != "cont") return;
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
        handleContent()

    }

    const handleVideo = (blob) => {
        setTyping(true);
        let video = document.createElement("video");
        video.className = "content-video";
        video.src = blob;
        video.controls = true;
        let space = document.createElement("br");
        appendElementAtCursor(video);
        appendElementAtCursor(space);
        handleContent()
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

    const handleContent = () => {
        let text = contentRef.current.innerHTML;
        const removeLiterals = removeFromString(text, "`");
        const formatedText = removeLiterals;

        setContent(formatedText);
        onChange(formatedText);
    }

    const [tagging, setTagging] = useState(false);
    const [usernames, setUsernames] = useState([])
    const [username, setUsername] = useState("");
    
    const handleText = (e) => {
        let text = e.target.innerHTML;
        let textContent = e.target.textContent
        const removeLiterals = removeFromString(text, "`");
        const formatedText = removeLiterals;

        const atRegex = /\@\w+/gi;
        setTagging(false);
        setUsernames([]);

        text.replace(atRegex, async (txt) => {
            if (text.includes(" ")) {
                setUsernames([]);
                setTagging(false);
            
            }
            setUsername(txt.replace("@", ""))
            const api = await fetch("api/get-users");
            const res = await api.json();

            const filter = res?.findUsers?.filter(item => item.username.includes(txt.replace("@", "")));
            if (filter.length != 0) {
                setTagging(true);
                setUsernames(filter);
            } 

        });

        setContent(formatedText);
        onChange(formatedText);

        if (textContent.length > 0) {
            setTyping(true);
        } else {
            setTyping(false);
        }
    };


    return (
        <div className="draft">
            <section className={`text-bar ${onPreview ? "not-visible" : "visible"}`}>

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
                        <p className="placeholder dim1">What do you want to publish?</p>
                    )}

                    {(tagging) && <div className="usernames">
                        {usernames.map((item, i) => {
                            if (item.username == username) {
                                setUsernames([]);
                                setTagging(false);
                            }
                            return <div className="name flex items-center" key={i} onClick={() => {
                                contentRef.current.innerHTML = contentRef.current.innerHTML.replace(username, item?.username)
                                setTagging(false);
                                setUsernames([]);
                                setContent(contentRef.current.innerHTML);
                                onChange(contentRef.current.innerHTML);
                            }}><Avater size={"1.4rem"} data={{ username: item?.username, img: item?.img }} />
                                <Space val={".14rem"}/>
                                <small>@{item?.username}</small></div>
                        })}
                    </div>}
                </div>
                <div
                    className={`tools ${onPreview ? "not-visible" : "visible"}`}
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
                        className="format-btn pointer items-center"

                    ><div className="input-file flex items-center">
                            <FaVideo className="icon" />
                            <input className="fit" type="file" onChange={(e) => {
                                const file = new FileReader();
                                try {
                                    file.readAsDataURL(e.target.files[0]);
                                    file.onload = () => handleVideo(file.result);
                                } catch (err) {
                                    console.log(err)
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

            </section>


            <div className={`textarea ${!onPreview ? "not-visible" : "visible"}`}>
                <div
                    className="text"
                    ref={previewRef}
                    dangerouslySetInnerHTML={{ __html: atlify(urlify(content)) }}
                ></div>
            </div>

            <Space val={".4rem"} />

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
