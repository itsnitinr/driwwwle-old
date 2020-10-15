import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../../components/spinner/Spinner.component";
import Navbar from "../../components/navbar/Navbar.component";
import Footer from "../../components/footer/Footer.component";
import ProfileHeader from "../../components/profile-header/ProfileHeader.component";
import ProfileTabs from "../../components/profile-tabs/ProfileTabs.component";

import { getProfileById } from "../../redux/profile/profile.actions";

function ProfilePage() {
  const history = useHistory();
  const { id: userId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getProfileById(userId, history));
  }, [dispatch, userId, history]);

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
            ownProfile={!loading && user._id === profile.user._id}
            id={userId}
          />
          <ProfileTabs profile={profile} userId={userId} />
        </div>
      )}
      <Footer />
    </>
  );
}

export default ProfilePage;
