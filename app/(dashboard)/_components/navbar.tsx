"use client"

import {UserButton} from "@clerk/nextjs";

const Navbar = () => {
    return (
        <div className="flex items-center p-5 bg-red-900 gap-x-3">
            <div className="hidden lg:flex lg:flex-1 bg-yellow-300">
                Search
            </div>
            <UserButton/>
    </div>
    )
}

export default  Navbar