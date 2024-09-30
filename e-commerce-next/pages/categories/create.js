import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    await axios.post(
      'http://localhost:8000/api/categories',
      {
        category_name: categoryName,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    router.push('/categories');
  };

  return (
    <div>
      <h1>Create Product Category</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
}
