import React, { useState, useEffect } from 'react';
import PlantForm from './PlantForm';
import PlantTable from './PlantTable';
import UserTable from './UserTable';
import axios from 'axios';

const AdminDashboard = () => {
  const [plants, setPlants] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    fetchPlants();
    fetchUsers();
  }, []);

  const fetchPlants = async () => {
    const res = await axios.get('http://localhost:5000/api/plants');
    setPlants(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users/profile');
    setUsers(res.data);
  };

  return (
    <div className="p-8 space-y-8 mt-10">
      <h1 className="text-3xl font-bold text-center">🌿 HerbiVerse Admin Dashboard</h1>

      <section className="border p-4 rounded shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">Add / Edit Plant</h2>
        <PlantForm
          initialData={selectedPlant}
          refreshData={fetchPlants}
          clearSelection={() => setSelectedPlant(null)}
        />
      </section>

      <section className="border p-4 rounded shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">🌱 All Plants</h2>
        <PlantTable
          plants={plants}
          setSelectedPlant={setSelectedPlant}
          refreshData={fetchPlants}
        />
      </section>

      <section className="border p-4 rounded shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">👤 Registered Users</h2>
        <UserTable users={users} />
      </section>
    </div>
  );
};

export default AdminDashboard;
