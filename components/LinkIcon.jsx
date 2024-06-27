export const LinkIcon = ({icon, to}) => {
    return <a href={to} target="blank" className="link-icon">
        {icon}
    </a>
}