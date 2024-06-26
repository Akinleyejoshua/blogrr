import { useEffect, useRef, useState } from "react";
import { Space } from "./Space";

export const Draft = ({ val, onChange }) => {
    const contentRef = useRef(null);
    const [format, setFormat] = useState("p")
    const [content, setContent] = useState("");
    const [typing, setTyping] = useState(false);
    const [line, setLine] = useState(0);

    const handleFormatting = (type) => {
        const text = contentRef.current.textContent;
        const split = text.split("\n");
        const currentText = split[line]
        const selection = window.getSelection();
        const selectedText = selection.toString();
        let newContent = content;

        setFormat(type);
        switch (type) {
            case "h-open":
                    setContent(content + `<h1>`)
                    contentRef.current.innerHTML = content == "" ? `<h1>` : content;
                    console.log(content)

                break

            case "h-close":
                if (text !== "") {
                    setContent(content + `</h1>`)
                    contentRef.current.innerHTML = "";
                    contentRef.current.innerHTML = content
                    console.log(content)

                }

                break;
            case "p":
                if (currentText !== undefined) {
                    setContent(content + `\n<p>${currentText}</p>\n`)
                    contentRef.current.innerHTML = content == "" ? `<h1>${currentText}</h1>\n` : content;
                    setLine(line + 1)
                }

                break
            case "i":
                if (currentText !== undefined) {
                    setContent(content + `\n<i>${currentText}</i>\n`)
                    contentRef.current.innerHTML = content == "" ? `<h1>${currentText}</h1>\n` : content;
                    setLine(line + 1)
                }

                break
            case "li":

                if (currentText !== undefined) {
                    setContent(content + `\n<br><ul>
                    <li>
                        ${currentText}
                    </li>
                </ul>\n`)
                    contentRef.current.innerHTML = content == "" ? `<h1>${currentText}</h1>\n` : content;
                    setLine(line + 1)
                }

                break
            case "b":
                if (currentText !== undefined) {
                    setContent(content + `\n<b>${currentText}</b>\n`)
                    contentRef.current.innerHTML = content == "" ? `<h1>${currentText}</h1>\n` : content;
                    setLine(line + 1)
                }

                break
        }


    };

    const handleText = (text) => {
        setContent(content + text);
        if (text.length > 0) {
            setTyping(true);
        } else {
            setTyping(false);
            setContent("")

        }
    }

    useEffect(() => {
        const updateContent = () => {
            const linkRegex = /((http|https):\/\/)?(wwww\.)?([^\s]+)(\.[^\s])*(\/[^\s]*)?/g;
            let newContent = contentRef.current.innerHTML.replace(linkRegex, (url) => {
                return `<a href=${url}>${url}</a>`
            })

            setContent(newContent)
        }

        updateContent();
    }, [contentRef]);

    return (
        <div className="draft">
            <div className="tools flex">
                {format == "h-open" ?
                    <div
                        className="format-btn pointer c-blue"
                        onClick={() => handleFormatting("h-close")}
                    >
                        H
                    </div> :

                    <div
                        className="format-btn pointer c-white"
                        onClick={() => handleFormatting("h-open")}
                    >
                        H
                    </div>
                }

                <Space val={".3rem"} />

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("p")}
                >
                    p
                </div>
                <Space val={".3rem"} />

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("i")}
                >
                    i
                </div>
                <Space val={".3rem"} />

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("li")}
                >
                    li
                </div>
                <Space val={".3rem"} />

                <div
                    className="format-btn pointer"
                    onClick={() => handleFormatting("b")}
                >
                    b
                </div>
            </div>

            <Space val={".3rem"} />
            <div className="textarea">
                <div
                    contentEditable={true}
                    dangerouslySetInnerHTML={{ __html: content }}
                    className="text"
                    onInput={e => handleText(e.target.innerHTML)}
                    ref={contentRef}
                ></div>
                {!typing &&
                    <p className="placeholder dim">What do you want to publish?</p>
                }
            </div>

            {/* <textarea
                defaultValue={val}
                onChange={onChange}
                placeholder="What do you want to publish!?"
            ></textarea> */}
        </div>
    );
};
