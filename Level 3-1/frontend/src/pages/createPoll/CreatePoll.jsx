import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../createPoll/createPoll.css"
import { SERVER_URL } from '../../constants';

const CreatePoll = () => {
  const [pollData, setPollData] = useState({
    username: '',
    question: '',
    options: ['', ''], // Initially provide two empty options
    deletingOn: '', // New field for deletingOn
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === 'options') {
      // Update the specific option based on the index
      const updatedOptions = [...pollData.options];
      updatedOptions[index] = value;

      setPollData((prevData) => ({
        ...prevData,
        options: updatedOptions,
      }));
    } else {
      setPollData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddOption = () => {
    // Add a new empty option
    setPollData((prevData) => ({
      ...prevData,
      options: [...prevData.options, '']
    }));
  };

  const handleRemoveOption = (index) => {
    // Remove the option at the specified index
    const updatedOptions = pollData.options.filter((_, i) => i !== index);
    setPollData((prevData) => ({
      ...prevData,
      options: updatedOptions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your create poll logic here
    let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    axios.post(`${SERVER_URL}/user/create-poll`, { pollData, cookieValue })
      .then(() => {
        alert("Poll created successfully");
      })
      .catch((err) => {
        console.log("Error", err);
      })

    // Reset the form after handling the data
    // setPollData({
    //   question: '',
    //   options: ['', ''],
    // });
  };

  useEffect(() => {
    setPollData((prevData) => ({
      ...prevData,
      username: JSON.parse(localStorage.getItem('username')),
    }));
  }, []);

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const getMaxDateTime = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // Set the maximum date to 30 days from now
    const year = maxDate.getFullYear();
    const month = String(maxDate.getMonth() + 1).padStart(2, '0');
    const day = String(maxDate.getDate()).padStart(2, '0');
    const hours = String(maxDate.getHours()).padStart(2, '0');
    const minutes = String(maxDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="createPoll-container">
      <h2>Create Poll</h2>
      <form onSubmit={handleSubmit}>
        <label>Poll Question:</label>
        <input
          type="text"
          name="question"
          value={pollData.question}
          onChange={(e) => handleChange(e)}
          required
        />

        <br />

        <label>
          Poll Options:
          {pollData.options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                name="options"
                value={option}
                onChange={(e) => handleChange(e, index)}
                required
              />
              {pollData.options.length > 2 && (
                <button type="button" className="remove-button" onClick={() => handleRemoveOption(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" className="add-button" onClick={handleAddOption}>
            Add Option
          </button>
        </label>
        <br />

        <label>
          Deleting On (Optional):
          <input
            type="datetime-local" // You can choose an appropriate input type for date/time
            name="deletingOn"
            value={pollData.deletingOn}
            onChange={(e) => handleChange(e)}
            min={getCurrentDateTime()}  // Set the minimum date to the current date and time
            max={getMaxDateTime()}      // Set the maximum date to a specific value
          />
        </label>
        <br />

        <button type="submit" className="submit-button">Create Poll</button>
      </form>
    </div>
  );
};

export default CreatePoll;
