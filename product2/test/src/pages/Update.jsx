import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './update.css'; // Impor file CSS (misalnya Home.css) untuk gaya tambahan

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCreateProduct = (e) => {
    e.preventDefault()
    console.log(formData)
    const formDataWithImage = new FormData();
    formDataWithImage.append('name', formData.name);
    formDataWithImage.append('description', formData.description);
    formDataWithImage.append('price', formData.price);
    formDataWithImage.append('image', formData.image);
    console.log(formDataWithImage)

    // Simpan atau kirim data formDataWithImage ke server di sini
    fetch('http://localhost:8000/api/products', {
      method: 'POST',
      body: formDataWithImage,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Produk berhasil dibuat:', data);
 navigate('/home')
        setFormData({
          name: '',
          description: '',
          price: '',
          image: null,
        });
      })
      .catch((error) => console.error('Error:', error));

    // Setelah menyimpan, Anda bisa mereset form
  };

  return (
    <div className='mt-5'>
       <Link className="link" to="/Home"> Kembali</Link>
    <div className="container">
      <h2>Tambah Produk Baru</h2>
      <form className="product-form" onSubmit={handleCreateProduct}>
        <div className="form-group">
          <label htmlFor="image">Gambar Produk</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nama Produk</label>
          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Deskripsi</label>
          <textarea
            name="description"
            placeholder="Deskripsi"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Harga</label>
          <input
            type="integer"
            name="price"
            placeholder="Harga"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <button className="new-button" onClick={handleCreateProduct}>
          Simpan
        </button>
      </form>
    </div>
    </div>
  );
};

export default Home;
