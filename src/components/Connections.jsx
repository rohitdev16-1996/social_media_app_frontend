import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(
                BASE_URL + "/user/connections",
                {
                    withCredentials: true,
                }
            );
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    /* data not loaded yet */
    if (!connections) {
        return (
            <div className="flex justify-center my-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    /* loaded but empty */
    if (connections.length === 0) {
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
                <h1 className="text-3xl font-bold">Connections</h1>
                <span className="badge badge-primary badge-lg">
                    {connections.length}
                </span>
            </div>

            <div className="flex flex-col gap-4">
                {connections.map((connection) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } =
                        connection;

                    return (
                        <div
                            key={_id}
                            className="card card-side bg-base-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <figure className="p-4">
                                <div className="avatar">
                                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img
                                            src={photoUrl || "https://placehold.co/160x160"}
                                            alt={`${firstName}'s photo`}
                                        />
                                    </div>
                                </div>
                            </figure>

                            <div className="card-body py-4 pl-0">
                                <h2 className="card-title">
                                    {firstName} {lastName}
                                </h2>

                                <div className="flex gap-2">
                                    {age && <span className="badge badge-outline">{age} yrs</span>}
                                    {gender && (
                                        <span className="badge badge-outline capitalize">
                                            {gender}
                                        </span>
                                    )}
                                </div>

                                {about && (
                                    <p className="text-sm opacity-80 line-clamp-2">{about}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Connections;