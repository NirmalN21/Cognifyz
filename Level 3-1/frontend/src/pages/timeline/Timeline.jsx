import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../timeline/timeline.css";
import { SERVER_URL } from '../../constants';
import { NavLink } from 'react-router-dom';

const Timeline = () => {

  const [timelineData, setTimelineData] = useState([]);
  const [cookieValue, setCookieValue] = useState("");
  const [timeline, setTimeline] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");

  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  const handleVote = (pollId, optionIndex) => {

    axios.post(`${SERVER_URL}/user/vote`, { pollId, optionIndex, cookieValue })
      .then(() => {
        // Update the timelineData locally after voting
        const updatedTimelineData = timelineData.map((poll) => {
          if (poll._id === pollId) {
            const updatedOptions = poll.options.map((option, index) => {
              return {
                ...option,
                votes: index === optionIndex ? option.votes + 1 : option.votes,
                selected: index === optionIndex,
              };
            });
            return {
              ...poll,
              options: updatedOptions,
              hasVoted: true,
              votedUserCount: poll.votedUserCount + 1, // Increment total vote count
            };
          }
          return poll;
        });
        setTimelineData(updatedTimelineData);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const fetchTimelineData = async () => {
    try {
      if (cookieValue) {
        let response

        if (timeline === "popular") {
          response = await fetch(`${SERVER_URL}/user/timeline?type=popular&cookieValue=${cookieValue}`);
        } else {
          response = await fetch(`${SERVER_URL}/user/timeline?type=latest&cookieValue=${cookieValue}`);
        }
        const data = await response.json();
        setTimelineData(data);

      }

    } catch (error) {
      console.error('Error fetching timeline data:', error);
    }
  };

  const fetchSearchData = async () => {
    try {
      console.log("fetudata");
      if (cookieValue && searchQuery) {
        const response = await fetch(`${SERVER_URL}/user/searchPoll?cookieValue=${cookieValue}&search=${searchQuery}`);
        const data = await response.json();
        setTimelineData(data);
        console.log(timelineData);
      }
    } catch (error) {
      console.error('Error fetching timeline data:', error);
    }
  }

  useEffect(() => {
    setCookieValue(document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
    fetchTimelineData();
  }, [timeline, searchQuery]);

  useEffect(() => {
    fetchTimelineData();
  }, [cookieValue]);

  return (
    <div className="timeline">
      <div className="timeline-type">
        {/* Step 4: Add search input */}
        {/* <div className="search-bar">
          <input
            type="text"
            placeholder="Search by question name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => fetchSearchData()}>Search</button>
        </div> */}
        <NavLink className={timeline === "popular" ? "tactive" : "nono"} onClick={() => setTimeline("popular")}>Popular</NavLink>
        <NavLink className={timeline === "latest" ? "tactive" : "nono"} onClick={() => setTimeline("latest")}>Latest</NavLink>
      </div>

      {timelineData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {timelineData.map((poll) => (
            <li key={poll._id} className="timeline-item">
              <h2>{poll.creator}'s Poll</h2>
              <div className="poll-item">
                <h3>Q. {poll.question}</h3>
                <form>
                  {/* rendering based on whether the user has votted or not */}
                  {poll.hasVoted ? (
                    <ul>
                      {poll.options.map((option, index) => (
                        <li key={option.optionText}>
                          <input
                            type="radio"
                            id={`option${index}`}
                            name={`poll_${poll._id}`}
                            value={option.optionText}
                            onChange={() => handleVote(poll._id, index)}
                            disabled={poll.hasVoted} // Disable voting if user has already voted
                          />
                          <label htmlFor={`option${index}`} style={{
                            background: `linear-gradient(to right, ${option.selected ? 'rgba(0, 128, 0, 0.5)' : 'rgba(89, 89, 89,0.5)'} ${(option.votes / poll.votedUserCount * 100).toFixed(2)}%, rgba(0, 0, 0, 0) ${(option.votes / poll.votedUserCount * 100).toFixed(2)}%)`
                          }}>
                            {option.optionText}
                          </label>
                          <span>{((option.votes / poll.votedUserCount) * 100).toFixed(2)}%</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul>
                      {poll.options.map((option, index) => (
                        <li key={option.optionText} className={option.selected ? 'selected-option' : ''}>
                          <input
                            type="radio"
                            id={`option${index}`}
                            name={`poll_${poll._id}`}
                            value={option.optionText}
                            onChange={() => handleVote(poll._id, index)}
                          />
                          <label htmlFor={`option${index}`}>{option.optionText}</label>
                        </li>
                      ))}
                    </ul>
                  )}

                </form>
                {poll.hasVoted && <p>You have already voted in this poll.</p>}
                {poll.hasVoted && <p>{poll.votedUserCount} users have already voted in this poll.</p>}
                {poll.hasVoted && <p>This poll was created on {new Date(poll.createdOn).toLocaleString("en-IN")}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Timeline;
