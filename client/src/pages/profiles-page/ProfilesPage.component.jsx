import React, { useEffect } from "react";
import { connect } from "react-redux";

import Navbar from "../../components/navbar/Navbar.component";
import Footer from "../../components/footer/Footer.component";
import Spinner from "../../components/spinner/Spinner.component";
import ProfileCard from "../../components/profile-card/ProfileCard.component";

import { getProfiles } from "../../redux/profile/profile.actions";

const ProfilesPage = ({ profile: { profiles }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      {profiles.length === 0 ? (
        <div className="full-height-spinner">
          <Spinner />
        </div>
      ) : (
        <>
          <section id="profiles-page" className="container px-5">
            <h1 className="title">All Developer Profiles</h1>
            <div className="profile-cards columns is-multiline">
              {profiles.map((profile) => (
                <ProfileCard key={profile._id} profile={profile} />
              ))}
            </div>
          </section>
        </>
      )}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(ProfilesPage);
