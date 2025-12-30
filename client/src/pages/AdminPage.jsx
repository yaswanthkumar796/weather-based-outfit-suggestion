import React, { useState } from 'react';
import { createOutfit } from '../api/outfitApi';
import './AdminPage.css';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Casual',
    items: '',
    imageUrl: '',
    season: 'Summer',
    gender: 'Unisex'
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data for backend
      const payload = {
        ...formData,
        // Convert comma-separated string to array
        items: formData.items.split(',').map(item => item.trim()),
        // Wrap single values in array to match Schema
        season: [formData.season],
      };

      await createOutfit(payload);
      setMessage('✅ Outfit Added Successfully!');

      // Reset form fields
      setFormData({
        ...formData,
        name: '',
        items: '',
        imageUrl: ''
      });

      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);

    } catch (error) {
      console.error(error);
      setMessage('❌ Error adding outfit.');
    }
  };

  return (
    <div className="admin-container">
      <h2>Add New Outfit</h2>
      {message && <p className="msg">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Outfit Name (e.g. Sunny Day Look)"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="imageUrl"
          placeholder="Image URL (http://...)"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />

        <input
          name="items"
          placeholder="Items (comma separated: Shirt, Jeans)"
          value={formData.items}
          onChange={handleChange}
          required
        />

        <div className="row">
          <label>Category:
            <select name="category" value={formData.category} onChange={handleChange}>
              <option>Casual</option>
              <option>Formal</option>
              <option>Sport</option>
            </select>
          </label>

          <label>Season:
            <select name="season" value={formData.season} onChange={handleChange}>
              <option>Summer</option>
              <option>Winter</option>
              <option>Spring</option>
              <option>Fall</option>
            </select>
          </label>

          <label>Gender:
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option>Unisex</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>
        </div>





        <button type="submit">Add Outfit</button>
      </form>
    </div>
  );
};

export default AdminPage;