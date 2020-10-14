import React, { useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../../components/spinner/Spinner.component";
import Navbar from "../../components/navbar/Navbar.component";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import Footer from "../../components/footer/Footer.component";
import PostCard from "../../components/post-card/PostCard.component";

import { getPosts } from "../../redux/post/post.actions";

const PostsPage = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <ErrorBoundary>
        {loading ? (
          <div className="full-height-spinner">
            <Spinner />
          </div>
        ) : (
          <section id="posts" className="container px-5">
            <h1 className="title">Recent Posts</h1>
            <div className="columns is-multiline">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </section>
        )}
      </ErrorBoundary>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(PostsPage);
