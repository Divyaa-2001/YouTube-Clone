// function VideoCard({ video }) {
//   return (
//     <div className="cursor-pointer">
//       <img
//         src={video.thumbnailUrl}
//         alt={video.title}
//         className="w-full h-48 object-cover rounded-lg"
//       />

//       <div className="mt-2">
//         <h3 className="font-semibold text-sm line-clamp-2">
//           {video.title}
//         </h3>
//         <p className="text-gray-500 text-sm">
//           {video.channelName}
//         </p>
//         <p className="text-gray-500 text-sm">
//           {video.views} views
//         </p>
//       </div>
//     </div>
//   );
// }

// export default VideoCard;
import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

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

      <h3 className="font-semibold mt-2">{video.title}</h3>
      <p className="text-gray-500 text-sm">{video.channelName}</p>
    </div>
  );
}

export default VideoCard;
