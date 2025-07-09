import { Outlet } from "react-router-dom";
// import Navbar2 from "./Navbar2";
// import Footer from "./Footer";

function Layout (){
    return(
        <div>
       {/* <Navbar2/> */}
        <Outlet/>
        {/* <Footer/> */}
        </div>
        
    )
}
export default Layout