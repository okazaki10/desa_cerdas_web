import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, Navigate } from "react-router-dom";
import axiosFetch, { fetchError } from "../../base_url";


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cookies, setCookie] = useCookies(['key']);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const login = async (event) => {
        event.preventDefault()
        try {
            if (email == "" || password == "") {
                alert("Pastikan kolom tidak ada yang kosong")
                return
            }
            const response = await axiosFetch.post("/login", {
                email: email,
                password: password,
                device_name: "test"
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const json = response.data
            console.log(JSON.stringify(json))
            if (json.status == 200) {
                setCookie("key", json.data.token, { path: "/" })
                setIsLoggedIn(true)
            } else {
                alert("Email atau password salah")
            }
        } catch (error) {
            console.log(JSON.stringify(error))
            if (error.message == "Network Error") {
                alert(error.message)
            } else {
                let resp = error.response.data
                let err = fetchError(resp)
                alert(err)
            }
        } finally {

        }
    }
    return (<div className="main">
        <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', height: "100vh" }}>
            {isLoggedIn ? <Navigate to="/"></Navigate> : null}
            <form onSubmit={login}>
                <div style={{ backgroundColor: "white", padding: 22, borderRadius: 15 }}>
                    <p style={{ color: "black", fontSize: 22, fontFamily: "Roboto-Bold", width: "100%",textAlign:"center" }}>Desa Cerdas</p>
                    <div className="inputtitle">Username</div>
                    <input className="inputtext" onChange={(e) => { setEmail(e.target.value) }} value={email} style={{ marginTop: 5, borderColor: "black" }} ></input>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Password</div>
                    <input className="inputtext" onChange={(e) => { setPassword(e.target.value) }} value={password} style={{ marginTop: 5, borderColor: "black" }} type="password" ></input>
                    <button className="button publish-button" onClick={login} style={{ marginTop: 15 }}>Login</button>
                </div>
            </form>
        </div>
    </div>)
}