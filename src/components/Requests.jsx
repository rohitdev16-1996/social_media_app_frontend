import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeRequests(_id));
    } catch (err) {
      console.log("ERROR : ", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  /* data not loaded yet */
  if (!requests) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  /* loaded but empty */
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center my-20 gap-2 text-center">
        <span className="text-6xl">🤝</span>
        <h1 className="text-2xl font-bold">No connections yet</h1>
        <p className="opacity-70">Head to the feed and start connecting!</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 my-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Requests</h1>
        <span className="badge badge-primary badge-lg">{requests.length}</span>
      </div>

      <div className="flex flex-col gap-4">
        {requests.map((request) => {
          const { _id } = request;
          const { firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-box bg-base-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Avatar */}
              <div className="avatar shrink-0 self-center sm:self-auto">
                <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={photoUrl || "https://placehold.co/160x160"}
                    alt={`${firstName}'s photo`}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h2 className="text-lg font-semibold">
                  {firstName} {lastName}
                </h2>

                <div className="flex gap-2 mt-1 justify-center sm:justify-start">
                  {age && (
                    <span className="badge badge-outline">{age} yrs</span>
                  )}
                  {gender && (
                    <span className="badge badge-outline capitalize">
                      {gender}
                    </span>
                  )}
                </div>

                {about && (
                  <p className="text-sm opacity-80 line-clamp-2 mt-2">
                    {about}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-center sm:flex-col">
                <button
                  className="btn btn-success btn-sm sm:w-24"
                  onClick={() => reviewRequest("accepted", _id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-error btn-outline btn-sm sm:w-24"
                  onClick={() => reviewRequest("rejected", _id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
