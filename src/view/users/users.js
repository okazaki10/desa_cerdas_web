import { Button, Modal, Typography } from "@mui/material";
import { Box, width } from "@mui/system";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { ShimmerTable } from "react-shimmer-effects";
import axiosFetch, { fetchError, SERVER } from "../../base_url";

export default function Users() {
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nama toko',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Alamat',
            selector: row => row.address + ", " + row.city + ", " + row.province + ", " + row.postal_code,
            sortable: true,
        }, {
            name: 'Nomor Handphone',
            selector: row => row.phone,
            sortable: true,
        }, {
            name: 'Di Approve?',
            selector: row => row.is_approved=="0"? "Belum":"Sudah",
            sortable: true,
        },
        {
            name: "Aksi", cell: row =>
                <div style={{ width: 200 }}>

                    <button className="button edit-button" onClick={() => {
                        setOpen(true)
                        setId(row.id)
                        setIsEdit(true)
                    }} >Approve</button>
                    <button className="button delete-button" onClick={() => { deleteKategori(row.id) }} style={{ marginLeft: 5 }}>Delete</button>

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
    const [listusers, setListusers] = useState([])
    const [cookies, setCookie] = useCookies(['key']);
    const key = cookies.key
    const [spinner, setspinner] = useState(false)
    const getListusers = async () => {
        try {
            setspinner(true)
            const response = await axiosFetch.get("/merchant/list", {
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
            const response = await axiosFetch.get("/users/category", {
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
    const deleteusers = async (id) => {
        try {
            if (!window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
                return
            }
            const response = await axiosFetch.delete("/users/list/delete", {
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
                getListusers()
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
            const response = await axiosFetch.post("/users/category/store", {
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
    const approveUsers = async () => {
        try {
            const response = await axiosFetch.put("/merchant/approve", {
                id: id,
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
                getListusers()
                //getListCategory()
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
            const response = await axiosFetch.delete("/user/delete", {
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
        getListusers()
        //getListCategory()
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
                   
                        <Modal
                            open={open}
                            onClose={() => { setOpen(false) }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <div className="modal">
                                <div className="inputtitle" style={{ fontSize: 20, fontWeight: "bold",textAlign:"center" }}>Approve User?</div>
                                <button className="button add-button" onClick={() => { approveUsers(id) }} style={{ marginTop: 15,marginRight:15 }} >Approve</button>
                                <button className="button decline-button" onClick={() => { setOpen(false) }} style={{ marginTop: 15 }} >Batal</button>
                            </div>
                        </Modal>
                 
                    </div>
                     <div>
                        <div style={{ display: "flex" }}>
                            <div className="subtitle" style={{ width: "100%" }}>List Toko User</div>
                          
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