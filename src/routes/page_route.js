import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../view/home";
import HomePage from "../view/homepage/homepage";
import Login from "../view/login/login";
import TambahWisata from "../view/wisata/tambah_wisata";
import Wisata from "../view/wisata/wisata";


export default function PageRoute() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}>
          <Route path="" element={<HomePage />}></Route>

          <Route path="wisata/" element={<Home />}>
            <Route path="" element={<Wisata />}></Route>
            <Route path="add" element={<TambahWisata />}></Route>
            <Route path="edit/:id" element={<TambahWisata />}></Route>
          </Route>
          
          <Route path="epasar" element={<HomePage />}></Route>
          <Route path="tpst" element={<HomePage />}></Route>
          <Route
            path="*"
            element={<Navigate to="/404" />}
          />
        </Route>
        <Route path="/404" element={<div>not found</div>}></Route>
      </Routes>

    </BrowserRouter>
  );
}
