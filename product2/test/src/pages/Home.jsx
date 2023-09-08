import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';



const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState();
  const [page, setPage] = useState(1);
  
  
  useEffect(() => {
    const getProducts = () => {
      fetch(`http://localhost:8000/api/products?page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setPagination(data);
          setProducts(data.data);
        })
        .catch((error) => console.error('Error:', error));
    };

    getProducts();
  }, [page]); 

  // useEffect(() => {
  //   const pagination = document.getElementById('pagination');
  //   const previousButton = document.getElementById('previous');
  //   const nextButton = document.getElementById('next');
  //   const pages = pagination.querySelectorAll('.page-item');

  //   let currentPage = page;

  //   function showPage(page) {
  //     pages.forEach((pageItem, index) => {
  //       if (index === page) {
  //         pageItem.classList.add('active');
  //       } else {
  //         pageItem.classList.remove('active');
  //       }
  //     });
  //   }

  //   showPage(currentPage);

  //   previousButton.addEventListener('click', () => {
  //     if (currentPage > 1) {
  //       currentPage--;
  //       showPage(currentPage);
  //       setPage(currentPage); 
  //     }
  //   });

  //   nextButton.addEventListener('click', () => {
  //     if (currentPage < pages.length - 2) {
  //       currentPage++;
  //       showPage(currentPage);
  //       setPage(currentPage); 
  //     }
  //   });
  // }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/products?search=${searchQuery}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.data);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handlePage = (p) => {
    if(p === '&laquo; Previous') {
      setPage(parseInt(page) - 1);
    } else if(p==='Next &raquo;') {
      setPage(parseInt(page) + 1);
    } else{
      setPage(p);
    }
  }

  return (
    <div>
      <nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand">Selamat Datang</a>
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
      </div>
      </nav>
      <div className="header">
        <h2>Daftar Produk</h2>
        <div>
          <Link className="back-link me-3" to='/update'>Tambah Produk</Link>
          <Link className="back-link" to='/edit'>Edit Produk</Link>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar Produk</th>
            <th>Nama Produk</th>
            <th>Deskripsi</th>
            <th>Harga</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="product">
              <td>{(index + 1) + (10 * (pagination?.current_page - 1))}</td>
              <td className="product-image">
                <img src={product.image}alt={product.name} />
              </td>
              <td className="product-name">{product.name}</td>
              <td className="product-description">{product.description}</td>
              <td className="product-price">{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination" id="pagination">
          {pagination?.links.map(l => (
            <li class="page-item" onClick={() => handlePage(l.label)}><span class="page-link">{l.label}</span></li>
          ))}
        </ul>
    </nav>
      </div>
    </div>
  );
};

export default Home;
