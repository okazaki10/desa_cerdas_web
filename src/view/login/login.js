import { Link } from "react-router-dom";


export default function Login() {
    
    return (<div className="main">
        <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', height: "100vh" }}>
            <div style={{ backgroundColor: "white", padding: 22, borderRadius: 15 }}>
                <div className="inputtitle">Username</div>
                <input className="inputtext" style={{ marginTop: 5, borderColor: "black" }} ></input>
                <div className="inputtitle" style={{ marginTop: 15 }}>Password</div>
                <input className="inputtext" style={{ marginTop: 5, borderColor: "black" }} type="password" ></input>
                <Link to="/">
                <button className="button publish-button" style={{ marginTop: 15 }}>Login</button>
                </Link>
            </div>
        </div>
    </div>)
}