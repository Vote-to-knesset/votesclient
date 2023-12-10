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

function BillComment({ billId, billName, onClose }) {
  const [comment, setComment] = useState("");
  const [discussionTitle, setDiscussionTitle] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [likedComments, setLikedComments] = useState([]);

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
    let commentText = comment;
    console.log(billId, discussionTitle, commentText);
    if (!hasLikedComment(commentText)) {
      try {
        const token = localStorage.getItem("tokenVote");
        const response = await axios.post(
          "https://sever-users-node-js.vercel.app/votes/addlike",
          { billId, discussionTitle, commentText },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setLikedComments([...likedComments, commentText]);
          updateLikesCount(commentText);
          console.log(" successfully");
        } else {
          console.error("Failed to update like");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateLikesCount = (commentText) => {
    const updatedComments = comments.map((comment) => {
      if (comment.text === commentText) {
        return { ...comment, like: comment.like + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const hasLikedComment = (commentText) => {
    return likedComments.includes(commentText);
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
        like:0,
        
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
      <div className="w-5/6 h-5/6 md:w-3/4  bg-white rounded-lg shadow-lg relative">
        <div className="flex items-center">
          <div
            className="bg-gray-200 rounded-full p-2 m-4 cursor-pointer"
            onClick={handleClose}
          >
            <AiTwotoneCloseCircle size={24} className="text-gray-600" />
          </div>
          <h2 className="md:mt-6 ml-2 md:ml-4 overflow-hidden whitespace-nowrap">
            {billName}
          </h2>
        </div>
        {selectedDiscussion && comments ? (
          <div>
            <h2 className="text-gray-700 text-lg mb-2 mr-4">
              {selectedDiscussion.title}
            </h2>
            <div className=" h-80  overflow-y-scroll p-4">
              {comments.map((comment) => (
                <div
                  key={comment.text}
                  className=" text-black p-4 antialiased border-b border-gray-300"
                >
                  <div className="flex justify-between items-center">
                    <div className="bg-gray-200 rounded-2xl p-2">
                      <span className="text-sm">{comment.text}</span>
                    </div>
                  </div>
                  <div className="  ">
                    <div className="flex flex-row text-xs text-black">
                      <div className="rounded-full bg-blue p-1 hover:scale-150 ">
                        <svg
                          onClick={() =>
                            addLike(
                              billId,
                              selectedDiscussion.title,
                              comment.text
                            )
                          }
                          viewBox="0 0 1024 1024"
                          fill="currentColor"
                          height="1.5em"
                          width="1.5em"
                          color={hasLikedComment(comment.text) ? "blue" : "gray"}
                          className="..."
                          disabled={hasLikedComment(comment.text)}
                        >
                          <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311h-.3v428h472.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32z" />
                        </svg>
                      </div>
                      <span className="text-sm ml-6 text-gray-500 ">
                        {comment.like}
                      </span>
                      {calculateTimeElapsed(comment.timestamp)}{" "}
                    </div>
                  </div>
                  <div className="bg-white  border border-white dark:border-gray-200 rounded-full float-right -mt-8 mr-0.5 flex shadow items-center"></div>
                </div>
              ))}
            </div>

            <div className=" flex flex-row items-center ">
              <textarea
                rows="2"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-grow p-2 mb-2 bg-gray-200 rounded-2xl border border-gray-300  text-black focus:outline-none mr-2 ml-2"
                placeholder="כתוב תגובה ..."
                required
              ></textarea>
              <button onClick={handleAddComment} type="submit">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                  color="gray"
                >
                  <path
                    transform="scale(-1, 1) translate(-24, 0)"
                    d="M8 7.71L18 12 8 16.29v-3.34l7.14-.95L8 11.05V7.71M12 2a10 10 0 0110 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2m0 2a8 8 0 00-8 8 8 8 0 008 8 8 8 0 008-8 8 8 0 00-8-8z"
                  />
                </svg>
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
