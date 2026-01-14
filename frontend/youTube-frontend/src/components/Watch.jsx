import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/videos")
      .then(res => res.json())
      .then(data => {
        const found = data.find(v => v._id === id);
        setVideo(found);
      });
  }, [id]);

  if (!video) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">

      <iframe
        src={video.videoUrl}
        width="100%"
        height="500"
        title={video.title}
        frameBorder="0"
        allowFullScreen
        className="rounded-lg"
      />

      <h2 className="text-2xl font-bold mt-4">
        {video.title}
      </h2>

      <p className="text-gray-600 mt-2">
        {video.description}
      </p>

    </div>
  );
}

export default Watch;
