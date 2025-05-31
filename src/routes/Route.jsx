import { BrowserRouter, Routes, Route } from "react-router";
import { LandingPage, OverviewPage, RegisterPage, LoginPage, HomePage, ValidateWebsitePage, EducationPage } from "../pages";
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
                <Route path="/overview" element={<OverviewPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/validate-website" element={<ValidateWebsitePage/>}/>
                <Route path="/education" element={<EducationPage/>}/>
               {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;