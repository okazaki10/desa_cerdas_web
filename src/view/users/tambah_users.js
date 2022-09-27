import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import '../../App.css';
import axiosFetch, { fetchError, SERVER } from '../../base_url';
import InputLabel from '@mui/material/InputLabel';
export default function TambahUsers() {
    let { id } = useParams();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [map, setMap] = useState("")
    const [webUrl, setWebUrl] = useState("")
    const [phone, setPhone] = useState("")
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

    const key = ""
    const [spinner, setspinner] = useState(false)
    const getWisata = async () => {
        try {
            setspinner(true)
            const response = await axiosFetch.get("/wisata/list/" + id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + key,
                },
            })
            const json = response.data
            console.log(JSON.stringify(json))
            if (json.status == 200) {
                setName(json.data.name)
                setDescription(json.data.description)
                setMap(json.data.map_url)
                setWebUrl(json.data.web_url)
                setPhone(json.data.phone)
                setInformation(json.data.information)
                setImageLink(SERVER + "/" + json.data.thumbnail_url)
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
    const addWisata = async () => {
        try {
            if (name == "" || description == "" || map == "" || webUrl == "" || phone == "" || information == "" || kategori == "") {
                alert("Pastikan kolom tidak ada yang kosong")
                return
            }
            if (imageLink == "") {
                alert("Pastikan gambar terisi")
                return
            }
            setspinner(true)
            const response = await axiosFetch.post("/wisata/list/store", {
                name: name,
                description: description,
                base64_thumbnail: imageData,
                map_url: map,
                web_url: webUrl,
                phone: phone,
                information: information,
                wisata_category_id: kategori
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
                addGambar(json.data.id)
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
    const addGambar = async (id) => {
        try {
            setspinner(true)
            const response = await axiosFetch.post("/wisata/images/store", {
                base64_images: imageData,
                wisata_list_id: id
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

    const updateWisata = async () => {
        try {
            if (name == "" || description == "" || map == "" || webUrl == "" || phone == "" || information == "" || kategori == "") {
                alert("Pastikan kolom tidak ada yang kosong")
                return
            }

            setspinner(true)
            const response = await axiosFetch.put("/wisata/list/update", {
                id: id,
                name: name,
                description: description,
                base64_thumbnail: imageData,
                map_url: map,
                web_url: webUrl,
                phone: phone,
                information: information,
                wisata_category_id: kategori
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

    const getListCategory = async () => {
        try {
            const response = await axiosFetch.get("/wisata/category", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + key,
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
            getWisata()
        }
        getListCategory()
    })

    return (
        <div className="main">
            {success ? <Navigate to="/wisata" /> : null}
            <div className="content">
                <div className="content-main">

                    <div className="subtitle">{location.pathname.includes("edit") ? "Update Wisata" : "Tambah Wisata"}</div>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Nama Wisata</div>
                    <input className="inputtext" onChange={(e) => { setName(e.target.value) }} value={name} style={{ marginTop: 5 }} ></input>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Deskripsi</div>
                    <textarea className="inputtext" onChange={(e) => { setDescription(e.target.value) }} value={description} style={{ marginTop: 5, height: 100 }} ></textarea>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Map URL</div>
                    <input className="inputtext" onChange={(e) => { setMap(e.target.value) }} value={map} style={{ marginTop: 5 }} ></input>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Web URL</div>
                    <input className="inputtext" onChange={(e) => { setWebUrl(e.target.value) }} value={webUrl} style={{ marginTop: 5 }} ></input>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Nomor Handphone</div>
                    <input type={"number"} className="inputtext" onChange={(e) => { setPhone(e.target.value) }} value={phone} style={{ marginTop: 5 }} ></input>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Informasi</div>
                    <textarea className="inputtext" onChange={(e) => { setInformation(e.target.value) }} value={information} style={{ marginTop: 5, height: 100 }} ></textarea>
                    <div style={{ marginTop: 15 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={kategori}
                                label="Kategori"
                                onChange={(e) => setKategori(e.target.value)}
                                style={{ marginTop: 15 }}
                            >
                                {category.map((item, index) => (
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                                <button className="button publish-button" onClick={updateWisata} style={{ marginTop: 15 }}>Update Wisata</button>
                            ) : (
                                <button className="button publish-button" onClick={addWisata} style={{ marginTop: 15 }}>Tambah Wisata</button>)}
                        </div>
                    </div>


                </div>

            </div>
        </div >
    );
}
