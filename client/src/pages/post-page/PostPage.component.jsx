import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../../components/navbar/Navbar.component";
import Footer from "../../components/footer/Footer.component";
import Spinner from "../../components/spinner/Spinner.component";
import PostCarousel from "../../components/post-carousel/PostCarousel.component";
import PostTiles from "../../components/post-tiles/PostTiles.component";
import PostHeader from "../../components/post-header/PostHeader.component";

import { getPostById } from "../../redux/post/post.actions";

const PostPage = ({ getPostById, post: { post, loading }, match, history }) => {
  useEffect(() => {
    getPostById(match.params.id, history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      {loading || !post ? (
        <div className="full-height-spinner">
          <Spinner />
        </div>
      ) : (
        <>
          <section id="post" className="container">
            <PostHeader post={post} />
            <PostCarousel images={post.images} />
            <PostTiles post={post} />
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

export default withRouter(connect(mapStateToProps, { getPostById })(PostPage));
