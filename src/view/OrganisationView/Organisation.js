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
export default function Organisation() {
    const patentColumns = [
        {
            name: 'ID',
            selector: row => row?.id,
            sortable: true,
        },
        {
            name: 'Nama paten',
            selector: row => row?.name,
            sortable: true,
        }, {
            name: 'Gambar',
            selector: row => <div style={{ width: 200 }}>
                <img src={SERVER + "/" + row?.image.url} style={{ width: 100 }} />
            </div>,
        },
        {
            name: "Aksi", cell: row =>
                <div style={{ width: 200 }}>
                    <Link to={`/organisasi/edit/${row?.id}`}>
                        <button className="button edit-button" >Edit/Lihat</button>
                    </Link>
                    <button className="button delete-button" onClick={() => { deletePatent(row?.id) }} style={{ marginLeft: 5 }}>Delete</button>

                </div>
        },
    ];
    const nonPatentColumns = [
        {
            name: 'ID',
            selector: row => row?.id,
            sortable: true,
        },
        {
            name: 'Nama paten',
            selector: row => row?.name,
            sortable: true,
        }, {
            name: 'Gambar',
            selector: row => <div style={{ width: 200 }}>
                <img src={SERVER + "/" + row?.image.url} style={{ width: 100 }} />
            </div>,
        },
        {
            name: "Aksi", cell: row =>
                <div style={{ width: 200 }}>
                    <Link to={`/organisasi/edit/${row?.id}`}>
                        <button className="button edit-button" >Edit/Lihat</button>
                    </Link>
                    <button className="button delete-button" onClick={() => { deletePatent(row?.id) }} style={{ marginLeft: 5 }}>Delete</button>

                </div>
        },
    ];
    const [patentList, setPatentList] = useState([])
    const [nonPatentList, setNonPatentList] = useState([])
    const [category, setCategory] = useState([])
    const [listinfrastruktur, setListinfrastruktur] = useState([])
    const [cookies, setCookie] = useCookies(['key']);
    const [spinner, setspinner] = useState(false)
    const getListinfrastruktur = async (id) => {
        try {
            setspinner(true)
            const response = await axiosFetch.post("/infrastruktur/list",
                { category_id: id },
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
                //setdata(json.data)
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
    const getListPatent = async () => {
        try {
            setspinner(true)
            const response = await axiosFetch.get("/information/organization/index", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.key,
                },
            })
            const json = response.data
            console.log(JSON.stringify(json))
            if (json.status == 200) {
                setPatentList(json.data.paten)
                setNonPatentList(json.data.non_paten)
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
    const deletePatent = async (id) => {
        try {
            if (!window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
                return
            }
            const response = await axiosFetch.delete("/information/organization/delete", {
                data: {
                    org_id: id
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
                getListPatent()
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
            const response = await axiosFetch.delete("/infrastruktur/category/delete", {
                data: {
                    id: id
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
                getListPatent()
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
        getListPatent()
    })
    const [open, setOpen] = useState(false)
    const [id, setId] = useState()
    const [name, setName] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [kategori, setKategori] = useState("")

    return (
        <div className="main">
            <div className="content">
                <div className="content-main">

                    <div>
                        <div style={{ display: "flex" }}>
                            <div className="subtitle" style={{ width: "100%" }}>Organisasi Paten</div>
                            <Link to="/organisasi/add/1" style={{ textDecoration: "none" }}>
                                <button className="button add-button" >Tambah Organisasi Paten</button>
                            </Link>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            {spinner ? (
                                <ShimmerTable row={1}></ShimmerTable>
                            ) : (<DataTable
                                columns={patentColumns}
                                data={patentList}
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
                        <div style={{ display: "flex", marginTop: 15 }}>
                            <div className="subtitle" style={{ width: "100%" }}>Organisasi Non-Paten</div>
                            <Link to="/organisasi/add/2" style={{ textDecoration: "none" }}>
                                <button className="button add-button" >Tambah Organisasi Non-Paten</button>
                            </Link>
                        </div>

                        <div style={{ marginTop: 15 }}>
                            {spinner ? (<ShimmerTable size="sm"></ShimmerTable>) : (<DataTable
                                columns={nonPatentColumns}
                                data={nonPatentList}
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