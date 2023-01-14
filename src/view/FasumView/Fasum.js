import { Button, Modal, Typography } from "@mui/material";
import { Box, width } from "@mui/system";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { ShimmerTable } from "react-shimmer-effects";
import axiosFetch, { fetchError, SERVER } from "../../base_url";
import InputLabel from '@mui/material/InputLabel';
import { FormControl, MenuItem, Select } from "@mui/material";
import { useCookies } from "react-cookie";
export default function Fasum() {
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nama infrastruktur',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Deskripsi',
            selector: row => row.description,
            sortable: true,
        }, {
            name: 'Gambar',
            selector: row => <div style={{ width: 200 }}>
                <img src={SERVER + "/" + row.image_url} style={{ width: 100 }} />
            </div>,
        }, {
            name: 'Informasi',
            selector: row => row.information,
            sortable: true,
        },
        {
            name: 'Kategori',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: "Aksi", cell: row =>
                <div style={{ width: 200 }}>
                    <Link to={`/fasum/edit/${row.id}`}>
                        <button className="button edit-button" >Edit</button>
                    </Link>
                    <button className="button delete-button" onClick={() => { deletefasum(row.id) }} style={{ marginLeft: 5 }}>Delete</button>

                </div>
        },
    ];
    const categoryColumns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Gambar',
            selector: row => <div style={{ width: 200 }}>
                <img src={SERVER + "/" + row.image_url} style={{ width: 100 }} />
            </div>,
        },
        {
            name: 'Nama Kategori',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "Aksi", cell: row =>
                <div style={{ width: 200 }}>

                    <button className="button edit-button" onClick={() => {
                        setOpen(true)
                        setId(row.id)
                        setIsEdit(true)
                    }} >Edit</button>
                    <button className="button delete-button" onClick={() => { deleteKategori(row.id) }} style={{ marginLeft: 5 }}>Delete</button>

                </div>
        },
    ];
    const [data, setdata] = useState([])
    const [category, setCategory] = useState([])
    const [listinfrastruktur, setListinfrastruktur] = useState([])
    const [cookies, setCookie] = useCookies(['key']);
    const key = ""
    const [spinner, setspinner] = useState(false)
    const getListFasum = async (id) => {
        try {
            setspinner(true)
            const response = await axiosFetch.get("/facility/list/" + id,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + cookies.key,
                    },
                })
            const json = response.data
            console.log(JSON.stringify(json))
            if (json.status == 200) {
                setdata(json.data)
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
            setspinner(false)
        }
    }
    const getListCategory = async () => {
        try {
            setspinner(true)
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
                if (json.data.length > 0) {
                    setKategori(json.data[0].id)
                    getListFasum(json.data[0].id)
                } else {
                    setKategori("")
                }
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
            setspinner(false)
        }
    }
    const deletefasum = async (id) => {
        try {
            if (!window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
                return
            }
            const response = await axiosFetch.delete("/facility/delete", {
                data: {
                    facility_id: id
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.key,
                },
            })
            const json = response.data
            console.log(json)
            if (json.status == 200) {
                getListFasum(kategori)
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

        }
    }

    const addKategori = async () => {
        try {
            if (name == "") {
                alert("Pastikan kolom tidak ada yang kosong")
                return
            }
            const response = await axiosFetch.post("/facility/category/store", {
                name: name,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.key,
                },
            })
            const json = response.data
            console.log(JSON.stringify(json))
            console.log("id nya " + json.data.id)
            if (json.status == 200) {
                if (imageData != '') {
                    addKategoriImage(json.data.id)
                    return
                }
                alert("Anda harus mengisi gambar")
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

        }
    }

    const addKategoriImage = async (id) => {
        try {
            const response = await axiosFetch.post("/facility/category/image/store", {
                base64_image: imageData,
                facility_category_id: id
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.key,
                },
            })
            const json = response.data
            console.log(json)
            getListCategory()
            setOpen(false)
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

        }
    }
    const updateKategori = async () => {
        try {
            if (name == "") {
                alert("Pastikan kolom tidak ada yang kosong")
                return
            }
            const response = await axiosFetch.put("/facility/category/update", {
                facility_category_id: id,
                name: name,
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
                if (imageData != '') {
                    addKategoriImage(json.data.id)
                    return
                }
                setOpen(false)
                getListCategory()
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

        }
    }
    const deleteKategori = async (id) => {
        try {
            if (!window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
                return
            }
            const response = await axiosFetch.delete("/facility/category/delete", {
                data: {
                    facility_category_id: id
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.key,
                },
            })
            const json = response.data
            console.log(json)
            if (json.status == 200) {
                getListCategory()
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

        }
    }
    useState(() => {
        getListCategory()
    })
    const [open, setOpen] = useState(false)
    const [id, setId] = useState()
    const [name, setName] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [kategori, setKategori] = useState("")

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

    return (
        <div className="main">
            <div className="content">
                <div className="content-main">

                    <div>
                        <div style={{ display: "flex" }}>
                            <div className="subtitle" style={{ width: "100%" }}>Kategori fasilitas umum</div>
                            <button className="button add-button" onClick={() => {
                                setOpen(true)
                                setIsEdit(false)
                            }}>Tambah</button>
                        </div>
                        <Modal
                            open={open}
                            onClose={() => { setOpen(false) }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <div className="modal">
                                <div className="inputtitle" style={{ fontSize: 20, fontWeight: "bold" }}>{isEdit ? "Edit Kategori" : "Tambah Kategori"}</div>
                                <div className="inputtitle" style={{ marginTop: 15 }}>Nama Kategori</div>
                                <input className="inputtext" onChange={(e) => { setName(e.target.value) }} value={name} style={{ marginTop: 5 }} ></input>
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
                                <button className="button add-button" onClick={() => { isEdit ? updateKategori(id) : addKategori() }} style={{ marginTop: 15, float: "right" }} >{isEdit ? "Update" : "Tambah"}</button>
                            </div>
                        </Modal>
                        <div style={{ marginTop: 15 }}>
                            {spinner ? (
                                <ShimmerTable row={1}></ShimmerTable>
                            ) : (<DataTable
                                columns={categoryColumns}
                                data={category}
                                direction="auto"
                                fixedHeaderScrollHeight="300px"
                                pagination
                                responsive
                                subHeaderAlign="right"
                                subHeaderWrap
                            />)}
                        </div>
                    </div>
                    <div style={{ backgroundColor: "grey", height: 2, marginTop: 30, marginBottom: 30, display: "flex" }}></div>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={kategori}
                                label="Kategori"
                                onChange={(e) => {
                                    setKategori(e.target.value)
                                    getListFasum(e.target.value)
                                }
                                }
                                style={{ marginTop: 15 }}
                            >
                                {category.map((item, index) => (
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div style={{ display: "flex", marginTop: 15 }}>
                            <div className="subtitle" style={{ width: "100%" }}>Fasilitas Umum</div>
                            <Link to="/fasum/add" style={{ textDecoration: "none" }}>
                                <button className="button add-button" >Tambah</button>
                            </Link>
                        </div>

                        <div style={{ marginTop: 15 }}>
                            {spinner ? (<ShimmerTable size="sm"></ShimmerTable>) : (<DataTable
                                columns={columns}
                                data={data}
                                direction="auto"
                                fixedHeaderScrollHeight="300px"
                                pagination
                                responsive
                                subHeaderAlign="right"
                                subHeaderWrap
                            />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}