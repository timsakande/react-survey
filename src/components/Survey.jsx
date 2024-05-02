import { useState } from "react";

function Survey() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    color: "",
    "spend-time": [],
    review: "",
    username: "",
    email: "",
  });
  const [answers, setAnswers] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? (checked ? [...prevFormData[name], value] : prevFormData[name].filter((item) => item !== value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setAnswers((prevAnswers) => [...prevAnswers, formData]);
    setFormData({
      color: "",
      "spend-time": [],
      review: "",
      username: "",
      email: "",
    });
  };

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        {answers.map((answer, index) => (
          <div key={index}>
            <p>Color: {answer.color}</p>
            <p>Spend Time: {answer["spend-time"].join(", ")}</p>
            <p>Review: {answer.review}</p>
            <p>Username: {answer.username}</p>
            <p>Email: {answer.email}</p>
          </div>
        ))}
      </section>
      <section className="survey__form">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Tell us what you think about your rubber duck!</h2>
          <div className="form__group radio">
            <h3>How do you rate your rubber duck colour?</h3>
            <ul>
              {[...Array(4)].map((_, index) => (
                <li key={index}>
                  <input
                    id={`color-${index + 1}`}
                    type="radio"
                    name="color"
                    value={index + 1}
                    checked={formData.color === (index + 1).toString()}
                    onChange={handleChange}
                  />
                  <label htmlFor={`color-${index + 1}`}>{index + 1}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="form__group">
            <h3>How do you like to spend time with your rubber duck</h3>
            <ul>
              {["Swimming", "Bathing", "Chatting", "I don't like to spend time with it"].map((option) => (
                <li key={option}>
                  <label>
                    <input
                      name="spend-time"
                      type="checkbox"
                      value={option}
                      checked={formData["spend-time"].includes(option)}
                      onChange={handleChange}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <label>
            What else have you got to say about your rubber duck?
            <textarea name="review" cols="30" rows="10" value={formData.review} onChange={handleChange}></textarea>
          </label>
          <label>
            Put your name here (if you feel like it):
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </label>
          <label>
            Leave us your email pretty please??
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <input className="form__submit" type="submit" value="Submit Survey!" />
        </form>
      </section>
    </main>
  );
}

export default Survey;