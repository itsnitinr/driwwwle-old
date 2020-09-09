import React, { useEffect } from "react";
import { connect } from "react-redux";

import Navbar from "../../components/navbar/Navbar.component";
import Footer from "../../components/footer/Footer.component";
import Spinner from "../../components/spinner/Spinner.component";
import ProfileHeader from "../../components/profile-header/ProfileHeader.component";

import ProfileTabs from "../../components/profile-tabs/ProfileTabs.component";

import { getCurrentProfile } from "../../redux/profile/profile.actions";

const DashboardPage = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      {(loading && profile === null) || !user ? (
        <div className="full-height-spinner">
          <Spinner />
        </div>
      ) : (
        <div id="profile" className="container">
          <ProfileHeader profile={profile} isDashboard />
          <ProfileTabs profile={profile} userId={user._id} />
        </div>
      )}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(DashboardPage);
