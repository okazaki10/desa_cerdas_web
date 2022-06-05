import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { ShimmerTable } from "react-shimmer-effects";
import axiosFetch, { fetchError, SERVER } from "../../base_url";

export default function Wisata() {
    const columns = [
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
            name: "Aksi", cell: row =>
                <div style={{ width: 200 }}>
                    <Link to={`/wisata/edit/${row.wisata?.id}`}>
                        <button className="button edit-button" >Edit</button>
                    </Link>
                    <button className="button delete-button" onClick={() => { deleteWisata(row.wisata?.id) }} style={{ marginLeft: 5 }}>Delete</button>

                </div>
        },
    ];

    const [data, setdata] = useState([])
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
    useState(() => {
        getListWisata()
    })

    return (
        <div className="main">
            <div className="content">
                <div className="content-main">
                    <div style={{ display: "flex" }}>
                        <div className="subtitle" style={{ width: "100%" }}>Wisata</div>
                        <Link to="/wisata/add" style={{ textDecoration: "none" }}>
                            <button className="button add-button" >Tambah</button>
                        </Link>
                    </div>

                    <div style={{ marginTop: 15 }}>
                        {spinner ? (<ShimmerTable size="md"></ShimmerTable>) : (<DataTable
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
    )
}