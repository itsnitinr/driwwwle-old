import React, { useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../../components/spinner/Spinner.component";
import Navbar from "../../components/navbar/Navbar.component";
import Footer from "../../components/footer/Footer.component";

import { getPosts } from "../../redux/post/post.actions";

const PostsPage = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <section id="posts" className="container">
        <h1>Posts page</h1>
      </section>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(PostsPage);
