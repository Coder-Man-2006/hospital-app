import React, { useState } from 'react';
import './NameAgeForm.css'; 

const NameAgeForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, age);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 className="hospital-name">Hospital Name</h1>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Age: </label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NameAgeForm;
