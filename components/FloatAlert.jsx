import { useComponents } from "@/hooks/useComponents"
import { Space } from "./Space";
import { AiOutlineAlert, AiOutlineDelete } from "react-icons/ai";
import { FaUser } from "react-icons/fa6";

export const FloatAlert = ({content, type}) => {
    const {closeFloatAlert} = useComponents();

    return <div className="float-alert flex items-center">
        {type == "del" && <AiOutlineDelete className="icon c-red"/>}
        {type == "" && <AiOutlineAlert className="icon"/>}
        {type == "user" && <FaUser className="icon"/>}
        <Space val={".3rem"}/>
        <small>{content}</small>
        <Space val={".3rem"}/>
        <button className="b-none c-red" onClick={closeFloatAlert}>&times;</button>
    </div>
}