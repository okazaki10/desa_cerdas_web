import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../view/home";
import HomePage from "../view/homepage/homepage";
import Infrastruktur from "../view/infrastruktur/infrastruktur";
import TambahInfrastruktur from "../view/infrastruktur/tambah_infrastruktur";
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

          <Route path="wisata/">
            <Route path="" element={<Wisata />}></Route>
            <Route path="add" element={<TambahWisata />}></Route>
            <Route path="edit/:id" element={<TambahWisata />}></Route>
          </Route>
          <Route path="infrastruktur/">
            <Route path="" element={<Infrastruktur />}></Route>
            <Route path="add" element={<TambahInfrastruktur />}></Route>
            <Route path="edit/:id" element={<TambahInfrastruktur />}></Route>
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
