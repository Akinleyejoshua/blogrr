"use client"

import { Header } from "@/components/Header"
import { SideBar } from "@/components/SideBar"

export default function Page(){
    return <main className="home">
        <div className="flex row fit">
            <SideBar/>
            <div className="flex col fit">
                <Header/>
                <div className="main scroll-y">
                   
                </div>
            </div>
        </div>
    </main>
}