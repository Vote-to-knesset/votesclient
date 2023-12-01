import React, { useState, useEffect, useLayoutEffect } from "react";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import axios from "axios";

const calculateTimeElapsed = (timestamp) => {
  const now = new Date();
  const commentTime = new Date(timestamp);
  const diffTime = Math.abs(now - commentTime);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffWeeks > 0) {
    return `${diffWeeks}ש`;
  } else if (diffDays > 0) {
    return `${diffDays}י`;
  } else {
    return "היום";
  }
};

async function getBillsComments(billId) {
  try {
    console.log(billId);
    const token = localStorage.getItem("tokenVote");
    if (token) {
      const response = await axios.get(
        "https://sever-users-node-js.vercel.app/votes/getcomments",
        {
          params: {
            billId: billId,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        return response.data || [];
      } else {
        console.error("Failed to fetch selected bills");
      }
    } else {
      console.error("Token not found");
    }
  } catch (error) {
    console.error("Error fetching selected bills:", error);
  }
}

function BillComment({ billId, onClose }) {
  const [comment, setComment] = useState("");
  const [discussionTitle, setDiscussionTitle] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [comments, setComments] = useState([]);

  useLayoutEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await getBillsComments(billId);
        console.log(response);
        setDiscussions(response.comments);
      } catch (error) {
        console.error("Error fetching discussions:", error);
      }
    };

    fetchDiscussions();
  }, []);

  const addLike = async (billId, discussionTitle, comment) => {
    try {
      const token = localStorage.getItem("tokenVote");
      const response = await axios.post(
        "https://sever-users-node-js.vercel.app/votes/adddiscussion",
        { billId, discussionTitle, comment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(" successfully");
      } else {
        console.error("Failed to update like");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addDiscussion = async (billId, discussionTitle) => {
    try {
      const token = localStorage.getItem("tokenVote");
      const response = await axios.post(
        "https://sever-users-node-js.vercel.app/votes/adddiscussion",
        { billId, discussionTitle },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(" successfully");
      } else {
        console.error("Failed to update dis");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = async (billId, discussion, comment) => {
    try {
      const token = localStorage.getItem("tokenVote");

      const response = await axios.post(
        "https://sever-users-node-js.vercel.app/votes/addcomment",
        { billId, discussionTitle: discussion, commentText: comment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(" successfully");
      } else {
        console.error("Failed to update comment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDiscussionClick = (discussion) => {
    setSelectedDiscussion(discussion);
    setComments(discussion.comments);
  };

  const handleAddComment = async () => {
    if (comment && selectedDiscussion) {
      const newComment = {
        id: selectedDiscussion.comments.length + 1,
        text: comment,
        timestamp: new Date().toISOString(),
      };

      const updatedComments = [...comments, newComment];
      const updatedDiscussions = discussions.map((discussion) =>
        discussion.id === selectedDiscussion.id
          ? { ...discussion, comments: updatedComments }
          : discussion
      );
      addComment(billId, selectedDiscussion.title, comment);
      setDiscussions(updatedDiscussions);
      setComments(updatedComments);
      setComment("");
    }
  };

  const handleAddDiscussion = () => {
    if (discussionTitle) {
      const newDiscussion = {
        id: discussions.length + 1,
        title: discussionTitle,
        comments: [],
      };
      addDiscussion(billId, discussionTitle);

      const updatedDiscussions = [...discussions, newDiscussion];
      setDiscussions(updatedDiscussions);
      setDiscussionTitle("");
    }
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-3/4 h-3/4 bg-white rounded-lg shadow-lg  relative">
        <div className="flex justify-end">
          <div
            className="bg-gray-200 rounded-full p-2 m-4 cursor-pointer"
            onClick={handleClose}
          >
            <AiTwotoneCloseCircle size={24} className="text-gray-600" />
          </div>
        </div>
        {selectedDiscussion && comments ? (
          <div>
            <h2 className="text-gray-700 text-lg mb-2 mr-4">
              {selectedDiscussion.title}
            </h2>
            <div className=" h-48 max-h-** overflow-y-scroll p-4">
              {comments.map((comment) => (
                <div
                  key={comment.text}
                  className="bg-white text-black p-4 antialiased"
                  style={{ borderBottom: "1px solid #ccc" }}
                >
                  <div className="bg-gray-300 rounded-full px-2 pt-2 pb-2.5">
                    <div className="text-normal leading-snug md:leading-normal">
                      {comment.text}
                    </div>
                  </div>
                  <div className="text-sm ml-4 mr-60 mt-0.5 text-black ">
                    {calculateTimeElapsed(comment.timestamp)}{" "}
                  </div>
                  <div
                    onClick={() =>
                      addLike(billId, discussionTitle, comment.text)
                    }
                    className="bg-white  border border-white dark:border-gray-200 rounded-full float-right -mt-8 mr-0.5 flex shadow items-center"
                  >
                    <svg
                      class="p-0.5 h-5 w-5 rounded-full z-20 bg-white dark:bg-blue-700"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 16 16"
                    >
                      <defs>
                        <linearGradient
                          id="a1"
                          x1="50%"
                          x2="50%"
                          y1="0%"
                          y2="100%"
                        >
                          <stop offset="0%" stop-color="#18AFFF" />
                          <stop offset="100%" stop-color="#0062DF" />
                        </linearGradient>
                        <filter
                          id="c1"
                          width="118.8%"
                          height="118.8%"
                          x="-9.4%"
                          y="-9.4%"
                          filterUnits="objectBoundingBox"
                        >
                          <feGaussianBlur
                            in="SourceAlpha"
                            result="shadowBlurInner1"
                            stdDeviation="1"
                          />
                          <feOffset
                            dy="-1"
                            in="shadowBlurInner1"
                            result="shadowOffsetInner1"
                          />
                          <feComposite
                            in="shadowOffsetInner1"
                            in2="SourceAlpha"
                            k2="-1"
                            k3="1"
                            operator="arithmetic"
                            result="shadowInnerInner1"
                          />
                          <feColorMatrix
                            in="shadowInnerInner1"
                            values="0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0"
                          />
                        </filter>
                        <path
                          id="b1"
                          d="M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z"
                        />
                      </defs>
                      <g fill="none">
                        <use fill="url(#a1)" xlink:href="#b1" />
                        <use fill="black" filter="url(#c1)" xlink:href="#b1" />
                        <path
                          fill="white"
                          d="M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z"
                        />
                      </g>
                    </svg>
                    <span className="text-sm ml-1 pr-1.5 text-gray-500 dark:text-gray-300">
                      {comment.like}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-100 border-t border-gray-300">
              <textarea
                rows="2"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded text-black focus:outline-none"
                placeholder="כתוב תגובה ..."
                required
              ></textarea>
              <button
                onClick={handleAddComment}
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
              >
                הוסף תגובה
              </button>
            </div>
          </div>
        ) : (
          <div className="h-4/5 overflow-y-auto p-4">
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className="p-4 cursor-pointer"
                onClick={() => handleDiscussionClick(discussion)}
              >
                <h2 className="text-gray-700 text-lg mb-2">
                  {discussion.title}
                </h2>
                <p className="text-gray-500">
                  {discussion.comments.length} תגובות
                </p>
              </div>
            ))}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-100 border-t border-gray-300">
              <input
                type="text"
                value={discussionTitle}
                onChange={(e) => setDiscussionTitle(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded text-black focus:outline-none"
                placeholder="הוסף דיון חדש ..."
                required
              />
              <button
                onClick={handleAddDiscussion}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
              >
                הוסף דיון חדש
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BillComment;
