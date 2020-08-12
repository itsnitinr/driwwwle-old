import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../../components/navbar/Navbar.component";
import Footer from "../../components/footer/Footer.component";
import Spinner from "../../components/spinner/Spinner.component";
import PostCarousel from "../../components/post-carousel/PostCarousel.component";

import { getPostById } from "../../redux/post/post.actions";

import "./PostPage.styles.css";

const PostPage = ({ getPostById, post: { post, loading }, match }) => {
  useEffect(() => {
    getPostById(match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      {loading || !post ? (
        <Spinner />
      ) : (
        <>
          <section id="post" className="container">
            <div className="post-header px-5">
              <img src={post.user.avatar} alt="Post owner avatar" />
              <div className="post-header-text">
                <div>
                  <h1>{post.title}</h1>
                  <h3>
                    by{" "}
                    <Link
                      to={`/profile/${post.user._id}`}
                      className="primary-text has-text-weight-bold"
                    >
                      {post.user.name}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <PostCarousel images={post.images} />
          </section>
        </>
      )}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPostById })(PostPage);
