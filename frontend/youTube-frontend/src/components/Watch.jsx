// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// function Watch() {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
//   const [comments, setComments] = useState([]);
//     const [text, setText] = useState("");

// const user = JSON.parse(localStorage.getItem("user"));


//   useEffect(() => {
//     fetch("http://localhost:8000/videos")
//       .then(res => res.json())
//       .then(data => setVideo(data.find(v => v._id === id)));

//     fetch(`http://localhost:8000/comments/${id}`)
//       .then(res => res.json())
//       .then(data => setComments(data));
//   }, [id]);

//   const addComment = () => {
//     fetch("http://localhost:8000/comments", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         videoId: id,
//         user: user.username,
//         text
//       })
//     })
//       .then(res => res.json())
//       .then(newComment => {
//         setComments([newComment, ...comments]);
//         setText("");
//       });
//   };

//   if (!video) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <iframe src={video.videoUrl} width="100%" height="500" />

//       <h2 className="text-xl font-bold mt-4">{video.title}</h2>
// <div className="flex gap-4 mt-4">

//   <button
//     onClick={() => {
//         fetch(`http://localhost:8000/videos/${video._id}/like`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user: user.username })
//         })
//         .then(res => res.json())
//         .then(updated => setVideo(updated));
//     }}
//     className="border px-4 py-2 rounded"
//   >
//     👍 {video.likes}
//   </button>

//   <button
//     onClick={() => {
//         fetch(`http://localhost:8000/videos/${video._id}/dislike`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user: user.username })
//         })

//         .then(res => res.json())
//         .then(updated => setVideo(updated));
//     }}
//     className="border px-4 py-2 rounded"
//   >
//     👎 {video.dislikes}
//   </button>

// </div>
//       {/* Comment Box */}
//       <div className="mt-6">
//         <input
//           className="border p-2 w-full"
//           placeholder="Add a comment..."
//           value={text}
//           onChange={e => setText(e.target.value)}
//         />
//         <button onClick={addComment} className="bg-blue-500 text-white px-4 py-2 mt-2">
//           Post
//         </button>
//       </div>

//       {/* Comment List */}
//       <div className="mt-4">
//         {comments.map(c => (
//           <div key={c._id} className="border-b py-2">
//             <p className="font-semibold">{c.user}</p>
//                 <p>{c.text}</p>
                
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Watch;


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaThumbsUp,FaThumbsDown  } from "react-icons/fa";

function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Fetch single video
    fetch("http://localhost:8000/videos")
      .then(res => res.json())
      .then(data => setVideo(data.find(v => v._id === id)));

    // Fetch comments
    fetch(`http://localhost:8000/comments/${id}`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [id]);

  const addComment = () => {
    if (!text.trim()) return;

    fetch("http://localhost:8000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        videoId: id,
        user: user.username,
        text
      })
    })
      .then(res => res.json())
      .then(newComment => {
        setComments([newComment, ...comments]);
        setText("");
      });
  };

  const likeVideo = () => {
    fetch(`http://localhost:8000/videos/${video._id}/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.username })
    })
      .then(res => res.json())
      .then(updated => setVideo(updated));
  };

  const dislikeVideo = () => {
    fetch(`http://localhost:8000/videos/${video._id}/dislike`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.username })
    })
      .then(res => res.json())
      .then(updated => setVideo(updated));
  };

  if (!video) return <p className="p-6">Loading...</p>;
return (
  <div className="p-6 max-w-6xl mx-auto">

    {/* Video Player */}
    <iframe
      src={video.videoUrl}
      width="100%"
      height="500"
      className="rounded-xl"
      allowFullScreen
    />

    {/* Title */}
    <h2 className="text-xl font-bold mt-4">{video.title}</h2>

    {/* Channel + Subscribe + Like */}
    <div className="flex justify-between items-center mt-4">

      {/* Left: Channel Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white text-lg font-bold">
          {video.channelName[0].toUpperCase()}
        </div>

        <div>
          <p className="font-semibold">{video.channelName}</p>
          <p className="text-sm text-gray-500">36.3K subscribers</p>
        </div>

        <button className="bg-black text-white px-4 py-2 rounded-full">
          Subscribe
        </button>
      </div>

      {/* Right: Like / Dislike */}
      <div className="flex gap-3">
        <button
          onClick={likeVideo}
          className="border px-4 py-2 rounded-full hover:bg-gray-100"
        >
          <div className="flex items-center gap-1">
          <FaThumbsUp /> {video.likes.length}
             </div>
        </button>

        <button
          onClick={dislikeVideo}
          className="border px-4 py-2 rounded-full hover:bg-gray-100"
        >
          <div className="flex items-center gap-1">
            <FaThumbsDown /> {video.dislikes.length}
          </div>
        </button>
      </div>

    </div>

    {/* Description */}
    <div className="bg-gray-100 p-4 rounded-lg mt-4">
      <p className="text-sm text-gray-600">
        {video.views} views • {new Date(video.uploadDate).toDateString()}
      </p>
      <p className="mt-2">{video.description}</p>
    </div>

    {/* Add Comment */}
    <div className="mt-6">
      <input
        className="border p-2 w-full rounded"
        placeholder="Add a comment..."
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button
        onClick={addComment}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        Post
      </button>
    </div>

    {/* Comments */}
    <div className="mt-6">
      {comments.map(c => (
        <div key={c._id} className="border-b py-3">
          <p className="font-semibold">{c.user}</p>
          <p className="text-gray-700">{c.text}</p>
        </div>
      ))}
    </div>

  </div>
);

}

export default Watch;
