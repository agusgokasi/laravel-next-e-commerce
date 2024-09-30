import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function EditProduct() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [stock, setStock] = useState(0);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      const token = localStorage.getItem('token');
      const [productResponse, categoriesResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get('http://localhost:8000/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const product = productResponse.data;
      setProductName(product.product_name);
      setDescription(product.description);
      setCategoryId(product.category_id);
      setStock(product.stock);
      setCategories(categoriesResponse.data);
    };

    if (id) fetchProductAndCategories();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    await axios.put(
      `http://localhost:8000/api/products/${id}`,
      {
        product_name: productName,
        description,
        category_id: categoryId,
        stock,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    router.push('/products');
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Category</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}
