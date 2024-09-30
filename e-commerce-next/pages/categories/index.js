import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8000/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleEdit = (id) => {
    router.push(`/categories/edit/${id}`);
  };

  return (
    <div>
      <h1>Product Categories</h1>
      <button onClick={() => router.push('/categories/create')}>Add Category</button>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.category_name} ({category.description})
            <button onClick={() => handleEdit(category.id)}>Edit</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
