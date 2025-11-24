// src/components/forms/AddRoomForm.jsx
import { useState } from "react";

export default function AddRoomForm({ onSubmit }) {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    onSubmit({ room_name: roomName, description });
    setRoomName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h3 className="text-xl font-semibold mb-4 text-black">Add New Room</h3>

      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        rows={4}
      />
      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Add Room
        </button>
      </div>
    </form>
  );
}
