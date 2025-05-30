import { BrowserRouter, Routes, Route } from "react-router";
import { LandingPage, HomePage, RegisterPage, LoginPage } from "../pages";
import { Layout } from "../components/templates";
// import Middleware from "./Middleware";

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <LoginPage />
                        // <Middleware type="not-required">
                        // </Middleware>
                    }
                />
                <Route path="/register" element={<RegisterPage/>}/>


                <Route
                    path="/"
                    element={
                        <Layout />
                    }
                >
                    <Route index element={<LandingPage />} />
                </Route>
                <Route path="/home" element={<HomePage/>}/>
               {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;