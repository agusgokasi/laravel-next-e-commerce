import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function EditCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCategory = async () => {
      if (id) {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategoryName(response.data.category_name);
        setDescription(response.data.description);
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    await axios.put(
      `http://localhost:8000/api/categories/${id}`,
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
      <h1>Edit Product Category</h1>
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
        <button type="submit">Update Category</button>
      </form>
    </div>
  );
}
