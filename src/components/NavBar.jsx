import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      /* Call the logout post API */
      await axios.post(
        BASE_URL + "/logout",
        /* We are not passing anything in the logout POST API */
        {},
        {
          withCredentials: true
        }
      );

      /* Clear the User Redux Store */
      dispatch(removeUser());

      /* Redirect to the Login Page */
      navigate("/login");

    } catch (err) {
      console.log("ERROR : " + err.message);
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-md sticky top-0 z-50 px-4 md:px-8">
      {/* Brand */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold gap-2">
          <span>👩‍💻</span>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Social Media App
          </span>
        </Link>
      </div>

      {/* Right side */}
      {user && (
        <div className="flex items-center gap-3">
          <p className="hidden sm:block text-sm font-medium">
            Welcome, <span className="text-primary">{user.firstName}</span>
          </p>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  alt={`${user.firstName}'s avatar`}
                  src={user.photoUrl}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-56 p-2 shadow-lg border border-base-300"
            >
              <li className="menu-title px-4 py-2">
                {user.firstName} {user.lastName}
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <div className="divider my-0"></div>
              <li>
                <a className="text-error" onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;