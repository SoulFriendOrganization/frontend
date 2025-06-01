import { BrowserRouter, Routes, Route } from "react-router";
import { LandingPage, OverviewPage, RegisterPage, LoginPage, HomePage, ValidateWebsitePage, EducationPage, NotFoundPage, QuizPage } from "../pages";
import Middleware from "./Middleware";

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <Middleware type="no-need-login">
                            <LoginPage />
                        </Middleware>
                    }
                />
                <Route path="/register" element={
                    <Middleware type="no-need-login">
                        <RegisterPage/>
                    </Middleware>
                    }
                />
                <Route path="/" element={<Middleware type="need-login"><LandingPage /></Middleware>} />
                <Route path="/overview" element={<Middleware type="need-login"><OverviewPage/></Middleware>} />
                <Route path="/home" element={<Middleware type="need-login"><HomePage/></Middleware>} />
                <Route path="/validate-website" element={<Middleware type="need-login"><ValidateWebsitePage/></Middleware>} />
                <Route path="/education" element={<Middleware type="need-login"><EducationPage/></Middleware>} />
                <Route path="/quiz" element={<Middleware type="need-login"><QuizPage/></Middleware>} />
                {/* <Route path="/cek-mood" element={<Middleware type="need-login"><MoodPage/></Middleware>} /> */}
               <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;