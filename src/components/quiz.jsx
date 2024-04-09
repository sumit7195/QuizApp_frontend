import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const params = useParams();
  const navigate = useNavigate();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const fetchQuizData = async () => {
      const { id } = params;

      try {
        const response = await axios.get(`${API_BASE_URL}/api/quizzes/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setError("Failed to fetch quiz data");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [params, params.id]);

  const handleOptionChange = (questionId, optionIndex) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionId]: quizData.questions[questionId].options[optionIndex],
    }));
  };

  const handleSubmit = () => {
    const selectedAnswer = Object.values(selectedOptions);
    let ans = {};
    quizData.questions.forEach((item, index) => {
      ans[item._id] = selectedAnswer[index];
    });

    const data = { answers: ans };

    const id = params.id;

    axios.post(`${API_BASE_URL}/api/users/quizzes/${id}/submit`, data, {
      headers: { token: localStorage.getItem("token") },
    });

    alert("questions submitted successfully!");
    setTimeout(() => {
      navigate("/user-dashboard");
    }, 10);
  };

  const allQuestionsAnswered = () => {
    return Object.keys(selectedOptions).length === quizData.questions.length;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      {quizData && (
        <div>
          <h2>{quizData.title}</h2>
          <p>Description: {quizData.description}</p>
          <h3>Questions:</h3>
          <ul>
            {quizData.questions.map((question, questionIndex) => (
              <li key={questionIndex}>
                <strong>Question {questionIndex + 1}:</strong>{" "}
                {question.questionText}
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <div>
                      <Form.Check
                        inline
                        name={`question-${questionIndex}`}
                        type="radio"
                        checked={selectedOptions[questionIndex] === option}
                        onChange={() =>
                          handleOptionChange(questionIndex, optionIndex)
                        }
                      />
                      <span>{option}</span>
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
          <Button onClick={handleSubmit} disabled={!allQuestionsAnswered()}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
