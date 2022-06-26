import { Link } from "react-router-dom";
import { HamburguerIcon } from "./IconMobile";
import { Logo } from "./Logo";

export function Header() {
    return (
        <header className="
        w-full 
        py-5 flex 
        items-center 
        justify-center 
        bg-gray-700 border-b
        border-gray-600
        ">
            <Link to="/event" className="flex  justify-center mobile:mx-6">
                <Logo />
            </Link>

            <div className="flex ml-auto mr-10 desktop:hidden items-center gap-2 cursor-pointer">
                <span className="text-gray-100">Aulas</span>
                <HamburguerIcon />
            </div>
        </header>
    )
}