import { Button, Modal, Typography } from "@mui/material";
import { Box, width } from "@mui/system";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { ShimmerTable } from "react-shimmer-effects";
import axiosFetch, { fetchError, SERVER } from "../../base_url";

export default function Wisata() {
    const columns = [
        {
            name: 'ID',
            selector: row => row.wisata?.id,
            sortable: true,
        },
        {
            name: 'Nama Wisata',
            selector: row => row.wisata?.name,
            sortable: true,
        },
        {
            name: 'Deskripsi',
            selector: row => row.wisata?.description,
            sortable: true,
        }, {
            name: 'Gambar',
            selector: row => <div style={{ width: 200 }}>
                <img src={SERVER + "/" + row.wisata?.thumbnail_url} style={{ width: 100 }} />
            </div>,
        }, {
            name: 'Nomor Handphone',
            selector: row => row.wisata?.phone,
            sortable: true,
        }, {
            name: 'Informasi',
            selector: row => row.wisata?.information,
            sortable: true,
        },
        {
            name: 'Kategori',
            selector: row => row.wisata?.category?.name,
            sortable: true,
        },
        {
            name: "Aksi", cell: row =>
                <div style={{ width: 200 }}>
                    <Link to={`/wisata/edit/${row.wisata?.id}`}>
                        <button className="button edit-button" >Edit</button>
                    </Link>
                    <button className="button delete-button" onClick={() => { deleteWisata(row.wisata?.id) }} style={{ marginLeft: 5 }}>Delete</button>

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
    const deleteWisata = async (id) => {
        try {
            if (!window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
                return
            }
            const response = await axiosFetch.delete("/wisata/list/delete", {
                data: {
                    id: id
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + key,
                },
            })
            const json = response.data
            console.log(json)
            if (json.status == 200) {
                getListWisata()
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
            const response = await axiosFetch.post("/wisata/category/store", {
                name: name,
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
    const updateKategori = async () => {
        try {
            if (name == "") {
                alert("Pastikan kolom tidak ada yang kosong")
                return
            }
            const response = await axiosFetch.put("/wisata/category/update", {
                id: id,
                name: name,
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
            const response = await axiosFetch.delete("/wisata/category/delete", {
                data: {
                    id: id
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + key,
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
        getListWisata()
        getListCategory()
    })
    const [open, setOpen] = useState(false)
    const [id, setId] = useState()
    const [name, setName] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    return (
        <div className="main">
            <div className="content">
                <div className="content-main">

                    <div>
                        <div style={{ display: "flex" }}>
                            <div className="subtitle" style={{ width: "100%" }}>Kategori Wisata</div>
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
                        <div style={{ display: "flex" }}>
                            <div className="subtitle" style={{ width: "100%" }}>Wisata</div>
                            <Link to="/wisata/add" style={{ textDecoration: "none" }}>
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