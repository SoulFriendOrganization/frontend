import { BrowserRouter, Routes, Route } from "react-router";
import { MoodPage, LandingPage, OverviewPage, RegisterPage, LoginPage, HomePage, ValidateWebsitePage, EducationPage, NotFoundPage, QuizPage, ChatbotPage } from "../pages";
import { PrivateRoute, PublicRoute } from "./ProtectedRoutes";

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                
                <Route element={<PublicRoute restricted={true} />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/overview" element={<OverviewPage />} />
                </Route>
                
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/validate-website" element={<ValidateWebsitePage />} />
                    <Route path="/education" element={<EducationPage />} />
                    <Route path="/quiz" element={<QuizPage />} />
                    <Route path="/mood-check" element={<MoodPage />} />
                    <Route path="/chatbot" element={<ChatbotPage />} />
                </Route>
                
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;