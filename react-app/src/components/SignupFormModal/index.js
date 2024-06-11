import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div className="signup-modal-div">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-label-input-div">
          <label className="signup-label">Email :</label>
          <input
            className="signup-input-text"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="signup-label-input-div">
          <label className="signup-label">Username :</label>
          <input
            className="signup-input-text"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="signup-label-input-div">
          <label className="signup-label">Password :</label>
          <input
            className="signup-input-text"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signup-label-input-div">
          <label className="signup-label">Confirm Password :</label>
          <input
            className="signup-input-text"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="signup-btn" type="submit">
          Create account
        </button>
      </form>

      {errors && errors["username"] && (
        <p className="p-error">{errors["username"]}</p>
      )}
      {errors && errors["email"] && (
        <p className="p-error">{errors["email"]}</p>
      )}
      {errors && errors["password"] && (
        <p className="p-error">{errors["password"]}</p>
      )}
    </div>
  );
}

export default SignupFormModal;
