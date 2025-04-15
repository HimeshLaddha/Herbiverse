import React, { useState } from "react";
import axios from "axios";

const PlantForm = ({ onPlantAdded }) => {
  const [plantData, setPlantData] = useState({
    name: "",
    scientificName: "",
    description: "",
    modelPath: "",
    careInstructions: "",
  });

  const handleChange = (e) => {
    setPlantData({ ...plantData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/plants", plantData, { withCredentials: true });
      alert("🌱 Plant added!");
      setPlantData({
        name: "",
        scientificName: "",
        description: "",
        modelPath: "",
        careInstructions: "",
      });
      onPlantAdded(); // refresh table
    } catch (err) {
      console.error(err);
      alert("⚠️ Failed to add plant.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-green-100 rounded-lg mb-8">
      <h2 className="text-xl font-bold">Add New Plant</h2>
      {["name", "scientificName", "description", "modelPath", "careInstructions"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          value={plantData[field]}
          onChange={handleChange}
          placeholder={field}
          className="w-full p-2 border rounded"
          required
        />
      ))}
      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">Add Plant</button>
    </form>
  );
};

export default PlantForm;
