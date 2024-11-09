import React, { useState, useEffect } from 'react';
import './AccountSettingsForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const AccountSettingsForm = ({  }) => {
  const navigate =useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    Email: '',
    PhoneNo: '',
    Address: '',
    City: '',
    State: '',
    PinCode: '',
  });


  useEffect(() => {
    const getUserDetails = async () => {
      let userName=sessionStorage.getItem('userName');
      const response = await axios.get("https://localhost:44332/GetUserDetails?userName="+userName, {
        headers: { 'Content-Type': 'application/json' }
      });
    // Pre-populate data from userData if available
    const user = response.data.result[0];
      setFormData({
        userName: user.UserName || '',
          Email: user.Email || '',
          PhoneNo: user.PhoneNo || '',
          Address: user.Address || '',
          City: user.City || '',
          State: user.State || '',
          PinCode: user.PinCode || ''
            });
          }
          getUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your form submission logic here
    const response = await axios.post("https://localhost:44332/UpdateUserDetails", formData, {
      headers: { 'Content-Type': 'application/json' }
    });
    setTimeout(() => {
      navigate('/Homepage/profile');
  }, 1000);
      };


  return (
    <form className="account-settings-form" onSubmit={handleSubmit}>
      <h2>Edit Account Settings</h2>
      
      {/* Personal Information Section */}
      <div className="form-section">
        <label>Username</label>
        <input type="text" name="userName" value={formData.userName} readOnly />

        <label>Email</label>
        <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />

        <label>Phone</label>
        <input type="tel" name="PhoneNo" value={formData.PhoneNo} onChange={handleChange} required />
      </div>

      {/* Address Section */}
      <h3>Address</h3>
      <div className="form-section">
        <label>Address Line 1</label>
        <input type="text" name="Address" value={formData.Address} onChange={handleChange} required />
        <label>City</label>
        <select type="text" name="City" value={formData.City} onChange={handleChange} required >
        <option value="Pune">Pune</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Nagpur">Nagpur</option>
        </select>

        <label>State</label>
        <select type="text" name="State" value={formData.State} onChange={handleChange} required >
        <option value="Maharashtra">Maharashtra</option>
        </select>

        <label>Pincode</label>
        <input type="text" name="PinCode" value={formData.PinCode} onChange={handleChange} required />

        <label>Country</label>
        <select name="country" value="India" onChange={handleChange} required>
          <option value="IN">India</option>
        </select>
      </div>

      <button type="submit" className="btn-save" >Save Changes</button>
    </form>
  );
};

export default AccountSettingsForm;
