import React, { useEffect, useState, useContext } from 'react';
import { AppFunctions } from '../App';

function Post({ post }) {
  const [author, setAuthor] = useState(null);
  const [replyState, setReplyState] = useState(false);
  const [replyContent, setReplyContent] = useState();

  const { findUserById, submitPostReply } = useContext(AppFunctions);

  const handleReplyClick = () => {
    setReplyState(true);
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    submitPostReply(post, replyContent);
    setReplyContent('');
    setReplyState(false);
  };

  const handleReplyCancel = () => {
    setReplyContent('');
    setReplyState(false);
  };

  useEffect(() => {
    //! MOCKED VERSION
    // setAuthor(findUserById(post.author));

    const findAuthor = async () => {
      const user = await findUserById(post.author);
      setAuthor(user);
    };
    findAuthor();
  }, []);

  return (
    <div>
      {author ? (
        <div>
          <p>
            <span>{author.username}:</span> {post.content}
          </p>
          {replyState ? (
            <form onSubmit={handleReplySubmit}>
              <input
                type='text'
                name='content'
                defaultValue={replyContent}
                onChange={handleReplyChange}
              />
              <button type='submit'>submit</button>
              <button type='button' onClick={handleReplyCancel}>
                cancel
              </button>
            </form>
          ) : (
            <button onClick={handleReplyClick}>reply</button>
          )}
          <div className='replies'>
            {post.replies.map((reply) => {
              return <Post key={reply.id} post={reply} />;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Post;
