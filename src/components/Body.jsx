import NavBar from "./NavBar"
import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      /* Get the user from the /profile/view API to get the user whose cookie is present in the browser. */
      const user = await axios.get(
        /* API URL */
        BASE_URL + "/profile/view",
        /* CORS credentials allowed */
        {
          withCredentials: true
        }
      );
      /* Add the user to the store again after the refresh */
      dispatch(addUser(user.data));
    } catch (err) {
      /* Unauthorized = 401 */
      if (err.status === 401) {
        /* Go to the login page if the error is received by the API. */
        navigate("/login");
      }
      console.log(err);
    }
  };

  /* Call the fetchUser on every page reload */
  useEffect(() => {
    /* We got the userData from the store and if it is present we
     * will not make the /profile/view API call */
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
