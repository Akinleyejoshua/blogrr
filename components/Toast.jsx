export const Toast = ({type, text}) => {
    return <div className={`toast ${type}`}>{text}</div>
}