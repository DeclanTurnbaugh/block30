import { useState, useEffect } from "react";
import "./Account.css";

const Account = () => {
  const [userData, setUserData] = useState({});
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchReservations = async () => {
      try {
        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setReservations(data.reservation);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchUserData();
    fetchReservations();
  }, []);

  const handleReturnBook = async (reservationId) => {
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${reservationId}`,
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
      const data = await response.json();
      console.log("Book returned successfully:", data);
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  return (
    <div className="account-container">
      <h1>Account Information</h1>
      <div className="user-info">
        <p>Username or Email: {userData.username || userData.email}</p>
      </div>
      <h2>Books Checked Out</h2>
      <ul className="reservations-list">
        {reservations.map((reservation) => (
          <li className="reservation-item" key={reservation.id}>
            <div className="reservation-details">
              <h3>{reservation.title}</h3>
              <p>{reservation.author}</p>
            </div>
            <button onClick={() => handleReturnBook(reservation.id)}>
              Return Book
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Account;
