import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getCurrentProfile } from "../../redux/profile/profile.actions";

const DashboardPage = ({ getCurrentProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <h1>Dashboard</h1>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(DashboardPage);
