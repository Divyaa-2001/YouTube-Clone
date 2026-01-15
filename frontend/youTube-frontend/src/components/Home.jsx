import VideoCard from "../components/VideoCard";
import { useOutletContext } from "react-router-dom";

function Home() {
  const { videos, setVideos } = useOutletContext();

  const filterByCategory = (category) => {
    if (category === "All") {
      fetch("http://localhost:8000/videos")
        .then(res => res.json())
        .then(data => setVideos(data))
        .catch(err => console.log(err));
    } else {
      fetch(`http://localhost:8000/videos/category/${category}`)
        .then(res => res.json())
        .then(data => setVideos(data))
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="p-4">

      {/* Category Filters */}
      <div className="flex gap-3 overflow-x-auto mb-6 scrollbar-hide">
        {["All", "Education", "Music", "Gaming", "Tech", "News"].map(cat => (
          <button
            key={cat}
            onClick={() => filterByCategory(cat)}
            className="px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-sm whitespace-nowrap"
          >
            {cat}
          </button>
        ))}
      </div>

      {videos.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No videos found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
