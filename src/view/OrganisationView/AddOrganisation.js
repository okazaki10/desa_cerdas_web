import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import '../../App.css';
import axiosFetch, { fetchError, SERVER } from '../../base_url';
import InputLabel from '@mui/material/InputLabel';
import { useCookies } from "react-cookie";
export default function AddOrganisation() {
    let { id } = useParams();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
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
    const [spinner, setspinner] = useState(false)
    const getListPatent = async () => {
        try {
            setspinner(true)
            const response = await axiosFetch.get("/information/organization/" + id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.key,
                },
            })
            const json = response.data
            console.log(JSON.stringify(json))
            if (json.status == 200) {
                setName(json.data.organization)
                setImageLink(SERVER + "/" + json.data.image)
                setListPengurus(json.data.officials)
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
    const addOrganisation = async () => {
        try {
            if (name == "") {
                alert("Pastikan kolom tidak ada yang kosong")
                return
            }
            if (imageLink == "") {
                alert("Pastikan gambar terisi")
                return
            }
            setspinner(true)
            const response = await axiosFetch.post("/information/organization/store", {
                name: name,
                type: "paten",
                base64_image: imageData,
                officials: listPengurus
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
            const response = await axiosFetch.post("/infrastruktur/images/store", {
                base64_images: imageData,
                infrastruktur_list_id: id
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

    const updateinfrastruktur = async () => {
        try {
            if (name == "" || description == "" || map == "" || information == "" || kategori == "") {
                alert("Pastikan kolom tidak ada yang kosong")
                return
            }

            setspinner(true)
            const response = await axiosFetch.put("/infrastruktur/list/update", {
                id: id,
                name: name,
                description: description,
                base64_thumbnail: imageData,
                map_url: map,
                information: information,
                infrastruktur_category_id: kategori
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
                alert("Berhasil update data!")
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

    const patent = id == 1 ? "Patent" : "Non-Patent"
    let location = useLocation()

    useState(() => {
        if (location.pathname.includes("edit")) {
            getListPatent()
        }
    })
    const [listPengurus, setListPengurus] = useState([{ occupation: "", name: "" }])
    return (
        <div className="main">
            {success ? <Navigate to="/organisasi" /> : null}
            <div className="content">
                <div className="content-main">
                    <div className="subtitle">
                        {location.pathname.includes("edit") ? "Update Organisasi " + patent : "Tambah Organisasi " + patent}
                    </div>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Nama organisasi</div>
                    <input className="inputtext" onChange={(e) => { setName(e.target.value) }} value={name} style={{ marginTop: 5 }} ></input>
                    <div className="subtitle" style={{ marginTop: 15 }}>Daftar Pengurus</div>
                    {listPengurus.map((item, index) => (
                        <div style={{ marginTop: 30 }}>
                            <div className="inputtitle" style={{ marginTop: 15 }}>{index + 1}. Nama Pengurus</div>
                            <input className="inputtext" onChange={(e) => {
                                let listPengurus2 = [...listPengurus]
                                listPengurus2[index] = { ...listPengurus2[index], name: e.target.value }
                                setListPengurus(listPengurus2)
                            }} value={item.name} style={{ marginTop: 5 }} ></input>
                            <div className="inputtitle" style={{ marginTop: 15, marginLeft: 15 }}>Jabatan</div>
                            <input className="inputtext" onChange={(e) => {
                                let listPengurus2 = [...listPengurus]
                                listPengurus2[index] = { ...listPengurus2[index], occupation: e.target.value }
                                setListPengurus(listPengurus2)
                            }} value={item.occupation} style={{ marginTop: 5 }} ></input>
                        </div>
                    ))}
                    <div style={{ display: "flex", marginTop: 20 }}>
                        <div style={{ flex: 1 }}></div>
                        <button className="button publish-button" onClick={() => {
                            var listPengurus2 = [...listPengurus]
                            listPengurus2.push([{ occupation: "", name: "" }])
                            setListPengurus(listPengurus2)
                        }} style={{ flex: 0, marginRight: 5 }}>+</button>
                        <button className="button publish-button" onClick={() => {
                            var listPengurus2 = [...listPengurus]
                            listPengurus2.pop()
                            setListPengurus(listPengurus2)
                        }} style={{ flex: 0 }}>-</button>
                    </div>
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
                                <button className="button publish-button" onClick={updateinfrastruktur} style={{ marginTop: 15 }}>Update paten</button>
                            ) : (
                                <button className="button publish-button" onClick={addOrganisation} style={{ marginTop: 15 }}>Tambah paten</button>)}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
