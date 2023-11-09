import React, { useState } from 'react';


const billsComments = {
    "2208258": [
      {
        "id": 1,
        "text": "This is the first comment.",
        "author": "User1",
        "timestamp": "2023-11-07T14:30:00Z"
      },
      {
        "id": 2,
        "text": "Another comment here.",
        "author": "User2",
        "timestamp": "2023-11-07T15:15:00Z"
      },
      {
        "id": 3,
        "text": "A third comment by User3.",
        "author": "User3",
        "timestamp": "2023-11-07T16:00:00Z"
      }
    ],"2160142": [
        {
          "id": 1,
          "text": "This is the first comment.",
          "author": "User1",
          "timestamp": "2023-11-07T14:30:00Z"
        },
        {
          "id": 2,
          "text": "Another comment here.",
          "author": "User2",
          "timestamp": "2023-11-07T15:15:00Z"
        },
        {
          "id": 3,
          "text": "A third comment by User3.",
          "author": "User3",
          "timestamp": "2023-11-07T16:00:00Z"
        }
      ]
  }
  

  function BillComment({ billId }) {
    const [comment, setComment] = useState('');
    const comments = billsComments[billId] || [];
  
    const handleAddComment = (e) => {
      if (e.key === 'Enter' && comment) {
        addComment({
          id: comments.length + 1, 
          text: comment,
          author: "UserX", 
          timestamp: new Date().toISOString(), 
        });
        setComment('');
      }
    };
  
    const addComment = (newComment) => {
      comments.unshift(newComment);
    };
  
    return (
      <div>
        <div className="comments overflow-y-auto p-4 h-[200px]">
          {comments.map((comment) => (
            <div className="bg-gray-100 p-2" key={comment.id}>
              <div className="flex flex-col space-y-6">
                <div className="bg-white p-1 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold">{comment.author}</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    {new Date(comment.timestamp).toLocaleString()}
                  </p>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-300 dark:border-gray-200 rounded-full">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={handleAddComment}
            className="w-full text-sm textarea-bordered textarea-xs text-gray-900 bg-white border-0 dark:bg-gray-100 focus:ring-0 dark:text-black dark:placeholder-gray-900"
            placeholder="כתוב תגובה ..."
            required
          ></textarea>
  
          <div className="flex items-center justify-between py-2 border-t dark:border-gray-600 ">
            <button
              
              onClick={handleAddComment}
              type="submit"
              className="inline-flex  py-2 px-8 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              פרסם תגובה
            </button>
          </div>
  
          <div className="flex items-baseline justify-between">
            <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">
              זכור, שמור על שפה נקיה ומכבדת{' '}
              <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">
                כללי הקהילה
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default BillComment;


