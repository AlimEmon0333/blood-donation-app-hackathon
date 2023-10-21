import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../../authentication/login";
import SignUp from "../../authentication/signUp";
import Donors from "../../screens/donorsForm";
import Recipients from "../../screens/receipentsForm";
import DonorsForm from "../../screens/donorsForm";
import RecipientsForm from "../../screens/receipentsForm";
import ReciepentsPage from "../../screens/recipients";
import DonorsPage from "../../screens/donors";
export default function AppRouter() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="signUp" element={<SignUp/>}/>
                    <Route path="donorsForm" element={<DonorsForm/>}/>
                    <Route path="recipientsForm" element={<RecipientsForm/>}/>
                    <Route path="recipientScreen" element={<ReciepentsPage />}/>
                    <Route path="donorsScreen" element={<DonorsPage />}/>
                </Routes>
            </Router>
        </>
    )
}