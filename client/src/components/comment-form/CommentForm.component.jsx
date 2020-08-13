import React, { useState } from "react";
import { connect } from "react-redux";

import { addComment } from "../../redux/post/post.actions";

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addComment(postId, { text });
        setText("");
      }}
    >
      <textarea
        className="textarea"
        placeholder="Awesome ! I work with the same tech stack too."
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>
      <button type="submit" className="button primary-bg mt-4">
        Post
      </button>
    </form>
  );
};

export default connect(null, { addComment })(CommentForm);
