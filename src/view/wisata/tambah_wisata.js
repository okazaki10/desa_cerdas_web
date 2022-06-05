import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import '../../App.css';
import axiosFetch, { fetchError, SERVER } from '../../base_url';

export default function TambahWisata() {
    let { id } = useParams();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [map, setMap] = useState("")
    const [webUrl, setWebUrl] = useState("")
    const [phone, setPhone] = useState("")
    const [information, setInformation] = useState("")
    const [kategori, setKategori] = useState("")
    const [category, setCategory] = useState("")
    const [imageLink, setImageLink] = useState('')
    const [imageData, setImageData] = useState('')

    const categories = ['Wash and Fold', 'Dry Clean', 'Home', 'Others']

    const [product, setProduct] = useState([{}])

    const fetchData = async () => {
        try {
            const response = await axiosFetch.get("/product")
            const json = response.data
            console.log(json)
            if (json.success) {
                setProduct(json.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {

    }, [])

    const [catHover, setCatHover] = useState(-1)
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

    const [listWisata, setListWisata] = useState([])
    const key = ""
    const [spinner, setspinner] = useState(false)
    const getListWisata = async () => {
        try {
            setspinner(true)
            const response = await axiosFetch.get("/wisata/list", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + key,
                },
            })
            const json = response.data
            console.log(JSON.stringify(json))
            if (json.status == 200) {
                setListWisata(json.data)
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
            if (name == "" || description == "" || map == "" || webUrl == "" || phone == "" || information == "") {
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
                wisata_category_id: "1"
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
            if (name == "" || description == "" || map == "" || webUrl == "" || phone == "" || information == "") {
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
                wisata_category_id: "1"
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
    let location = useLocation()
    
    useEffect(() => {
        if (location.pathname.includes("edit")) {
            getListWisata()
        }
    })

    return (
        <div className="main">
            {success ? <Navigate to="/wisata" /> : null}
            <div className="content">
                <div className="content-main">
                    <div className="subtitle">Tambah Wisata</div>
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

                    <div className="inputtitle" style={{ marginTop: 15 }}>Category</div>
                    <div className="categories">{categories.map((item, i) => (
                        <div key={i} style={{ padding: 5 }}>
                            <button onClick={() => { setCategory(i) }}
                                onMouseEnter={() => { setCatHover(i) }}
                                onMouseLeave={() => { setCatHover(-1) }}
                                style={{ backgroundColor: i == category || i == catHover ? "#4ECB71" : "#CAECFF", padding: 8, borderRadius: 5, border: "none" }}>
                                <div style={{ fontSize: 14, color: i == category || i == catHover ? "white" : "#0099EE" }}>{item}</div>
                            </button>
                        </div>
                    ))} </div>
                    <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: 15, alignItems: "end" }}>
                        <div style={{ width: "100%" }}>
                            <div className="inputtitle" style={{ marginTop: 15 }}>Price</div>
                            <input type={"number"} className="inputtext" onChange={(e) => { setInformation(e.target.value) }} value={information} style={{ marginTop: 5 }} ></input>
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

                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => { handleFileRead(e) }}
                        size="small"
                        variant="standard"
                        style={{ backgroundColor: "white", border: "none", marginTop: 15 }}
                    />

                </div>

                <div className="content-image">
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

                </div>
            </div>
        </div >
    );
}
