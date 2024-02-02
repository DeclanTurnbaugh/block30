import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
        );
        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
      );
      const data = await response.json();
      setBooks(data.books);
    } else {
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBooks(filteredBooks);
    }
  };

  return (
    <div className="home-container">
      <h1>Library Catalog</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul className="books-list">
        {books &&
          books.map((book) => (
            <li className="book-item" key={book.id}>
              <Link to={`/books/${book.id}`}>
                <img
                  className="book-cover"
                  src={book.coverimage}
                  alt={`Cover of ${book.title}`}
                />
                <div className="book-details">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
