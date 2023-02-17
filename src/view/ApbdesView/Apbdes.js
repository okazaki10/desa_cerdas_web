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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function Apbdes() {
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nama item',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Deskripsi',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Tahun',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'Biaya',
            selector: row => row.cost,
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
    const [category, setCategory] = useState([
        {
            id: "pendapatan",
            name: "Pendapatan"
        },
        {
            id: "belanja",
            name: "Belanja"
        },
        {
            id: "pembayaran",
            name: "Pembayaran"
        }
    ])
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
    const getListYear = async () => {
        try {
            setspinner(true)
            const response = await axiosFetch.get("/information/budget/years", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.key,
                },
            })
            const json = response.data
            console.log(JSON.stringify(json))
            if (json.status == 200) {

                setListYear(json.data)
                if (json.data.length > 0) {
                    console.log("tahun " + json.data[0])
                    setTahun(json.data[0])
                    getListApbdes(kategori, json.data[0])
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
    const getListApbdes = async (kategori, tahun) => {
        try {
            setspinner(true)
            const response = await axiosFetch.get("/information/budget/index?category=" + kategori + "&year=" + tahun, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.key,
                },
            })
            const json = response.data
            console.log(JSON.stringify(json))
            if (json.status == 200) {
                setListApbdes(json.data.apbdes)
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

    const addApbdes = async () => {
        try {
            if (name == "") {
                alert("Pastikan kolom tidak ada yang kosong")
                return
            }
            console.log("kategori" + kategori)
            const response = await axiosFetch.post("/information/budget/store", {
                category: kategori,
                year: tahun,
                apbdes_data: [{
                    name: name,
                    description: description,
                    cost: cost
                }]
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
                alert("Berhasil tambah data")
                setOpen(false)
                getListApbdes(kategori, tahun)
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

    const addApbdesImage = async (id) => {
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
            getListYear()
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
                    addApbdesImage(json.data.id)
                    return
                }
                setOpen(false)
                getListYear()
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
                getListYear()
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
        getListYear()
    })
    const [open, setOpen] = useState(false)
    const [id, setId] = useState()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [year, setYear] = useState(new Date())
    const [cost, setCost] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [kategori, setKategori] = useState("pendapatan")
    const [listYear, setListYear] = useState([])
    const [listApbdes, setListApbdes] = useState([])
    const [tahun, setTahun] = useState("")
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
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tahun</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={tahun}
                                label="Tahun"
                                onChange={(e) => {
                                    setTahun(e.target.value)
                                    getListApbdes(kategori, e.target.value)
                                }
                                }
                                style={{ marginTop: 15 }}
                            >
                                {listYear.map((item, index) => (
                                    <MenuItem value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div style={{ marginTop: 15 }}></div>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={kategori}
                                label="Kategori"
                                onChange={(e) => {
                                    setKategori(e.target.value)
                                    getListApbdes(e.target.value, tahun)
                                }
                                }
                                style={{ marginTop: 15 }}
                            >
                                {category.map((item, index) => (
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div style={{ backgroundColor: "grey", height: 2, marginTop: 30, marginBottom: 30, display: "flex" }}></div>

                        <div style={{ display: "flex" }}>
                            <div className="subtitle" style={{ width: "100%" }}>Laporan Apbdes</div>
                            <button className="button add-button" disabled={spinner} onClick={() => {
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
                                <div className="inputtitle" style={{ fontSize: 20, fontWeight: "bold" }}>{isEdit ? "Edit Laporan" : "Tambah Laporan"}</div>
                                <div className="inputtitle" style={{ marginTop: 15 }}>Nama Laporan</div>
                                <input className="inputtext" onChange={(e) => { setName(e.target.value) }} value={name} style={{ marginTop: 5 }} ></input>
                                <div className="inputtitle" style={{ marginTop: 15 }}>Deskripsi</div>
                                <input className="inputtext" onChange={(e) => { setDescription(e.target.value) }} value={description} style={{ marginTop: 5 }} ></input>
                                {/*
                                <div className="inputtitle" style={{ marginTop: 15 }}>Tahun</div>
                                <DatePicker selected={year} onChange={setYear}></DatePicker>
                                */}
                                <div className="inputtitle" style={{ marginTop: 15 }}>Biaya</div>
                                <input className="inputtext" onChange={(e) => { setCost(e.target.value) }} value={cost} style={{ marginTop: 5 }} type="number"></input>
                                <button className="button add-button" onClick={() => { isEdit ? updateKategori(id) : addApbdes() }} style={{ marginTop: 15, float: "right" }} >{isEdit ? "Update" : "Tambah"}</button>
                            </div>
                        </Modal>

                        <div style={{ marginTop: 15 }}>
                            {spinner ? (
                                <ShimmerTable row={1}></ShimmerTable>
                            ) : (<DataTable
                                columns={columns}
                                data={listApbdes}
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