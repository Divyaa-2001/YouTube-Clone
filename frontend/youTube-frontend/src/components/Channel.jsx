import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import CreateChannelForm from "./CreateChannelForm";

function Channel() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:8000/channels/${user.username}`)
      .then(res => res.json())
      .then(data => setChannel(data));

    fetch(`http://localhost:8000/videos/user/${user.username}`)
      .then(res => res.json())
      .then(data => {
        setVideos(data);
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return <div className="p-6 text-center text-lg">Please login first</div>;
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  // -----------------------------
  // NO CHANNEL → CREATE CHANNEL
  // -----------------------------
  if (!channel) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">
            How you'll appear
          </h2>

          <div className="flex flex-col items-center mb-4">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-white">
              {user.username[0].toUpperCase()}
            </div>
            <button className="text-blue-600 mt-2">Select picture</button>
          </div>

          <CreateChannelForm
            user={user}
            onCreated={(newChannel) => setChannel(newChannel)}
          />
        </div>
      </div>
    );
  }

  // -----------------------------
  // CHANNEL EXISTS
  // -----------------------------
  return (
    <div className="max-w-full px-4 sm:px-6 py-6">

      {/* Banner */}
        <img
        src="https://images.unsplash.com/photo-1522199710521-72d69614c702"
        alt="Channel Banner"
        className="h-32 sm:h-40 w-full object-cover rounded-lg mb-6"
      />

      {/* Channel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">

        {/* Profile Logo */}
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto sm:mx-0">
          {channel?.channelName || user.username[0].toUpperCase()}
        </div>

        {/* Channel Info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold">
            {channel?.channelName || user.username}
          </h2>

          <p className="text-gray-600 text-sm">
            @{channel?.channelName || user.username.toLowerCase()} • {videos.length} videos
          </p>

          <p className="text-gray-500 text-sm mt-1">
            Welcome to the official YouTube channel of {channel?.channelName || user.username}
          </p>

          <p className="text-blue-600 text-sm mt-1 cursor-pointer">
            {channel?.channelName || user.username}.com and 5 more links
          </p>
        </div>

        {/* Subscribe Button */}
        <div className="flex justify-center sm:justify-end">
          <button className="bg-black text-white px-5 py-2 rounded-full">
            Subscribe
          </button>
        </div>
      </div>

      {/* Videos */}
      <h3 className="text-lg sm:text-xl font-semibold mb-4">
        Your Videos
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map(video => (
          <div key={video._id}>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Channel;
