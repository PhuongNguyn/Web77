import { Outlet } from "react-router"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"

const AuthLayout = () => {
    return (
        <><Header /><Outlet /><Sidebar /></>
    )
}

export default AuthLayout