import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [availableQuiz, setAvailableQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/api/users/users/quiz-attempts", {
          headers: {
            token,
          },
        }); // Assuming your backend has an endpoint to fetch user data
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    const availableQuiz = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/api/quizzes", {
          headers: {
            token,
          },
        }); // Assuming your backend has an endpoint to fetch user data
        setAvailableQuiz(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    availableQuiz();
    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <h2>User Dashboard</h2>
      {userData && (
        <div>
          <p>Welcome, {userData.username}!</p>
          <p>Total quizzes attempted: {userData.quizzesAttempted.length}</p>
        </div>
      )}

      {/* fetch all the available quiz */}
      <h1>Available Quiz</h1>

      {availableQuiz.map((item) => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <Button onClick={() => navigate(`/quiz/${item._id}`)}>Attempt</Button>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
