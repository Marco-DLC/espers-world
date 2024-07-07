import React from "react"

export default function Header(){
    return (
    <div className="header">
        <img src="./images/dryad.webp" className="icon-dryad" />
        <h1>Esper&apos;s World</h1>
        <img src="./images/dryad.webp" className="icon-dryad reverse" />
        <SidebarButton />
    </div>
    )
}

function SidebarButton() {
    return (
        <button className="sidebar-button">Menu ☰</button>
    )
}
