import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "../../components/spinner/Spinner.component";
import Navbar from "../../components/navbar/Navbar.component";
import Footer from "../../components/footer/Footer.component";
import ProfileHeader from "../../components/profile-header/ProfileHeader.component";
import ProfileTabs from "../../components/profile-tabs/ProfileTabs.component";

import { getProfileById } from "../../redux/profile/profile.actions";

const ProfilePage = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth,
  history,
}) => {
  useEffect(() => {
    getProfileById(match.params.id, history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      {!profile || loading ? (
        <div className="full-height-spinner">
          <Spinner />
        </div>
      ) : (
        <div id="profile" className="container">
          <ProfileHeader
            profile={profile}
            ownProfile={!loading && auth.user._id === profile.user._id}
            id={match.params.id}
          />
          <ProfileTabs profile={profile} userId={match.params.id} />
        </div>
      )}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default withRouter(
  connect(mapStateToProps, { getProfileById })(ProfilePage)
);
