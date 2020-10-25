import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../../components/spinner/Spinner.component";
import PostCard from "../../components/post-card/PostCard.component";
import Paginator from "../../components/paginator/Paginator.component";

import { getUserPosts } from "../../redux/posts/posts.actions";
import usePaginator from "../../hooks/usePaginator";

import "./ProfilePosts.styles.css";

function ProfilePosts({ userId }) {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const { items, currentPage, perPage, setCurrentPage } = usePaginator(posts);

  useEffect(() => {
    dispatch(getUserPosts(userId));
  }, [dispatch, userId]);

  return (
    <>
      {loading && !items ? (
        <div className="full-height-spinner">
          <Spinner />
        </div>
      ) : (
        <section id="posts" className="container">
          {items.length === 0 ? (
            <h1 className="title full-screen">
              User hasn't posted anything yet !
            </h1>
          ) : (
            <div className="columns is-multiline">
              {items.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
          <Paginator
            onChange={setCurrentPage}
            current={currentPage}
            pageSize={perPage}
            total={posts.length}
          />
        </section>
      )}
    </>
  );
}

export default ProfilePosts;
