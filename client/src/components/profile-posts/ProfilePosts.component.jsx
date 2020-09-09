import React, { useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../../components/spinner/Spinner.component";
import PostCard from "../../components/post-card/PostCard.component";

import { getUserPosts } from "../../redux/post/post.actions";

import "./ProfilePosts.styles.css";

const ProfilePosts = ({ post: { posts, loading }, getUserPosts, userId }) => {
  useEffect(() => {
    getUserPosts(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && !posts ? (
        <div className="full-height-spinner">
          <Spinner />
        </div>
      ) : (
        <section id="posts" className="container">
          {posts.length === 0 ? (
            <h1 className="title full-screen">
              User hasn't posted anything yet !
            </h1>
          ) : (
            <div className="columns is-multiline">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getUserPosts })(ProfilePosts);
