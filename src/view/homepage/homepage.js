import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import '../../App.css';
import axiosFetch, { fetchError, SERVER } from '../../base_url';
import InputLabel from '@mui/material/InputLabel';
import { useCookies } from "react-cookie";
export default function HomePage() {
    let { id } = useParams();
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [visi, setVisi] = useState('')
    const [misi, setMisi] = useState('')
    const [villageUrl, setVillageUrl] = useState('')
    const [map, setMap] = useState("")

    const [information, setInformation] = useState("")
    const [kategori, setKategori] = useState("")
    const [category, setCategory] = useState([])
    const [imageLink, setImageLink] = useState('')
    const [imageData, setImageData] = useState('')

    const handleFileRead = async (event) => {
        const file = event.target.files[0]
        const url = URL.createObjectURL(file)
        var base64 = await convertBase64(file)
        base64 = base64.replace(/^data:image\/[a-z]+;base64,/, "")
        setImageData(base64)
        setImageLink(url)
        console.log(base64)
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const [cookies, setCookie] = useCookies(['key']);
    const key = ""
    const [spinner, setspinner] = useState(false)
    const [status, setStatus] = useState(0)
    const getvillage = async () => {
        try {
            setspinner(true)
            const response = await axiosFetch.get("/information/village/1", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.key,
                },
            })
            const json = response.data
            console.log(JSON.stringify(json))
            if (json.data == null) {
                return
            }
            if (json.status == 200) {
                setStatus(1)
                setVisi(json.data.vision)
                setMisi(json.data.mission)
                setVillageUrl(json.data.url)
                setImageLink(SERVER + "/" + json.data.image)
            }
        } catch (error) {

            if (error.message == "Network Error") {
                alert(error.message)
            } else {
                let resp = error.response.data
                let err = fetchError(resp)
                console.log(JSON.stringify(resp))
                alert(resp.message + "\n" + err)
            }
        } finally {
            setspinner(false)
        }
    }
    const [success, setsucess] = useState(false)
    const addvillage = async () => {
        try {
            if (visi == "" || misi == "") {
                alert("Pastikan kolom tidak ada yang kosong")
                return
            }
            if (imageLink == "") {
                alert("Pastikan gambar terisi")
                return
            }
            setspinner(true)
            const response = await axiosFetch.post("/information/village/store", {
                visi: visi,
                misi: misi,
                url: villageUrl,
                base64_image: imageData
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.key,
                },
            })
            const json = response.data
            console.log(json)
            if (json.status == 200) {
                alert("Berhasil tambah data")
                setsucess(true)
                //addGambar(json.data.id)
            }
        } catch (error) {
            console.log(JSON.stringify(error))
            if (error.message == "Network Error") {
                alert(error.message)
            } else {
                /* let resp = error.response.data
                 let err = fetchError(resp)
                 console.log(JSON.stringify(resp))*/
                alert(error.message)
            }
        } finally {
            setspinner(false)
        }
    }
    const addGambar = async (id) => {
        try {
            setspinner(true)
            const response = await axiosFetch.post("/facility/images/store", {
                base64_images: imageData,
                desa_list_id: id
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + key,
                },
            })
            const json = response.data
            console.log(json)
            if (json.status == 200) {
                alert("Berhasil tambah data")
                setsucess(true)
            }
        } catch (error) {
            console.log(JSON.stringify(error))
            if (error.message == "Network Error") {
                alert(error.message)
            } else {
                let resp = error.response.data
                let err = fetchError(resp)
                console.log(JSON.stringify(resp))
                alert(resp.message + "\n" + err)
            }
        } finally {
            setspinner(false)
        }
    }

    const updatevillage = async () => {
        try {
            if (visi == "" || misi == "") {
                alert("Pastikan kolom tidak ada yang kosong")
                return
            }
            if (imageLink == "") {
                alert("Pastikan gambar terisi")
                return
            }
            setspinner(true)
            const response = await axiosFetch.put("/information/village/update", {
                id: 1,
                visi: visi,
                misi: misi,
                url: villageUrl,
                base64_image: imageData
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.key,
                },
            })
            const json = response.data
            console.log(json)
            if (json.status == 200) {
                alert("Berhasil update data")
                setsucess(true)
                //addGambar(json.data.id)
            }
        } catch (error) {
            console.log(JSON.stringify(error))
            if (error.message == "Network Error") {
                alert(error.message)
            } else {
                /* let resp = error.response.data
                 let err = fetchError(resp)
                 console.log(JSON.stringify(resp))*/
                alert(error.message)
            }
        } finally {
            setspinner(false)
        }
    }

    const getListCategory = async () => {
        try {
            const response = await axiosFetch.get("/facility/category", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.key,
                },
            })
            const json = response.data
            console.log(JSON.stringify(json))
            if (json.status == 200) {
                setCategory(json.data)
                setKategori(json.data.length > 0 ? json.data[0].id : '')
            }
        } catch (error) {

            if (error.message == "Network Error") {
                console.log(error.message)
            } else {
                let resp = error.response.data
                let err = fetchError(resp)
                console.log(JSON.stringify(resp))
                console.log(resp.message + "\n" + err)
            }
        } finally {

        }
    }
    let location = useLocation()

    useState(() => {
        getvillage()
    })

    return (
        <div className="main">
            {success ? <Navigate to="/" /> : null}
            <div className="content">
                <div className="content-main">
                    <div style={{ display: "flex" }}>
                        <div className="subtitle" style={{ width: "100%" }}>Desa Tambakrejo</div>
                        {status == 1
                            ?
                            <Link to="/village/edit/1" style={{ textDecoration: "none" }}>
                                <button className="button add-button" >Update</button>
                            </Link>
                            :
                            <div></div>
                        }

                    </div>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Visi</div>
                    <textarea className="inputtext" onChange={(e) => { setVisi(e.target.value) }} value={visi} style={{ marginTop: 5, height: 100 }} disabled></textarea>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Misi</div>
                    <textarea className="inputtext" onChange={(e) => { setMisi(e.target.value) }} value={misi} style={{ marginTop: 5, height: 100 }} disabled></textarea>
                    <div className="inputtitle" style={{ marginTop: 15 }}>URL Desa</div>
                    <input className="inputtext" onChange={(e) => { setVillageUrl(e.target.value) }} value={villageUrl} style={{ marginTop: 5 }} disabled></input>
                    <div htmlFor="file-upload" style={{ display: "flex", borderRadius: 15, backgroundColor: "white", width: 220, height: 220, marginTop: 30, justifyContent: "center", alignItems: "center" }}>
                        <img src={imageLink}
                            style={{ width: "100%", height: "100%", borderRadius: 15, objectFit: "cover" }}
                        >
                        </img>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: 15, marginBottom: 50, alignItems: "end" }}>
                        <div style={{ width: "100%" }}>
                        </div>
                        <div style={{ width: "100%" }}>
                        </div>
                    </div>


                </div>

            </div>
        </div >
    );
}
