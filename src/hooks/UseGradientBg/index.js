import { useState } from "react";

export default function UseGradientBg() {
  const gradients = [
    "bg-gradient-to-r from-blue-500 to-purple-600",
    "bg-gradient-to-r from-pink-500 to-red-500",
    "bg-gradient-to-r from-green-400 to-emerald-600",
    "bg-gradient-to-r from-yellow-400 to-orange-500",
    "bg-gradient-to-r from-sky-400 to-indigo-600",
    "bg-gradient-to-br from-fuchsia-500 to-violet-700",
  ];

  const [gradient, setGradient] = useState(gradients[0]);

  const changeGradient = () => {
    const random = Math.floor(Math.random() * gradients.length);
    setGradient(gradients[random]);
  };

  return { gradient, changeGradient };
}
