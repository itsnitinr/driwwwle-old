import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/navbar/Navbar.component";
import Footer from "../../components/footer/Footer.component";
import Spinner from "../../components/spinner/Spinner.component";
import ProfileCard from "../../components/profile-card/ProfileCard.component";
import Paginator from "../../components/paginator/Paginator.component";

import { getProfiles } from "../../redux/profile/profile.actions";
import usePaginator from "../../hooks/usePaginator";

function ProfilesPage() {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profile);

  const { items, currentPage, perPage, setCurrentPage } = usePaginator(
    profiles
  );

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="full-height-spinner">
          <Spinner />
        </div>
      ) : (
        <section id="profiles-page" className="container px-5">
          <h1 className="title">All Developer Profiles</h1>
          <div className="profile-cards columns is-multiline">
            {items.map((profile) => (
              <ProfileCard key={profile._id} profile={profile} />
            ))}
          </div>
          <Paginator
            onChange={setCurrentPage}
            current={currentPage}
            pageSize={perPage}
            total={profiles.length}
          />
        </section>
      )}
      <Footer />
    </>
  );
}

export default ProfilesPage;
