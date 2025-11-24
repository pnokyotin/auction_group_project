// src/pages/ManageRoom/index.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import Modal from "../../components/Modal";
import AddRoomForm from "../../components/form/AddRoomForm";
import SearchBox from "../../components/form/search/search_box";

export default function ManageRoom() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // ดึงห้องทั้งหมด
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/rooms");
      const data = await res.json();
      if (data.success) {
        setRooms(data.rooms);
      } else {
        setError(data.message || "Failed to fetch rooms");
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch rooms");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // เพิ่มห้องใหม่
  const handleAddRoom = async ({ room_name, description }) => {
    try {
      const res = await fetch("http://localhost:5000/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room_name, description }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRooms((prev) => [
          { room_id: data.room_id, room_name, description, created_at: new Date().toISOString() },
          ...prev,
        ]);
        setShowModal(false);
      } else {
        alert(data.message || "Error adding room");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // กรองตาม room name
  const filteredRooms = rooms.filter((room) =>
    room.room_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <EmployeeLayout title="Manage Rooms">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl">Rooms</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Add Room
        </button>
      </div>

      {/* Search Box */}
      <SearchBox value={search} onChange={(e) => setSearch(e.target.value)} />

      {loading && <p className="text-white mt-4">Loading rooms...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg mt-4">
          <table className="min-w-full bg-white/10 backdrop-blur-md rounded-lg text-left">
            <thead>
              <tr className="text-white border-b border-white/30">
                <th className="px-4 py-2">Room Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr
                  key={room.room_id}
                  className="text-white border-b border-white/20 hover:bg-white/10 transition"
                >
                  <td className="px-4 py-2">{room.room_name}</td>
                  <td className="px-4 py-2">{room.description}</td>
                  <td className="px-4 py-2">{new Date(room.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Back to Dashboard */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/employee-dashboard")}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Modal Add Room */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <AddRoomForm onSubmit={handleAddRoom} />
      </Modal>
    </EmployeeLayout>
  );
}
