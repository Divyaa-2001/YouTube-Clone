import { useState } from "react";

function CreateChannelForm({ user, onCreated }) {
  const [form, setForm] = useState({
    channelName: "",
    description: "",
    banner: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.channelName.trim()) {
      alert("Channel name is required");
      return;
    }

    fetch("http://localhost:8000/channels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        owner: user.username
      })
    })
      .then(res => res.json())
      .then(data => {
        onCreated(data);   // 🔥 Updates UI instantly
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        placeholder="Channel Name"
        className="w-full border p-2 rounded"
        value={form.channelName}
        onChange={e => setForm({ ...form, channelName: e.target.value })}
      />

      <textarea
        placeholder="Description"
        className="w-full border p-2 rounded"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <input
        placeholder="Banner Image URL"
        className="w-full border p-2 rounded"
        value={form.banner}
        onChange={e => setForm({ ...form, banner: e.target.value })}
      />

      <div className="flex justify-end gap-3">
        <button type="button" className="px-4 py-2 rounded hover:bg-gray-100">
          Cancel
        </button>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Channel
        </button>
      </div>
    </form>
  );
}

export default CreateChannelForm;
