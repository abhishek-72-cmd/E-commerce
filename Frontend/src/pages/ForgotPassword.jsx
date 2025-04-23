import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgotPassword', {
        email,
        newPassword
      });
      setMessage(response.data.message || 'Password reset successful!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <form className="bg-light p-4 rounded shadow-sm w-100" style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Reset Password</h2>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning w-100">Reset Password</button>
        <p className="text-center mt-3 text-danger">{message}</p>
      </form>
    </div>
  );
};

export default ForgotPassword;
