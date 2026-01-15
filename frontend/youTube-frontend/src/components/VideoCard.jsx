import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

  console.log("VIDEO DATA:", video)
  return (

    <div
      onClick={() => navigate(`/watch/${video._id}`)}
      className="cursor-pointer"
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-44 object-cover rounded-xl"
      />

      {/* <p className="text-gray-500 text-sm">{video.channelName}</p> */}
      <h2 className="text-lg font-bold mt-4">{video.title}</h2>
      <p className="text-gray-600">{video.channelName}</p>
      <p className="text-gray-600">{video.views} views</p>
      {/* <p className="mt-2">{video.description}</p> */}
    </div>
  );
}

export default VideoCard;
