import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const saveProfile = async () => {
    /* Reset Error Message */
    setErrorMessage("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true },
      );

      /* console.log(res.data); */
      dispatch(addUser(res.data.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } catch (err) {
      const data = err?.response?.data;
      setErrorMessage(data);
    }
  };

  return (
    <div className="flex justify-center my-20">
      {/* Form to change the data */}
      <div className="flex justify-center mx-10">
        <div className="flex justify-center my-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>

              {/* First Name Block */}
              <div className="my-2">
                <fieldset className="fieldset">
                  <label className="label" htmlFor="name">
                    First Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setfirstName(event.target.value)}
                  />
                </fieldset>{" "}
              </div>

              {/* Last Name Block */}
              <div className="my-2">
                <fieldset className="fieldset">
                  <label className="label" htmlFor="name">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </fieldset>
              </div>

              {/* Age Block */}
              <div className="my-2">
                <fieldset className="fieldset">
                  <label className="label" htmlFor="name">
                    Age:
                  </label>
                  <input
                    type="number"
                    id="age"
                    className="input"
                    placeholder="Age"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                  />
                </fieldset>
              </div>

              {/* Gender Block */}
              <div className="my-2">
                <fieldset className="fieldset">
                  <label className="label" htmlFor="name">
                    Gender:
                  </label>
                  <input
                    type="text"
                    id="gender"
                    className="input"
                    placeholder="Gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                  />
                </fieldset>
              </div>

              {/* Photo Url Block */}
              <div className="my-2">
                <fieldset className="fieldset">
                  <label className="label" htmlFor="name">
                    Photo Url:
                  </label>
                  <input
                    type="text"
                    id="gender"
                    className="input"
                    placeholder="Photo Url"
                    value={photoUrl}
                    onChange={(event) => setPhotoUrl(event.target.value)}
                  />
                </fieldset>
              </div>

              {/* About Block */}
              <div className="my-2">
                <fieldset className="fieldset">
                  <label className="label" htmlFor="name">
                    About:
                  </label>
                  <input
                    type="text"
                    id="about"
                    className="input"
                    placeholder="About"
                    value={about}
                    onChange={(event) => setAbout(event.target.value)}
                  />
                </fieldset>
              </div>

              {/* Error Message */}
              <p className="text-red-500">{error}</p>

              {/* Edit the Profile Button Block */}
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* USer Card to display the Data changed. */}
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      {showToast && (
        <div className="toast toast-top toast-center z-[100]">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
