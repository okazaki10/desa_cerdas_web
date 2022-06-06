import { Link, useLocation, useParams } from 'react-router-dom';

export default function HomeSidebar() {
    let params = useParams()
    let location = useLocation()
    return (<div> <div className="navbars">
        <div style={{ paddingRight: 20, paddingLeft: 20, display: "flex", alignItems: "center", width: "100%" }}>

            <p style={{ color: "white", fontSize: 22, fontFamily: "Roboto-Bold", width: "100%" }}>Desa Cerdas</p>

            <img src={require('../assets/images/profile.png')} style={{ height: 30, width: 30, objectFit: "contain", marginRight: 10 }}></img>

            <div style={{ textAlign: "center", fontSize: 20, color: "white" }}>Selamat Datang Admin!</div>

        </div>
    </div>
        <div className="sidebars">

            <Link to="/" style={{ textDecoration: "none" }}>
                <button className={location.pathname == "/" ? "button sidebar-button" : "button sidebar-button-none"}>
                    <div style={{ marginLeft: 10 }}>Home</div>
                </button>
            </Link>
            <Link to="/wisata" style={{ textDecoration: "none" }}>
                <button className={location.pathname.includes("wisata") ? "button sidebar-button" : "button sidebar-button-none"} style={{ marginTop: 15 }}>
                    <div style={{ marginLeft: 10 }}>Wisata</div>
                </button>
            </Link>
            <Link to="/infrastruktur" style={{ textDecoration: "none" }}>
                <button className={location.pathname.includes("infrastruktur") ? "button sidebar-button" : "button sidebar-button-none"} style={{ marginTop: 15 }}>
                    <div style={{ marginLeft: 10 }}>Infrastruktur</div>
                </button>
            </Link>
            <Link to="/epasar" style={{ textDecoration: "none" }}>
                <button className={location.pathname.includes("epasar") ? "button sidebar-button" : "button sidebar-button-none"} style={{ marginTop: 15 }}>
                    <div style={{ marginLeft: 10 }}>Epasar</div>
                </button>
            </Link>
            <Link to="/tpst" style={{ textDecoration: "none" }}>
                <button className={location.pathname.includes("tpst") ? "button sidebar-button" : "button sidebar-button-none"} style={{ marginTop: 15 }}>
                    <div style={{ marginLeft: 10 }}>Tpst</div>
                </button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
                <button className={"button sidebar-button"} style={{ marginTop: 40, backgroundColor: "#dc3545", color: "white" }}>
                    <div style={{ textAlign: "center", width: "100%" }}>Logout</div>
                </button>
            </Link>
        </div>
    </div>)
}