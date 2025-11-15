'use client'

import { useState, useEffect, useCallback } from 'react'
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi'
import { useLanguageStore } from '@/store/languageStore'

interface Product {
  _id: string
  name: string
  nameAr: string
  price: number
  category: string
  stock: number
}

interface Order {
  _id: string
  orderNumber: string
  customer: {
    name: string
    phone: string
  }
  total: number
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const { language } = useLanguageStore()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  const [productForm, setProductForm] = useState({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    price: '',
    category: 'perfume',
    subcategory: '',
    stock: '',
    images: '',
    featured: false,
  })

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      if (activeTab === 'products') {
        const res = await fetch(`${API_URL}/api/admin/products`)
        const data = await res.json()
        setProducts(data)
      } else {
        const res = await fetch(`${API_URL}/api/admin/orders`)
        const data = await res.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }, [activeTab, API_URL])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  const handleDeleteProduct = async (id: string) => {
    if (!confirm(language === 'fr' ? 'Supprimer ce produit ?' : 'حذف هذا المنتج؟')) return
    
    try {
      await fetch(`${API_URL}/api/admin/products/${id}`, { method: 'DELETE' })
      fetchData()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    try {
      await fetch(`${API_URL}/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchData()
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock),
        images: productForm.images.split(',').map((url) => url.trim()),
      }

      const url = editingProduct
        ? `${API_URL}/api/admin/products/${editingProduct._id}`
        : `${API_URL}/api/admin/products`
      
      const method = editingProduct ? 'PUT' : 'POST'

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })

      setShowProductForm(false)
      setEditingProduct(null)
      setProductForm({
        name: '',
        nameAr: '',
        description: '',
        descriptionAr: '',
        price: '',
        category: 'perfume',
        subcategory: '',
        stock: '',
        images: '',
        featured: false,
      })
      fetchData()
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 font-semibold ${
            activeTab === 'products'
              ? 'border-b-2 border-accent text-accent'
              : 'text-gray-500'
          }`}
        >
          {language === 'fr' ? 'Produits' : 'المنتجات'}
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 font-semibold ${
            activeTab === 'orders'
              ? 'border-b-2 border-accent text-accent'
              : 'text-gray-500'
          }`}
        >
          {language === 'fr' ? 'Commandes' : 'الطلبات'}
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {language === 'fr' ? 'Gestion des produits' : 'إدارة المنتجات'}
            </h2>
            <button
              onClick={() => {
                setEditingProduct(null)
                setShowProductForm(true)
              }}
              className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90"
            >
              <FiPlus />
              {language === 'fr' ? 'Ajouter un produit' : 'إضافة منتج'}
            </button>
          </div>

          {showProductForm && (
            <div className="bg-card rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">
                {editingProduct
                  ? language === 'fr' ? 'Modifier le produit' : 'تعديل المنتج'
                  : language === 'fr' ? 'Nouveau produit' : 'منتج جديد'}
              </h3>
              <form onSubmit={handleSubmitProduct} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Name (FR)</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Name (AR)</label>
                    <input
                      type="text"
                      required
                      value={productForm.nameAr}
                      onChange={(e) => setProductForm({ ...productForm, nameAr: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="perfume">Perfume</option>
                    <option value="gift-box">Gift Box</option>
                    <option value="accessory">Accessory</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Stock</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2">Images (comma-separated URLs)</label>
                  <input
                    type="text"
                    value={productForm.images}
                    onChange={(e) => setProductForm({ ...productForm, images: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-2 rounded-lg"
                  >
                    {editingProduct
                      ? language === 'fr' ? 'Mettre à jour' : 'تحديث'
                      : language === 'fr' ? 'Ajouter' : 'إضافة'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProductForm(false)
                      setEditingProduct(null)
                    }}
                    className="bg-gray-300 px-6 py-2 rounded-lg"
                  >
                    {language === 'fr' ? 'Annuler' : 'إلغاء'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="bg-card rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Price</th>
                    <th className="px-6 py-3 text-left">Stock</th>
                    <th className="px-6 py-3 text-left">Category</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-t">
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">{product.price} DT</td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(product)
                              setProductForm({
                                name: product.name,
                                nameAr: product.nameAr,
                                description: '',
                                descriptionAr: '',
                                price: product.price.toString(),
                                category: product.category,
                                subcategory: '',
                                stock: product.stock.toString(),
                                images: '',
                                featured: false,
                              })
                              setShowProductForm(true)
                            }}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {language === 'fr' ? 'Commandes' : 'الطلبات'}
          </h2>
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="bg-card rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left">Order #</th>
                    <th className="px-6 py-3 text-left">Customer</th>
                    <th className="px-6 py-3 text-left">Total</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-t">
                      <td className="px-6 py-4">{order.orderNumber}</td>
                      <td className="px-6 py-4">
                        {order.customer.name}
                        <br />
                        <span className="text-sm text-gray-500">{order.customer.phone}</span>
                      </td>
                      <td className="px-6 py-4">{order.total.toFixed(2)} DT</td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(order._id, e.target.value)
                          }
                          className="px-3 py-1 border rounded-lg"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-500 hover:text-blue-700">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
