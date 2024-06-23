import { useRouter } from "next/navigation"

export const Link = ({to, text}) => {
    const router = useRouter();
    
    return <p className="link" onClick={() => router.push(`${to}`)}>{text}</p>
}