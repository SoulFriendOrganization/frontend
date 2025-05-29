import { Outlet } from "react-router";
import { Navbar, Footer } from "../organisms";

function Layout() {
    return (
        <div className="w-full min-h-svh bg-[#FFEBC8]">
            <Navbar />
            <Outlet />
            <Footer/>
        </div>
    )
}

export default Layout;