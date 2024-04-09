import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [userData, setUserData] = useState(null);
  //   const [availableQuiz, setAvailableQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/api/admin/admin-quizzes", {
          headers: {
            token,
          },
        }); // Assuming your backend has an endpoint to fetch user data
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const deleteQuiz = async ( id ) => {

    const updatedQuiz = userData.filter((item) => item._id !== id);

    setUserData(updatedQuiz);

    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(`/api/admin/quizzes/${id}`, {
        headers: { token },
      });
      console.log("response from delete", res);
      alert("Quiz deleted successfully");
    } catch (err) {
      console.log("errr", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <Button onClick={() => navigate("/add-quiz")}>Create New Quiz</Button>

      <span>Quiz created by you</span>

      {userData.map((item) => (
        <div
          key={item._id}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <div>{item.title}</div>
          <Button onClick={() => deleteQuiz(item._id)}>Delete Quiz</Button>
          <Button onClick={() => navigate(`/edit-quiz/${item._id}`)}>
            Edit Quiz
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
