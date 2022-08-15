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
import PostContent from './PostContent';
import CommentForm2 from './CommentForm2';
import Comment2 from './Comment2';

export const PostStateContext = createContext();
export const CommentContext = createContext();

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
      console.log('changing post...');
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
      {console.log('rendering post...')}
      {postStateFromDatabase
        ? postStateFromDatabase.comments.forEach((comment) =>
            console.log(comment.content)
          )
        : null}
      {authorName ? (
        <div className='post'>
          <PostStateContext.Provider
            value={{
              postStateFromDatabase,
              setPostStateToDatabase,
              authorName,
            }}
          >
            <PostContent />
            <CommentForm2 />

            {postStateFromDatabase.comments ? (
              <div className='comments'>
                {postStateFromDatabase.comments.map((comment) => (
                  <CommentContext.Provider value={comment}>
                    <Comment2 key={comment.id} />
                  </CommentContext.Provider>
                ))}
                {/* <Comment
                    key={comment.id}
                    commentsArray={postStateFromDatabase.comments}
                    commentData={comment}
                  /> */}
              </div>
            ) : null}
          </PostStateContext.Provider>
        </div>
      ) : null}
    </>
  );
}

export default Post;
