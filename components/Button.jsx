import { Space } from "./Space"

export const Button = ({ loading, text, icon, onClick }) => {
    return <button className="btn" onClick={() => onClick()}>
        {loading ? <div className="spin"></div> :
            <>
                {icon != null && <>
                    {icon}
                    <Space val={".3rem"} />
                </>
                }
                {text}
            </>
        }
    </button>
}