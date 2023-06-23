import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/index";
import Signin from "./pages/Authentication/Login/signin";
import SignupL from "./pages/Authentication/Registration/Landlord/signup";
import SignupT from "./pages/Authentication/Registration/Tenant/signup";
import DashboardL from "./pages/LandlordUI/DashboardL";
import Rooms from "./pages/LandlordUI/DashboardL/indexRooms";
import MyTenants from "./pages/LandlordUI/MyTenants";
import TenantsBalance from "./pages/LandlordUI/TenantsBalance";
import RecentPayments from "./pages/LandlordUI/RecentPayments";
import MissedPayments from "./pages/LandlordUI/MissedPayments";
import DashboardT from "./pages/TenantUI/DashboardT";
import Selection from "./pages/Authentication/Registration/Selection/selection";
import Activated from "./pages/Activated/activated";
import CheckIn from "./pages/TenantUI/Check-In";
import NotFoundL from "./pages/NotFound/NotFoundL";
import store from "./plugins/store";
import { Provider } from "react-redux";
import logo from "./components/images/logo.png";

const App = () => {
  useEffect(() => {
    document.title = "Living Link";
    const favicon = document.getElementById("favicon");
    favicon.href = logo;
  }, []);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Selection" element={<Selection />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/SignupL" element={<SignupL />} />
          <Route path="/SignupT" element={<SignupT />} />
          <Route path="/DashboardL" element={<DashboardL />} />
          <Route path="/Rooms" element={<Rooms />} />
          <Route path="/CheckIn" element={<CheckIn />} />
          <Route path="/DashboardT" element={<DashboardT />} />
          <Route path="/Activated" element={<Activated />} />
          <Route path="/MyTenants" element={<MyTenants />} />
          <Route path="/RecentPayments" element={<RecentPayments />} />
          <Route path="/MissedPayments" element={<MissedPayments />} />
          <Route path="/TenantsBalance" element={<TenantsBalance />} />
          <Route path="/NotFoundL" element={<NotFoundL />} />
        </Routes>
      </HashRouter>
      <link rel="icon" id="favicon" href="./components/images/logo.png" />
    </>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
