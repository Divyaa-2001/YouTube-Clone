import { useState } from "react";

function UploadVideo({ refresh }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    category: "Education"
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        channelName: user.username,
        views: 0
      })
    })
      .then(res => res.json())
      .then(() => {
        refresh();
        alert("Video uploaded!");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-6">
      <h2 className="font-bold mb-2">Upload Video</h2>

      <input placeholder="Title" className="border p-2 w-full mb-2"
        onChange={e => setForm({ ...form, title: e.target.value })} />

      <input placeholder="Description" className="border p-2 w-full mb-2"
        onChange={e => setForm({ ...form, description: e.target.value })} />

      <input placeholder="YouTube Embed URL" className="border p-2 w-full mb-2"
        onChange={e => setForm({ ...form, videoUrl: e.target.value })} />

      <input placeholder="Thumbnail URL" className="border p-2 w-full mb-2"
        onChange={e => setForm({ ...form, thumbnailUrl: e.target.value })} />

      <button className="bg-red-600 text-white px-4 py-2">
        Upload
      </button>
    </form>
  );
}

export default UploadVideo;
