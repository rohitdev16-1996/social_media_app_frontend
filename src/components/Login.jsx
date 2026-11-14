import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

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

      /* Store the data in the store */
      dispatch(addUser(res.data));

      /* Navigate to the Feed Page */
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!!!");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );

      /* Store the data in the store */
      dispatch(addUser(res.data.data));

      /* Navigate to the feed page */
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!!!");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          {!isLoginForm && (
            <>
              {/* FirstName Block */}
              <div className="my-2">
                <fieldset className="fieldset">
                  <label className="label" htmlFor="name">
                    First Name:
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="input"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </fieldset>{" "}
              </div>

              {/* LastNme Block */}
              <div className="my-2">
                <fieldset className="fieldset">
                  <label className="label" htmlFor="name">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="input"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </fieldset>
              </div>
            </>
          )}

          {/* Email Block */}
          <div className="my-2">
            <fieldset className="fieldset">
              <label className="label" htmlFor="name">
                Email Id:
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

          {/* Error Message */}
          <p className="text-red-500">{error}</p>

          {/* Toggle to Sign Up / Login */}
          <p className="text-center text-sm py-2 opacity-80">
            {isLoginForm ? "New user? " : "Existing user? "}
            <span
              className="text-primary font-medium cursor-pointer hover:underline transition-colors"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm ? "Sign up here" : "Log in here"}
            </span>
          </p>

          {/* SignUp / Login Button Block */}
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
