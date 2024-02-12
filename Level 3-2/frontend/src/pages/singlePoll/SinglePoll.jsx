import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../timeline/timeline.css";
import { SERVER_URL } from '../../constants';
import { NavLink, useParams } from 'react-router-dom';

const SinglePoll = () => {

    const { pollId } = useParams();

    const [timelineData, setTimelineData] = useState([]);
    const [cookieValue, setCookieValue] = useState("");
    const [timeline, setTimeline] = useState("popular");

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const handleVote = (pollId, optionIndex) => {

        axios.post(`${SERVER_URL}/user/vote`, { pollId, optionIndex, cookieValue })
            .then(() => {
                fetchTimelineData();
            })
            .catch((err) => {
                console.log("Error", err);
            });
    };

    const fetchTimelineData = async () => {
        try {
            if (cookieValue) {
                let response = await fetch(`${SERVER_URL}/user/getSinglePoll/${pollId}?cookieValue=${cookieValue}`);
                const data = await response.json();
                console.log(data);
                setTimelineData(data);

            }

        } catch (error) {
            console.error('Error fetching timeline data:', error);
        }
    };

    useEffect(() => {
        setCookieValue(document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        fetchTimelineData();
    }, [cookieValue]);

    return (
        <div className="timeline">

            {timelineData.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    <li key={timelineData._id} className="timeline-item">
                        <h2>{timelineData.creator}'s Poll</h2>
                        <div className="poll-item">
                            <h3>Q. {timelineData.question}</h3>
                            <form>
                                {/* rendering based on whether the user has votted or not */}
                                {timelineData.hasVoted ? (
                                    <ul>
                                        {timelineData.options.map((option, index) => (
                                            <li key={option.optionText}>
                                                <input
                                                    type="radio"
                                                    id={`option${index}`}
                                                    name={`poll_${timelineData._id}`}
                                                    value={option.optionText}
                                                    onChange={() => handleVote(timelineData._id, index)}
                                                    disabled={timelineData.hasVoted} // Disable voting if user has already voted
                                                />
                                                <label htmlFor={`option${index}`} style={{
                                                    background: `linear-gradient(to right, ${option.selected ? 'rgba(0, 128, 0, 0.5)' : 'rgba(89, 89, 89,0.5)'} ${(option.votes / timelineData.votedUserCount * 100).toFixed(2)}%, rgba(0, 0, 0, 0) ${(option.votes / timelineData.votedUserCount * 100).toFixed(2)}%)`
                                                }}>
                                                    {option.optionText}
                                                </label>
                                                <span>{((option.votes / timelineData.votedUserCount) * 100).toFixed(2)}%</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <ul>
                                        {timelineData.options.map((option, index) => (
                                            <li key={option.optionText} className={option.selected ? 'selected-option' : ''}>
                                                <input
                                                    type="radio"
                                                    id={`option${index}`}
                                                    name={`poll_${timelineData._id}`}
                                                    value={option.optionText}
                                                    onChange={() => handleVote(timelineData._id, index)}
                                                />
                                                <label htmlFor={`option${index}`}>{option.optionText}</label>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                            </form>
                            {timelineData.hasVoted && <p>You have already voted in this poll.</p>}
                            {timelineData.hasVoted && <p>{timelineData.votedUserCount} users have already voted in this poll.</p>}
                            {timelineData.hasVoted && <p>This poll was created on {new Date(timelineData.createdOn).toLocaleString("en-IN")}</p>}
                        </div>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default SinglePoll;
