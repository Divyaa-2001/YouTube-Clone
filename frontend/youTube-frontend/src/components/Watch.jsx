import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaThumbsUp,FaThumbsDown  } from "react-icons/fa";

function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const [editingId, setEditingId] = useState(null);
const [editText, setEditText] = useState("");

const handleEdit = (comment) => {
  setEditingId(comment._id);
  setEditText(comment.text);
};

const saveEdit = (id) => {
  fetch(`http://localhost:8000/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: editText })
  })
    .then(res => res.json())
    .then(updated => {
      setComments(
        comments.map(c => (c._id === updated._id ? updated : c))
      );
      setEditingId(null);
    });
};

const handleDelete = (id) => {
  fetch(`http://localhost:8000/comments/${id}`, {
    method: "DELETE"
  }).then(() => {
    setComments(comments.filter(c => c._id !== id));
  });
};


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
    {/* <div className="mt-6">
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
    </div> */}
    <div className="mt-8">
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
      {user?.username[0].toUpperCase()}
    </div>

    <div className="flex-1">
      <input
        className="w-full border-b outline-none py-2"
        placeholder="Add a comment..."
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => setText("")}
          className="px-4 py-1 rounded-full hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={addComment}
          className="bg-blue-500 text-white px-4 py-1 rounded-full"
        >
          Comment
        </button>
      </div>
    </div>
  </div>
</div>


    {/* Comments */}
    {/* <div className="mt-6">
      {comments.map(c => (
        <div key={c._id} className="border-b py-3">
          <p className="font-semibold">{c.user}</p>
          <p className="text-gray-700">{c.text}</p>
        </div>
      ))}
    </div> */}
    
<div className="mt-8">
  <h3 className="font-semibold mb-4">
    {comments.length} Comments
  </h3>

  {comments.map(c => (
    <div key={c._id} className="flex gap-3 mb-6">

      {/* Avatar */}
      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
        {c.user?.[0]?.toUpperCase()}
      </div>

      <div className="flex-1">

        <div className="flex items-center gap-2">
          <p className="font-semibold">@{c.user}</p>
          <p className="text-sm text-gray-500">
            {new Date(c.createdAt || Date.now()).toDateString()}
          </p>
        </div>

        {/* Edit Mode */}
        {editingId === c._id ? (
          <>
            <input
              value={editText}
              onChange={e => setEditText(e.target.value)}
              className="border p-2 w-full mt-2 rounded"
            />
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => saveEdit(c._id)}
                className="text-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="text-gray-500"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p className="mt-1 text-gray-800">{c.text}</p>
        )}

        {/* Edit/Delete Buttons */}
        {user && (
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <button onClick={() => handleEdit(c)}>Edit</button>
            <button onClick={() => handleDelete(c._id)} className="text-red-500">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  ))}
</div>

  </div>
);

}

export default Watch;
