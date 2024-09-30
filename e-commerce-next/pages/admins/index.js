import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAdmins = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/admins', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(response.data);
    };
    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8000/api/admins/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAdmins(admins.filter(admin => admin.id !== id));
  };

  const handleEdit = (id) => {
    router.push(`/admins/edit/${id}`);
  };

  return (
    <div>
      <h1>Admin List</h1>
      <button onClick={() => router.push('/admins/create')}>Add Admin</button>
      <ul>
        {admins.map((admin) => (
          <li key={admin.id}>
            {admin.first_name} {admin.last_name} ({admin.email})
            <button onClick={() => handleEdit(admin.id)}>Edit</button>
            <button onClick={() => handleDelete(admin.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
