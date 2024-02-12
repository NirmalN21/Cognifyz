import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../constants';
import "./myPolls.css"

const MyPolls = () => {
    const [userPolls, setUserPolls] = useState([]);
    const [cookieValue, setCookieValue] = useState("");

    const fetchUserPolls = async () => {
        try {
            if (cookieValue) {
                const response = await axios.get(`${SERVER_URL}/user/myPolls?cookieValue=${cookieValue}`);
                setUserPolls(response.data);
            }

        } catch (error) {
            console.error('Error fetching user polls:', error);
        }
    };

    const deletePoll = async (pollId) => {
        try {
            if (cookieValue) {
                await axios.post(`${SERVER_URL}/user/deletePoll?pollId=${pollId}&cookieValue=${cookieValue}`)
                fetchUserPolls();
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        setCookieValue(document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        fetchUserPolls();
    }, [cookieValue]);

    return (
        <div className="myPolls">
            {userPolls.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {userPolls.map((poll, index) => (
                        <li key={poll._id} className="myPolls-item">
                            <h2>Poll No. {index + 1} </h2>
                            <div>
                                <h3>Q. {poll.question}</h3>
                                <ul>
                                    {poll.options.map((option, index) => (
                                        <li key={option.optionText}>
                                            <ul>{index + 1}</ul>
                                            <ul className="options" style={{
                                                background: `linear-gradient(to right,rgba(0, 128, 0, 0.5)${(option.votes / poll.votedUserCount * 100).toFixed(2)}%, rgba(0, 0, 0, 0) ${(option.votes / poll.votedUserCount * 100).toFixed(2)}%)`
                                            }}>
                                                {option.optionText}
                                            </ul>
                                            <span className='optionPercent'>{((option.votes / poll.votedUserCount) * 100).toFixed(2)}%</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="poll-details">{poll.votedUserCount} user have voted in this poll.</p>
                                <p className="poll-details">This poll was created on {new Date(poll.createdOn).toLocaleString("en-IN")}</p>
                                <button className="delete-button" onClick={() => deletePoll(poll._id)}>Delete Poll</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyPolls;
