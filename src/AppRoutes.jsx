import { Routes, Route, Navigate } from "react-router-dom";
import UserRegistration from "./components/userRegistration";
import HomePage from "./components/homePage";
import LoginForm from "./components/userLogin";
import UserDashboard from "./components/userDashboard";
import Quiz from "./components/quiz";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AddQuizForm from "./components/createQuiz";
import EditQuizForm from "./components/EditQuiz";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registration" element={<UserRegistration />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/add-quiz" element={<AddQuizForm />} />
      <Route path="/edit-quiz/:id" element={<EditQuizForm />} />
       
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
