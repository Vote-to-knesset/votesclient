import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Fake Database to simulate discussions and comments
const fakeDB = {
  discussions: [
    {
      id: 1,
      title: 'Discussion 1',
      comments: [
        { id: 1, text: 'Comment 1 for Discussion 1', author: 'UserA', timestamp: '2023-11-25T10:30:00Z' },
        { id: 2, text: 'Comment 2 for Discussion 1', author: 'UserB', timestamp: '2023-11-25T11:00:00Z' },
      ],
    },
    {
      id: 2,
      title: 'Discussion 2',
      comments: [
        { id: 1, text: 'Comment 1 for Discussion 2', author: 'UserC', timestamp: '2023-11-25T12:00:00Z' },
      ],
    },
  ],
};

function BillComment({ billId }) {
  const [comment, setComment] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  useEffect(() => {
    // Simulating fetching discussions from a fake database
    setDiscussions(fakeDB.discussions);
  }, []);

  const handleDiscussionClick = (discussion) => {
    setSelectedDiscussion(discussion);
  };

  const handleAddComment = async () => {
    if (comment && selectedDiscussion) {
      const newComment = {
        id: selectedDiscussion.comments.length + 1,
        text: comment,
        author: "UserX",
        timestamp: new Date().toISOString(),
      };

      const updatedComments = [...selectedDiscussion.comments, newComment];
      const updatedDiscussions = discussions.map((discussion) =>
        discussion.id === selectedDiscussion.id ? { ...discussion, comments: updatedComments } : discussion
      );

      setDiscussions(updatedDiscussions);
      setComment('');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-3/4 h-3/4 bg-white rounded-lg shadow-lg overflow-hidden relative">
        {selectedDiscussion ? (
          <div>
            <h2 className="text-gray-700 text-lg mb-2">{selectedDiscussion.title}</h2>
            <div className="h-4/5 overflow-y-auto p-4">
              {selectedDiscussion.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-100 p-2 rounded-lg shadow-md mb-4">
                  <p className="text-gray-700 text-sm mb-2">
                    {new Date(comment.timestamp).toLocaleString()}
                  </p>
                  <h1 className="text-gray-700">{comment.text}</h1>
                </div>
              ))}
            </div>
         
          </div>
        ) : (
          <div className="h-4/5 overflow-y-auto p-4">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="p-4 cursor-pointer" onClick={() => handleDiscussionClick(discussion)}>
                <h2 className="text-gray-700 text-lg mb-2">{discussion.title}</h2>
                <p className="text-gray-500">{discussion.comments.length} תגובות</p>
              </div>
            ))}
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
                פתח דיון
              </button>
              <p className="text-xs text-gray-500">
                זכור, שמור על שפה נקיה ומכבדת{' '}
                <a href="#" className="text-blue-500 hover:underline">
                  כללי הקהילה
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BillComment;
