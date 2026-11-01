import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("harsh123@gmail.com");
  const [password, setPassword] = useState("Harsh@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      /* Get the data from the backend using the axios */
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(BASE_URL + "/login");

      /* Store the data in the store */
      dispatch(addUser(res.data));

      /* Navigate to the Feed Page */
      navigate("/");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          {/* Email Block */}
          <div className="my-2">
            <fieldset className="fieldset">
              <label className="label" htmlFor="name">
                Email Id: {emailId}
              </label>
              <input
                type="text"
                id="name"
                className="input"
                placeholder="Email Id"
                value={emailId}
                onChange={(event) => setEmailId(event.target.value)}
              />
            </fieldset>{" "}
          </div>

          {/* Password Block */}
          <div className="my-2">
            <fieldset className="fieldset">
              <label className="label" htmlFor="name">
                Password:
              </label>
              <input
                type="password"
                id="name"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </fieldset>
          </div>

          {/* Login Button Block */}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
