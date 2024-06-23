export const Loader = ({color, size}) => {
    return <div className="spin" style={{
        borderTopColor: color,
        maxHeight: size,
        minHeight: size,
        maxWidth: size,
        minWidth: size,
    }}></div>
}