// src/hooks/useRooms.js
import { useState, useEffect } from "react";

export default function useRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data.rooms || []))
      .catch((err) => console.error(err));
  }, []);

  return rooms;
}
