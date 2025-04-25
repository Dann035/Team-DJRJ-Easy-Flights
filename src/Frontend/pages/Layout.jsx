import { Outlet, useLocation } from "react-router-dom"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

export const Layout = () => {
    const location = useLocation()
    const hideNavAndFooter = ["/login", "/signup", "/signupCompany"].includes(location.pathname)

    return (
        <ScrollToTop>
            {!hideNavAndFooter && <Navbar />}
            <Outlet />
            {!hideNavAndFooter && <Footer />}
        </ScrollToTop>
    )
}