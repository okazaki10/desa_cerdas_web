import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';

export default function HomeSidebar() {
    let params = useParams()
    let location = useLocation()
    const [cookies, setCookie] = useCookies(['key']);
    const [isLoggedOut, setIsLoggedOut] = useState(false)
    const [display, setDisplay] = useState(false)
    const [menuButton, setMenuButton] = useState("menu-button")
    const logout = () => {
        setCookie("key", "", { path: "/" })
        setIsLoggedOut(true)
    }
    const displayPressed = () => {
        setDisplay(!display)
        if (display) {
            setMenuButton("menu-button")
        } else {
            setMenuButton("menu-button-none")
        }
    }
    return (<div> <div className="navbars">
        <div style={{ paddingRight: 20, paddingLeft: 20, display: "flex", alignItems: "center", width: "100%" }}>
            <button className={menuButton} onClick={displayPressed}>Menu</button>
            <p style={{ color: "white", fontSize: 22, fontFamily: "Roboto-Bold", width: "100%" }}>Desa Cerdas Tambakrejo</p>
            <div className='admin'>
                <img src={require('../assets/images/profile.png')} style={{ height: 30, width: 30, objectFit: "contain", marginRight: 10 }}></img>

                <div style={{ textAlign: "center", fontSize: 20, color: "white" }}>Selamat Datang Admin!</div>
            </div>
        </div>
    </div>
        <div className="sidebars" style={{ display: display ? "block" : null }}>

            <Link to="/" style={{ textDecoration: "none" }}>
                <button onClick={displayPressed} className={location.pathname == "/" || location.pathname.includes("village") ? "button sidebar-button" : "button sidebar-button-none"}>
                    <div style={{ marginLeft: 10 }}>Home</div>
                </button>
            </Link>
            <Link to="/users" style={{ textDecoration: "none" }}>
                <button onClick={displayPressed} className={location.pathname.includes("users") ? "button sidebar-button" : "button sidebar-button-none"} style={{ marginTop: 15 }}>
                    <div style={{ marginLeft: 10 }}>Toko User</div>
                </button>
            </Link>
            <Link to="/wisata" style={{ textDecoration: "none" }}>
                <button onClick={displayPressed} className={location.pathname.includes("wisata") ? "button sidebar-button" : "button sidebar-button-none"} style={{ marginTop: 15 }}>
                    <div style={{ marginLeft: 10 }}>Wisata</div>
                </button>
            </Link>
            <Link to="/infrastruktur" style={{ textDecoration: "none" }}>
                <button onClick={displayPressed} className={location.pathname.includes("infrastruktur") ? "button sidebar-button" : "button sidebar-button-none"} style={{ marginTop: 15 }}>
                    <div style={{ marginLeft: 10 }}>Infrastruktur</div>
                </button>
            </Link>
            <Link to="/fasum" style={{ textDecoration: "none" }}>
                <button onClick={displayPressed} className={location.pathname.includes("fasum") ? "button sidebar-button" : "button sidebar-button-none"} style={{ marginTop: 15 }}>
                    <div style={{ marginLeft: 10 }}>Fasum</div>
                </button>
            </Link>

            <button className={"button sidebar-button"} onClick={logout} style={{ marginTop: 40, backgroundColor: "#dc3545", color: "white" }}>
                <div style={{ textAlign: "center", width: "100%" }}>Logout</div>
            </button>
            <div style={{ height: "100px" }}></div>
            {isLoggedOut ? <Navigate to="/login"></Navigate> : null}

        </div>
    </div>)
}