import { Outlet, useLocation, useNavigation } from "react-router-dom"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"

export const Layout = () => {
    const location = useLocation();
    const navigation = useNavigation();

    const hideNavAndFooter = ["/login", "/signup", "/signupCompany"].includes(location.pathname);


    const isLoading = navigation.state === "loading";

    return (
        <ScrollToTop>
            {isLoading && <LoadingSpinner />} 
            {!hideNavAndFooter && <Navbar />}
            <Outlet />
            {!hideNavAndFooter && <Footer />}
        </ScrollToTop>
    );
};