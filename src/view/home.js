import { useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import axiosFetch from "../base_url";
import HomeSidebar from "./home_sidebar";


export default function Home() {
    const [cookies, setCookie] = useCookies(['key']);
    const [isLoggedOut, setIsLoggedOut] = useState("")
    const getUser = async (value) => {
        try {
            const response = await axiosFetch.get("/user", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + value,
                },
            })
            const json = response.data
            console.log(json)
            if (json.status == 200) {
                console.log("berhasil")
                setIsLoggedOut("login")
            } else {
                console.log("gagal")
                setCookie("key", "", { path: "/" })
                setIsLoggedOut("logout")
            }
        } catch (error) {
            console.log(JSON.stringify(error))
            console.log("gagal")
            setCookie("key", "", { path: "/" })
            setIsLoggedOut("logout")
        }
    }
    useState(() => {
        console.log(JSON.stringify(cookies))
        getUser(cookies.key)
    })
    return (
        <div>
            {isLoggedOut == "logout" ? <Navigate to="/login"></Navigate> : isLoggedOut == "login" ? <div>
                <HomeSidebar />
                <Outlet />
            </div> : null}
        </div>
    )
}