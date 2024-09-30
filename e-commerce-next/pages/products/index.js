import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8000/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEdit = (id) => {
    router.push(`/products/edit/${id}`);
  };

  return (
    <div>
      <h1>Products</h1>
      <button onClick={() => router.push('/products/create')}>Add Product</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.product_name} ({product.stock} units)
            <button onClick={() => handleEdit(product.id)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
