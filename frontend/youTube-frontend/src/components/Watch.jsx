import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch video & comments
  useEffect(() => {
    fetch("http://localhost:8000/videos")
      .then(res => res.json())
      .then(data => setVideo(data.find(v => v._id === id)));

    fetch(`http://localhost:8000/comments/${id}`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [id]);

  // Add comment
  // const addComment = () => {
  //   if (!text.trim()) return;

  //   fetch("http://localhost:8000/comments", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       videoId: id,
  //       user: user.username,
  //       text
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(newComment => {
  //       setComments([newComment, ...comments]);
  //       setText("");
  //     });
  // };

  const addComment = () => {
  if (!user || !user.username) {
    alert("Please login again");
    return;
  }

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
console.log("Sending comment as:", user?.username);

  // Like
  const likeVideo = () => {
    fetch(`http://localhost:8000/videos/${video._id}/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.username })
    })
      .then(res => res.json())
      .then(updated => setVideo(updated));
  };

  // Dislike
  const dislikeVideo = () => {
    fetch(`http://localhost:8000/videos/${video._id}/dislike`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.username })
    })
      .then(res => res.json())
      .then(updated => setVideo(updated));
  };

  // Edit comment
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

  // Delete comment
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/comments/${id}`, {
      method: "DELETE"
    }).then(() => {
      setComments(comments.filter(c => c._id !== id));
    });
  };

  if (!video) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT: VIDEO + COMMENTS */}
      <div className="lg:col-span-2">

        {/* Video */}
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

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
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

          <div className="flex gap-3">
            <button
              onClick={likeVideo}
              className="border px-4 py-2 rounded-full hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <FaThumbsUp /> {video.likes.length}
              </div>
            </button>

            <button
              onClick={dislikeVideo}
              className="border px-4 py-2 rounded-full hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
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
        <div className="mt-8">
          <h3 className="font-semibold mb-4">
            {comments.length} Comments
          </h3>

          {comments.map(c => (
            <div key={c._id} className="flex gap-3 mb-6">

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

                {user && (
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <button onClick={() => handleEdit(c)}>Edit</button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: SUGGESTED VIDEOS */}
      <div className="lg:col-span-1 space-y-4">

        <h3 className="font-semibold text-lg mb-2">Suggested Videos</h3>

        {[
        {
          title: "Node.js Tutorial for Beginners",
          channel: "Traversy Media",
          views: "1.2M views",
          thumb: "https://i.ytimg.com/vi/TlB_eWDSMt4/mqdefault.jpg"
        },
        {
          title: "Git & GitHub Crash Course",
          channel: "Edureka",
          views: "540K views",
          thumb: "https://i.ytimg.com/vi/RGOj5yH7evk/mqdefault.jpg"
        },
        {
          title: "MongoDB Crash Course",
          channel: "Web Dev Simplified",
          views: "870K views",
          thumb: "https://i.ytimg.com/vi/ofme2o29ngU/mqdefault.jpg"
        },
        {
          title: "JavaScript in 1 Hour",
          channel: "Code with Harry",
          views: "3.1M views",
          thumb: "https://i.ytimg.com/vi/W6NZfCO5SIk/mqdefault.jpg"
        },
        {
          title: "React Hooks Explained",
          channel: "Academind",
          views: "980K views",
          thumb: "https://i.ytimg.com/vi/-MlNBTSg_Ww/mqdefault.jpg"
        },
        {
          title: "Top 10 VS Code Extensions",
          channel: "Fireship",
          views: "1.4M views",
          thumb: "https://i.ytimg.com/vi/8q7E8w0pY8c/mqdefault.jpg"
        },
        {
          title: "How APIs Work",
          channel: "Tech With Tim",
          views: "620K views",
          thumb: "https://i.ytimg.com/vi/s7wmiS2mSXY/mqdefault.jpg"
        },
        {
          title: "Learn Tailwind CSS Fast",
          channel: "Net Ninja",
          views: "410K views",
          thumb: "https://i.ytimg.com/vi/dFgzHOX84xQ/mqdefault.jpg"
        },
        {
          title: "REST API Explained",
          channel: "Programming with Mosh",
          views: "2M views",
          thumb: "https://i.ytimg.com/vi/Q-BpqyOT3a8/mqdefault.jpg"
        }
        ].map((v, i) => (
          <div key={i} className="flex gap-3 cursor-pointer">
            <img
              src={v.thumb}
              alt={v.title}
              className="w-40 h-24 object-cover rounded-lg"
            />
            <div>
              <p className="font-semibold text-sm line-clamp-2">
                {v.title}
              </p>
              <p className="text-xs text-gray-500">{v.channel}</p>
              <p className="text-xs text-gray-500">{v.views}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Watch;
