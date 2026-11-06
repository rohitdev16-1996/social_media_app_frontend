import { useEffect } from "react"
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {

    /* feed is already present */
    if (feed)
      return;

    try {
      /* Make the API call for the feed */
      const res = await fetch(
        BASE_URL + "/feed",
        {
          credentials: "include",
        }
      );

      const data = await res.json();
      dispatch(addFeed(data));

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center my-10">
      {feed && <UserCard user={feed[0]} />}
    </div>
  )
};
export default Feed;
