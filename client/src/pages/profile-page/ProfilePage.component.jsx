import React, { useEffect } from "react";
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
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      {!profile || loading ? (
        <Spinner />
      ) : (
        <div id="profile" className="container">
          <ProfileHeader
            profile={profile}
            ownProfile={!loading && auth.user._id === profile.user._id}
          />
          <ProfileTabs profile={profile} />
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

export default connect(mapStateToProps, { getProfileById })(ProfilePage);
