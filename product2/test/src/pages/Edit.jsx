import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './edit.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });
  
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    getProducts(); 
  }, []);

  const getProducts = () => {
    fetch('http://localhost:8000/api/products')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.data);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
  
    if (type === 'file') {
      // Menangani input berkas (gambar)
      const file = e.target.files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: file,
      }));
    } else {
      // Menangani input teks seperti nama, deskripsi, dan harga
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  
  const handleCreateProduct = () => {
    fetch('http://localhost:8000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Produk berhasil dibuat:', data);
        getProducts();
        setFormData({
          name: '',
          description: '',
          price: '',
        });
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/products?search=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.data);
      })
      .catch((error) => console.error('Error:', error));
  };

 
  const handleEditProduct = (productId) => {
    const formDataWithImage = new FormData();
    formDataWithImage.append('name', formData.name);
    formDataWithImage.append('description', formData.description);
    formDataWithImage.append('price', formData.price);
    formDataWithImage.append('image', formData.image);
    const productToEdit = products.find((product) => product.id === productId);
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,

      });
      setEditingProduct(productId);
      setEditingProduct(productToEdit); // Menyimpan produk yang sedang diedit
    }
  };
  const handleUpdateProduct = () => {
const formDataWithImage = new FormData();
formDataWithImage.append('name', formData.name);
formDataWithImage.append('description', formData.description);
formDataWithImage.append('price', formData.price);
formDataWithImage.append('image', formData.image);
formDataWithImage.append('_method', 'PUT');

    fetch(`http://localhost:8000/api/products/${editingProduct.id}`, {
      method: 'POST',
      body: formDataWithImage,
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('Produk berhasil diperbarui');
        getProducts(); // Memuat ulang daftar produk setelah mengedit
        setFormData({
          name: '',
          description: '',
          price: '',
          image: null,
        });
        setEditingProduct(null);
      } else {
        console.log('Gagal memperbarui produk');
      }
      return response.json(); // Mengembalikan respons JSON dari API
    })
    .then((data) => {
      console.log('Response from PUT request:', data); // Periksa respons dari API
    })
    .catch((error) => console.error('Error:', error));
};
  const handleDeleteProduct= (productId) => {
    const shouldDelete = window.confirm('Apakah Anda yakin ingin menghapus produk ini?');
  
    if (shouldDelete) {
      fetch(`http://localhost:8000/api/products/${productId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.status === 204) {
            console.log('Produk berhasil dihapus');
            getProducts(); 
          } else {
            console.log('Produk tidak dapat dihapus');
          }
        })
      .catch((error) => console.error('Error:', error));
  } else {
    console.log('Penghapusan produk dibatalkan');
  }
  
}

return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <input
          className="form"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
   <div className="header">
      <h2>Daftar Produk</h2>
      <Link className="back-link" to='/home'>Kembali</Link>
    </div>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Gambar Produk</th>
          <th>Nama produk</th>
          <th>Deskripsi</th>
          <th>Harga</th>
          <th></th> {/* Tambahkan kolom untuk tombol edit dan hapus */}
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.id} className="product">
            <td>{index + 1}</td>
            <td className='product-image'>
              <img src={product.image} alt={product.name} />
            </td>
            <td className='product-name'>{product.name}</td>
            <td className='product-description'>{product.description}</td>
            <td className='product-price'>{product.price}</td>
            <td>
              <button onClick={() => handleEditProduct(product.id)}>Edit</button>
              <button onClick={() => handleDeleteProduct(product.id)}>Hapus</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {editingProduct && (
      <div>
        <h2>Edit Produk</h2>
        <div>
        <div className="your-form-class" encType="multipart/form-data" onSubmit={handleUpdateProduct}>
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Nama"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            className="input"
            type="text"
            name="description"
            placeholder="Deskripsi"
            value={formData.description}
            onChange={handleInputChange}
          />
          <input
            className="input"
            type="integer"
            name="price"
            placeholder="Harga"
            value={formData.price}
            onChange={handleInputChange}
          />
           <input
            className="input"
            type="file"
            name="Gambar"
            placeholder="Gambar"
            onChange={handleInputChange}
          />
          <button className="new-button" onClick={handleUpdateProduct}>
            Simpan Perubahan
          </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default Home;