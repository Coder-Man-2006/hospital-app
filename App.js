import React, { useState } from 'react';
import axios from 'axios';
import NameAgeForm from './NameAgeForm';
import SymptomForm from './SymptomForm';
import SymptomList from './SymptomList';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleNameAgeSubmit = (name, age) => {
    setName(name);
    setAge(age);
    setStep(2);
  };

  const addSymptom = (symptom) => {
    setSymptoms([...symptoms, symptom]);
  };

  const removeSymptom = (indexToRemove) => {
    setSymptoms(symptoms.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    const patientData = {
      name,
      age: Number(age),
      symptoms,
    };
    
    var data = JSON.stringify(patientData);
    
    
    try {
      const response = await axios.post(
        'https://us-west-2.aws.neurelo.com/rest/Patients/__one?',
        data,
        {
          headers: {
            'X-API-KEY': 'neurelo_9wKFBp874Z5xFw6ZCfvhXWypyrEBUQsaM1t2HZVp+mMZJY/yB5Wjgwn1jdZk/ziZrlXXAcy8Gi7xGsLHmqyVkIR3hLzsjaSLwrj7SgkL9aX87MuK3xsg4mKAcGElsFoWJn3cFK/iU/oO2tBWkSxIUracSYxf72uO3NX0zXo/n1mzr7noOlWDVrpw1lFJLyRZ_fXHp+SEwJE0/1oIRgSC7shacp6jBbDwiEEFEI+pdgeU=',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Data submitted successfully:', response.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmitError(error.message);
    }
  };

  if (submitted) return <p>Data submitted successfully!</p>;

  return (
    <div className="App">
      {step === 1 ? (
        <NameAgeForm onSubmit={handleNameAgeSubmit} />
      ) : (
        <>
          <h1>Symptom Checker</h1>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
          <SymptomForm onAddSymptom={addSymptom} />
          <SymptomList symptoms={symptoms} removeSymptom={removeSymptom} />
          <button onClick={handleSubmit}>Submit</button>
          {submitError && <p>Error: {submitError}</p>}
        </>
      )}
    </div>
  );
}

export default App;
