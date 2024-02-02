import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`
        );
        const data = await response.json();
        setBook(data.book);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleReserve = async () => {
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${book.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            available: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error reserving book: ${response.statusText}`);
      }

      // Handle the success case or update the UI accordingly
      console.log("Book reserved successfully!");
    } catch (error) {
      console.error(`Error reserving book: ${error.message}`);
    }
  };

  return (
    <div className="book-details-container">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <img src={book.coverimage} alt={`Cover of ${book.title}`} />

      {book.available ? (
        <button onClick={handleReserve}>Reserve Book</button>
      ) : (
        <p>This book is currently not available for reservation.</p>
      )}
    </div>
  );
};

export default BookDetails;
