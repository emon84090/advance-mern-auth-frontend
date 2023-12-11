import { Outlet } from "react-router-dom";
import Home from "../Home";
import Navbar from "../components/Navbar/Navbar";


const Main = () => {
    return (
        <>
            <Navbar></Navbar>
            <Home></Home>
            <Outlet />
        </>
    );
};

export default Main;