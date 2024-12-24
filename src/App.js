import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import ListCategory from "./pages/booktypes/ListCategory";
import Command from "./pages/commandes/Commande";
import Subscribe from "./pages/subscribe/Subscribe";
import { CartProvider } from "use-shopping-cart";
import ListSub from "./pages/subTypes/Listsub";
import ListBook from "./pages/book/Listbook";
import Listauth from "./pages/author/Listauthor";
import User from "./pages/user/User";

const App = () => {
  const location = useLocation();
  const hideSidebarRoutes = ["/", "/register"];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);
  return (
    <div style={{ display: "flex" }}>
      {showSidebar && <Sidebar />}
      <div style={{ flex: 1, padding: "20px" }}>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/typebook" element={<ListCategory />} />
            <Route path="/book" element={<ListBook/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/subscribe" element={<Subscribe />} /> 
            <Route path="/typesub" element={<ListSub />} />           
            <Route path="/command" element={<Command />} />
            <Route path="/author" element={<Listauth />} />
            <Route path="/users" element={<User/>} />
          </Routes>
        </CartProvider>
      </div>
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
