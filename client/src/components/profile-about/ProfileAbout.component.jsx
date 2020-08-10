import React from "react";

const ProfileAbout = ({ profile: { website, location, skills, social } }) => {
  return (
    <>
      {website && <h1>Website: {website}</h1>}
      {location && <h1>Location: {location}</h1>}
      {skills && <h1>Skills: {skills.join(", ")}</h1>}
      {social && social.twitter && <h1>{social.twitter}</h1>}
      {social && social.instagram && <h1>{social.instagram}</h1>}
      {social && social.linkedin && <h1>{social.linkedin}</h1>}
      {social && social.codepen && <h1>{social.codepen}</h1>}
      {social && social.github && <h1>{social.github}</h1>}
    </>
  );
};

export default ProfileAbout;
