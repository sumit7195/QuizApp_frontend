import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const EditQuizForm = () => {
  const params = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: [
      {
        questionText: "",
        questionType: "MCQ",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ],
  });

  useEffect(() => {
    fetchQuizData();
  }, [params.id]);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/quizzes/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const { title, description, questions } = response.data;
      setFormData({ title, description, questions });
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      // Handle error message or retry logic
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newQuestions = [...formData.questions];
    newQuestions[index] = { ...newQuestions[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, questions: newQuestions }));
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index].options[optionIndex] = value;
    setFormData((prevData) => ({ ...prevData, questions: newQuestions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE_URL}/api/admin/quizzes/${params.id}`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log("Quiz updated:", response.data);
      // Reset form or handle success message
    } catch (error) {
      console.error("Error updating quiz:", error);
      // Handle error message or retry logic
    }
  };

  const handleAddQuestion = () => {
    setFormData((prevData) => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        {
          questionText: "",
          questionType: "MCQ",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    }));
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...formData.questions];
    newQuestions.splice(index, 1);
    setFormData((prevData) => ({ ...prevData, questions: newQuestions }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter quiz title"
          required
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter quiz description"
          required
        />
      </Form.Group>

      {formData.questions.map((question, index) => (
        <div key={index}>
          <Form.Group controlId={`questionText${index}`}>
            <Form.Label>Question {index + 1}:</Form.Label>
            <Form.Control
              type="text"
              name="questionText"
              value={question.questionText}
              onChange={(e) => handleChange(e, index)}
              placeholder="Enter question text"
              required
            />
          </Form.Group>

          <Form.Group controlId={`questionType${index}`}>
            <Form.Label>Question Type:</Form.Label>
            <Form.Control
              as="select"
              name="questionType"
              value={question.questionType}
              onChange={(e) => handleChange(e, index)}
              required
            >
              <option value="MCQ">Multiple Choice (MCQ)</option>
              <option value="YesNo">Yes/No</option>
              <option value="Custom">Custom</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId={`options${index}`}>
            <Form.Label>Options:</Form.Label>
            {question.options.map((option, optionIndex) => (
              <Form.Control
                key={optionIndex}
                type="text"
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, optionIndex, e.target.value)
                }
                placeholder={`Option ${optionIndex + 1}`}
                required
              />
            ))}
          </Form.Group>

          <Form.Group controlId={`correctAnswer${index}`}>
            <Form.Label>Correct Answer:</Form.Label>
            <Form.Control
              type="text"
              name="correctAnswer"
              value={question.correctAnswer}
              onChange={(e) => handleChange(e, index)}
              placeholder="Enter correct answer"
              required
            />
          </Form.Group>

          <Button variant="danger" onClick={() => handleRemoveQuestion(index)}>
            Remove Question
          </Button>

          <hr />
        </div>
      ))}

      <Button variant="primary" onClick={handleAddQuestion}>
        Add Question
      </Button>

      <Button variant="primary" type="submit">
        Update Quiz
      </Button>
    </Form>
  );
};

export default EditQuizForm;
