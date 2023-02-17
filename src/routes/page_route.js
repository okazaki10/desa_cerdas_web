import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Apbdes from "../view/ApbdesView/Apbdes";
import AddApbdes from "../view/ApbdesView/AddApbdes";
import AddFasum from "../view/FasumView/AddFasum";
import Fasum from "../view/FasumView/Fasum";
import Home from "../view/home";
import AddVillage from "../view/homepage/AddVillage";
import HomePage from "../view/homepage/homepage";
import Infrastruktur from "../view/infrastruktur/infrastruktur";
import TambahInfrastruktur from "../view/infrastruktur/tambah_infrastruktur";
import Login from "../view/login/login";
import AddOrganisation from "../view/OrganisationView/AddOrganisation";
import Organisation from "../view/OrganisationView/Organisation";
import TambahUsers from "../view/users/tambah_users";
import Users from "../view/users/users";
import TambahWisata from "../view/wisata/tambah_wisata";
import Wisata from "../view/wisata/wisata";


export default function PageRoute() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}>
          <Route path="" element={<HomePage />}></Route>
          <Route path="users/">
            <Route path="" element={<Users />}></Route>
            <Route path="add" element={<TambahUsers />}></Route>
            <Route path="edit/:id" element={<TambahUsers />}></Route>
          </Route>
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
          <Route path="fasum/">
            <Route path="" element={<Fasum />}></Route>
            <Route path="add" element={<AddFasum />}></Route>
            <Route path="edit/:id" element={<AddFasum />}></Route>
          </Route>
          <Route path="organisasi/">
            <Route path="" element={<Organisation />}></Route>
            <Route path="add/:id" element={<AddOrganisation />}></Route>
            <Route path="edit/:id" element={<AddOrganisation />}></Route>
          </Route>
          <Route path="apbdes/">
            <Route path="" element={<Apbdes />}></Route>
            <Route path="add/:id" element={<AddApbdes />}></Route>
            <Route path="edit/:id" element={<AddApbdes />}></Route>
          </Route>
          <Route path="epasar" element={<HomePage />}></Route>
          <Route path="tpst" element={<HomePage />}></Route>
          <Route path="village/add" element={<AddVillage />}></Route>
          <Route path="village/edit/:id" element={<AddVillage />}></Route>
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
