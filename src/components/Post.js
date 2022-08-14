import React, { createContext, useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import ReplyForm from './ReplyForm';
import {
  getPostById,
  getUserById,
  updatePostById,
} from '../services/firebaseApp';
import './Post.css';
import EditPostForm from './EditPostForm';

export const PostStateContext = createContext();

function Post({ postData }) {
  //TODO: use this postState as a copy of the postData
  //TODO: use useContext to 'broadcast' postState and setPostState to the subcomponents (comments, replies, forms, etc.)
  //? Maybe each subcomponent also has access (via useContext) to a function that sends postState to the database, gets a response with an updated post, and then rerenders the whole post?

  //* This is what we ended up doing: two post states 1) for receiving from the database and 2) for sending to the database.  Now each subcomponent can use the first to rip apart and change and then use the second to solidify the changes.

  //TODO: subcomponents here (comments, replies, etc.) need three things: 1) access to postStateFromDatabase 2) the ability to update the post on the database with setPostStateToDatabase and 3) a function that destructures and edits the post based on what is being changed

  //? So how do we edit the post deeper?  What about replies to comments?  Can we do the same thing with two states for each subcomponent?  And then keep passing the changes up until we get to post which talks to the database?

  //* Use 2 post states to avoid infinite loop with database interaction
  const [postStateFromDatabase, setPostStateFromDatabase] = useState(null);
  const [postStateToDatabase, setPostStateToDatabase] = useState(null);
  const [authorName, setAuthorName] = useState(null);

  const [displayPostEditForm, setDisplayPostEditForm] = useState(false);
  // const [postEditContent, setPostEditContent] = useState(null);

  //TODO: change these to display... and setDisplay...
  const [displayAddCommentForm, setDisplayAddCommentForm] = useState(false);

  const handleEditPostClick = (e) => {
    setDisplayPostEditForm(true);
  };

  const handleAddCommentClick = (e) => {
    setDisplayAddCommentForm(true);
  };

  useEffect(() => {
    setPostStateFromDatabase(postData);
  }, []);

  useEffect(() => {
    if (postStateToDatabase) {
      updatePostById(postStateToDatabase.id, postStateToDatabase).then(
        (alteredPost) => setPostStateFromDatabase(alteredPost)
      );
    }
  }, [postStateToDatabase]);

  useEffect(() => {
    if (postStateFromDatabase) {
      getUserById(postStateFromDatabase.authorId).then((user) =>
        setAuthorName(user.username)
      );
    }
  }, [postStateFromDatabase]);

  return (
    <>
      {authorName ? (
        <div className='post'>
          <PostStateContext.Provider
            value={{
              postStateFromDatabase,
              setPostStateToDatabase,
              authorName,
            }}
          >
            {!displayPostEditForm ? (
              <>
                <p>
                  <span>{authorName}:</span> {postStateFromDatabase.content}
                </p>
              </>
            ) : (
              <EditPostForm setPostEditFormDisplay={setDisplayPostEditForm} />
            )}

            {!displayPostEditForm && !displayAddCommentForm ? (
              <>
                <button
                  type='button'
                  className='editBtn'
                  onClick={handleEditPostClick}
                >
                  edit
                </button>

                <button
                  type='button'
                  className='addBtn'
                  onClick={handleAddCommentClick}
                >
                  add comment
                </button>
              </>
            ) : null}

            {!displayAddCommentForm ? null : (
              <CommentForm
                setAddCommentFormDisplay={setDisplayAddCommentForm}
              />
            )}

            {/* <div className='comments'>
              {postStateFromDatabase.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  commentData={comment}
                  setPostState={setPostState}
                />
              ))}
            </div> */}
          </PostStateContext.Provider>
        </div>
      ) : null}
    </>
  );
}

export default Post;
