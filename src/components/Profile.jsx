import { useSelector } from 'react-redux'
import EditProfile from "./EditProfile";

const Profile = () => {
  /* Get the user from the Redux Store, which is dispatched by the Login Component. */
  const user = useSelector((store) => store.user);

  return (
    /* If the user is available from the Redux Store render the Edit Profile component */
    user && (
      <div>
        <EditProfile user={user} />
      </div>)
  );
}

export default Profile