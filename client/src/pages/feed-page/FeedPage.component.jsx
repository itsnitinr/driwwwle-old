import React, { useEffect } from "react";
import { connect } from "react-redux";

import Navbar from "../../components/navbar/Navbar.component";
import Footer from "../../components/footer/Footer.component";
import Spinner from "../../components/spinner/Spinner.component";
import PostCard from "../../components/post-card/PostCard.component";
import { ReactComponent as NoPostsImage } from "../../assets/images/no-posts.svg";

import { getFeed } from "../../redux/post/post.actions";

import "./FeedPage.styles.css";

const FeedPage = ({ getFeed, post: { posts, loading } }) => {
  useEffect(() => {
    getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <section id="posts" className="container px-5">
          {posts.length ? (
            <>
              <h1 className="title">Your Feed</h1>
              <div className="columns is-multiline">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="container is-empty">
              <NoPostsImage />
              <h1 className="subtitle">
                Uh oh ! Your feed is empty. Go on and follow some more users.
              </h1>
            </div>
          )}
        </section>
      )}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getFeed })(FeedPage);
