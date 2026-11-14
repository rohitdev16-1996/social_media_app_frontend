import { Link } from "react-router-dom";

const EmptyFeed = () => (
  <div className="flex justify-center my-16 px-4">
    <div className="card bg-base-300 w-full max-w-md shadow-xl">
      <div className="card-body items-center text-center">
        <div className="text-6xl mb-2">🎉</div>
        <h2 className="card-title text-2xl">You're all caught up!</h2>
        <p className="opacity-70">
          No new connections to show right now. Check back later, or see who
          you've already connected with.
        </p>
        <div className="card-actions mt-4">
          <Link to="/connections" className="btn btn-primary">
            View Connections
          </Link>
          <Link to="/requests" className="btn btn-secondary">
            View Requests
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default EmptyFeed;
