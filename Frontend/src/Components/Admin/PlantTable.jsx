import React, { useEffect, useState } from "react";
import axios from "axios";

const PlantTable = () => {
  const [plants, setPlants] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedPlant, setEditedPlant] = useState({});

  const fetchPlants = async () => {
    const res = await axios.get("/api/plants");
    setPlants(res.data);
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Delete this plant?")) {
      await axios.delete(`/api/plants/${id}`, { withCredentials: true });
      fetchPlants();
    }
  };

  const handleEdit = (plant) => {
    setEditingId(plant._id);
    setEditedPlant(plant);
  };

  const handleSave = async () => {
    await axios.put(`/api/plants/${editingId}`, editedPlant, { withCredentials: true });
    setEditingId(null);
    fetchPlants();
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-2">🌱 Existing Plants</h2>
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-green-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Scientific Name</th>
            <th className="p-2">Model Path</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant) => (
            <tr key={plant._id} className="border-t">
              {editingId === plant._id ? (
                <>
                  <td><input value={editedPlant.name} onChange={(e) => setEditedPlant({ ...editedPlant, name: e.target.value })} /></td>
                  <td><input value={editedPlant.scientificName} onChange={(e) => setEditedPlant({ ...editedPlant, scientificName: e.target.value })} /></td>
                  <td><input value={editedPlant.modelPath} onChange={(e) => setEditedPlant({ ...editedPlant, modelPath: e.target.value })} /></td>
                  <td>
                    <button onClick={handleSave} className="text-green-600">💾 Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{plant.name}</td>
                  <td>{plant.scientificName}</td>
                  <td>{plant.modelPath}</td>
                  <td className="space-x-2">
                    <button onClick={() => handleEdit(plant)} className="text-blue-600">✏️ Edit</button>
                    <button onClick={() => handleDelete(plant._id)} className="text-red-600">🗑️ Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlantTable;
