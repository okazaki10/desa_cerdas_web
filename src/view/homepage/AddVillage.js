import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import '../../App.css';
import axiosFetch, { fetchError, SERVER } from '../../base_url';
import InputLabel from '@mui/material/InputLabel';
import { useCookies } from "react-cookie";
export default function AddVillage() {
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
            if (json.status == 200) {
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
        if (location.pathname.includes("edit")) {
            getvillage()
        }
    })

    return (
        <div className="main">
            {success ? <Navigate to="/" /> : null}
            <div className="content">
                <div className="content-main">

                    <div className="subtitle">{location.pathname.includes("edit") ? "Update desa" : "Tambah desa"}</div>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Visi</div>
                    <textarea className="inputtext" onChange={(e) => { setVisi(e.target.value) }} value={visi} style={{ marginTop: 5, height: 100 }} ></textarea>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Misi</div>
                    <textarea className="inputtext" onChange={(e) => { setMisi(e.target.value) }} value={misi} style={{ marginTop: 5, height: 100 }} ></textarea>
                    <div className="inputtitle" style={{ marginTop: 15 }}>URL Desa</div>
                    <input className="inputtext" onChange={(e) => { setVillageUrl(e.target.value) }} value={villageUrl} style={{ marginTop: 5 }} ></input>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => { handleFileRead(e) }}
                        size="small"
                        variant="standard"
                        style={{ backgroundColor: "white", border: "none", marginTop: 15 }}
                    />
                    <label htmlFor="file-upload" style={{ display: "flex", borderRadius: 15, backgroundColor: "white", width: 220, height: 220, marginTop: 30, justifyContent: "center", alignItems: "center" }}>
                        {imageLink == "" ? (
                            <div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <img src={require('../../assets/images/empty.png')}
                                        style={{ width: 100, height: 100 }}
                                    />
                                </div>
                                <div style={{ textAlign: "center", fontSize: 20, color: "#3B97CB", marginTop: 20, textDecorationLine: "underline" }}>Upload Gambar Disini</div>
                            </div>
                        ) : (
                            <img src={imageLink}
                                style={{ width: "100%", height: "100%", borderRadius: 15, objectFit: "cover" }}
                            >
                            </img>
                        )}
                    </label>
                    <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: 15, marginBottom: 50, alignItems: "end" }}>
                        <div style={{ width: "100%" }}>
                        </div>
                        <div style={{ width: "100%" }}>
                        </div>
                        <div style={{ width: "100%" }}>
                            {location.pathname.includes("edit") ? (
                                <button className="button publish-button" onClick={updatevillage} style={{ marginTop: 15 }}>Update desa</button>
                            ) : (
                                <button className="button publish-button" onClick={addvillage} style={{ marginTop: 15 }}>Tambah desa</button>)}
                        </div>
                    </div>


                </div>

            </div>
        </div >
    );
}
