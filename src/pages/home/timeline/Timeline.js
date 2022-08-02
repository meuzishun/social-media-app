import React from 'react';
import Post from '../../../components/Post';
import { db } from '../../../services/firebaseApp';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import uniqid from 'uniqid';

function Timeline({ user }) {
  const submitPostReply = async (postId, content) => {
    const now = new Date();
    const reply = {
      author: user.id,
      content,
      id: uniqid(),
      replies: [],
      timestamp: now.toISOString(),
    };
    // post reply to posts
    setDoc(doc(db, 'posts', reply.id), reply);
    // add reply to original post replies
    const originalPostDoc = doc(db, 'posts', postId);
    const originalPostSnap = await getDoc(originalPostDoc);
    const originalPostData = originalPostSnap.data();
    originalPostData.replies = [...originalPostData.replies, reply.id];
    updateDoc(originalPostDoc, originalPostData);
    //TODO: refresh timeline somehow
  };

  return (
    <div>
      {user
        ? user.posts.map((postId) => (
            <Post
              key={postId}
              postId={postId}
              submitPostReply={submitPostReply}
            />
          ))
        : null}
    </div>
  );
}

export default Timeline;
