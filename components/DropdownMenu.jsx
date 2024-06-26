import { useState } from "react";
import { Space } from "./Space";

export const DropdownMenu = ({ icon, menu }) => {
    const [state, setState] = useState({
        toggle: false,
    })
    return (
        <div className="dropdown-menu flex row w-max h-max" onMouseLeave={() => setState({ toggle: false })}>

            <button className="btn flex items-center option b-none c-white" onClick={() => setState({
                toggle: true,
            })}>
                {icon}
            </button>

            <div className={`${!state.toggle ? "panel flex col" : "panel flex col open"}`}>
                {menu?.map((item, i) => {
                    return item?.open && (
                        <button
                            key={i}
                            onClick={item?.onClick}
                            className="btn flex b-none items-center"
                            style={{ color: item?.color }}
                        >
                            {item?.icon}
                            <Space val={".3rem"} />
                            <p>{item?.text}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
