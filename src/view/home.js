import { Outlet } from "react-router-dom";
import HomeSidebar from "./home_sidebar";


export default function Home() {
    
    return (
        <div>
            <HomeSidebar />
            <Outlet />
        </div>
    )
}