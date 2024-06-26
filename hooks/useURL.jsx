import { useEffect, useState } from "react"

export const useURL = () => {
  const [queries, setQueries] = useState({});

    useEffect(() => {
        
        const splitUrl = location.href.split("?");
        const splitQueries = splitUrl[1].split("&");
        for (let i = 0; splitQueries.length > i; i++){
            const query = splitQueries[i].split("=")[0]
            const value = splitQueries[i].split("=")[1]

            setQueries(prev => ({
                ...prev,
                [query]: value
            }))
        }
        
    }, [])

    return {...queries}

}