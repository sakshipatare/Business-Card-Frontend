import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/users/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password,
          confirmPassword,
        })
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Signup successful! Please verify your account and then login.");
        navigate("/");
      } else {
        alert(result.message || "Signup failed.");
      }

    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-form">
      <div className="login-form__header">
        <div className="login-form__icon">
          <CreditCard className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="login-form__title">Create Your Digital Business Card</h2>
        <p className="login-form__subtitle">Join thousands of professionals sharing their contact info digitally</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form__form">
        <div className="login-form__field">
          <label className="login-form__label">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            className="login-form__input"
            placeholder="John"
            required
          />
        </div>

        <div className="login-form__field">
          <label className="login-form__label">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            className="login-form__input"
            placeholder="Doe"
            required
          />
        </div>

        <div className="login-form__field">
          <label className="login-form__label">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="login-form__input"
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="login-form__field">
          <label className="login-form__label">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="login-form__input"
            required
          />
        </div>

        <div className="login-form__field">
          <label className="login-form__label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="login-form__input"
            required
          />
        </div>

        <button type="submit" className="login-form__submit">Create Account</button>
      </form>

      <div className="login-form__footer">
        <p className="login-form__footer-text">
          Already have an account?{' '}
          <Link to="/" className="login-form__footer-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
