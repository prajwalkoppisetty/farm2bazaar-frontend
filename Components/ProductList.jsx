import React, { useState, useEffect } from 'react';
import { useAuth } from '../src/AuthContext';
import { FaEdit, FaTrash, FaShoppingCart, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ProductList = ({ forFarmer = false }) => {
  const { user, userRole, api } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', quantity: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (forFarmer && user && user.id) {
        response = await api.get(`/farmers/${user.id}/products`);
      } else if (user && user.aadhar) {
        response = await api.get(`/retailer/${user.aadhar}/available-products`);
      }
      setProducts(response ? response.data : []);
    } catch (err) {
      setError('Failed to fetch products.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user, userRole, api, forFarmer]);

  const handleAddProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post(`/farmers/${user.id}/products`, newProduct);
      setSuccessMessage('Product added successfully!');
      setShowSuccess(true);
      setShowAddProductModal(false);
      setNewProduct({ name: '', category: '', price: '', quantity: '' });
      fetchProducts();
    } catch (err) {
      setError('Failed to add product.');
      console.error(err);
    }
  };

  const handleEditProductChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await api.patch(`/farmers/${user.id}/products/${editingProduct.id}`, editingProduct);
      setSuccessMessage('Product updated successfully!');
      setShowSuccess(true);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      setError('Failed to update product.');
      console.error(err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setError(null);
      try {
        await api.delete(`/farmers/${user.id}/products/${productId}`);
        setSuccessMessage('Product deleted successfully!');
        setShowSuccess(true);
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product.');
        console.error(err);
      }
    }
  };

  const handleMarkSoldOut = async (productId) => {
    if (window.confirm('Are you sure you want to mark this product as sold out?')) {
      setError(null);
      try {
        await api.post(`/farmers/${user.id}/products/${productId}/soldout`);
        setSuccessMessage('Product marked as sold out!');
        setShowSuccess(true);
        fetchProducts();
      } catch (err) {
        setError('Failed to mark product as sold out.');
        console.error(err);
      }
    }
  };

  const handlePurchaseProduct = async (productId, currentQuantity, currentPrice) => {
    const quantityToPurchase = prompt(`How many units of this product would you like to purchase? (Available: ${currentQuantity})`);
    if (quantityToPurchase === null || isNaN(quantityToPurchase) || parseInt(quantityToPurchase) <= 0) {
      alert('Please enter a valid positive number for quantity.');
      return;
    }
    const quantity = parseInt(quantityToPurchase);
    if (quantity > currentQuantity) {
      alert('Insufficient stock.');
      return;
    }

    const paymentType = prompt('Enter payment type (e.g., "Cash", "Card", "UPI"):');
    if (!paymentType) {
      alert('Payment type is required.');
      return;
    }

    setError(null);
    try {
      await api.post(`/products/${productId}/purchase`, {
        retailer_id: user.aadhar,
        quantity: quantity,
        payment_type: paymentType,
      });
      setSuccessMessage('Purchase successful!');
      setShowSuccess(true);
      fetchProducts(); // Refresh product list
    } catch (err) {
      setError('Failed to complete purchase.');
      console.error(err);
      alert(err.response?.data?.error || 'An error occurred during purchase.');
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{forFarmer ? 'My Products' : 'Available Products'}</h2>
        {forFarmer && (
          <button
            onClick={() => setShowAddProductModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add New Product
          </button>
        )}
      </div>

      {showSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-md" role="alert">
          <p className="font-bold">Success!</p>
          <p>{successMessage}</p>
        </div>
      )}

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                {forFarmer && <th className="py-2 px-4 border-b">In Stock</th>}
                {!forFarmer && <th className="py-2 px-4 border-b">Farmer Name</th>}
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b text-center">{product.name || product.product_name}</td>
                  <td className="py-2 px-4 border-b text-center">{product.category}</td>
                  <td className="py-2 px-4 border-b text-center">₹{product.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-center">{product.quantity}</td>
                  {forFarmer && (
                    <td className="py-2 px-4 border-b text-center">
                      {product.in_stock ? <FaCheckCircle className="text-green-500 inline" /> : <FaTimesCircle className="text-red-500 inline" />}
                    </td>
                  )}
                  {!forFarmer && <td className="py-2 px-4 border-b text-center">{product.farmer_name}</td>}
                  <td className="py-2 px-4 border-b text-center">
                    {forFarmer ? (
                      <>
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                          title="Edit Product"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:text-red-700 mr-2"
                          title="Delete Product"
                        >
                          <FaTrash />
                        </button>
                        {product.in_stock && product.quantity > 0 && (
                          <button
                            onClick={() => handleMarkSoldOut(product.id)}
                            className="text-yellow-500 hover:text-yellow-700"
                            title="Mark Sold Out"
                          >
                            <FaTimesCircle />
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => handlePurchaseProduct(product.id, product.quantity, product.price)}
                        className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 flex items-center justify-center mx-auto"
                        title="Purchase Product"
                      >
                        <FaShoppingCart className="mr-1" /> Buy
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Add New Product</h3>
            <form onSubmit={handleAddProductSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={newProduct.name}
                  onChange={handleAddProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={newProduct.category}
                  onChange={handleAddProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={newProduct.price}
                  onChange={handleAddProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  step="0.01"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={newProduct.quantity}
                  onChange={handleAddProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleUpdateProduct}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-name">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={handleEditProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-category">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="edit-category"
                  value={editingProduct.category}
                  onChange={handleEditProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-price">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="edit-price"
                  value={editingProduct.price}
                  onChange={handleEditProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  step="0.01"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="edit-quantity"
                  value={editingProduct.quantity}
                  onChange={handleEditProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;