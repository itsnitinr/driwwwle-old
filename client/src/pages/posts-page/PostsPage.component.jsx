import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../../components/spinner/Spinner.component";
import Navbar from "../../components/navbar/Navbar.component";
import Footer from "../../components/footer/Footer.component";
import PostCard from "../../components/post-card/PostCard.component";
import Paginator from "../../components/paginator/Paginator.component";

import { getPosts } from "../../redux/posts/posts.actions";
import usePaginator from "../../hooks/usePaginator";

function PostsPage() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);
  const { items, currentPage, perPage, setCurrentPage } = usePaginator(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="full-height-spinner">
          <Spinner />
        </div>
      ) : (
        <section id="posts" className="container px-5">
          <h1 className="title">Recent Posts</h1>
          <div className="columns is-multiline">
            {items.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <Paginator
            onChange={setCurrentPage}
            current={currentPage}
            pageSize={perPage}
            total={posts.length}
          />
        </section>
      )}
      <Footer />
    </>
  );
}

export default PostsPage;
