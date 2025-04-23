import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch product details', err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" /></div>;

  return (
    <>
      <Navbar />
      <div className="container py-4">
        {product && (
          <div className="row">
            <div className="col-md-6">
              <img src={product.images[0]} className="img-fluid" alt={product.title} loading="lazy" />
            </div>
            <div className="col-md-6">
              <h2>{product.title}</h2>
              <p className="lead">${product.price}</p>
              <p>{product.description}</p>
              <p><strong>Category:</strong> {product.category?.name}</p>
              <button className="btn btn-success">Add to Cart</button>
              <button className="btn btn-warning ms-2">Buy Now</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;