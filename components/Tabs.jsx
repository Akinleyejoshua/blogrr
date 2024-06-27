import { useState } from "react";
import { Space } from "./Space";

export const Tabs = ({ links }) => {
    const [state, setState] = useState({
        id: 3,
    });

    return (
        <div className="tabs">
            <div className="tablinks">
                {links.map((item, i) => {
                    return item.open && (
                        
                        <button
                            className={`${state.id == item?.id ? "active" : ""}`}
                            onClick={() => setState({
                                ...state,
                                id: item?.id,
                            })}
                            key={i}
                        >
                            {item?.name}
                        </button>
                    );
                })}
            </div>
            <Space val={"1rem"} />

            {links.map((item, i) => {
                return <div key={i} className={`${item.id == state.id ? "page visible" : "page not-visible"}`}>
                    {item?.tab}
                </div>
            })}

        </div>
    );
};
