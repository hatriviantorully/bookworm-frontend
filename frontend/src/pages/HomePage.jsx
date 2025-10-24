import { useEffect, useState } from "react";
import COLORS from "../constants/colors";
import "../assets/styles/home.css";

export default function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Simulasi fetch data buku
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/books");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div
      className="home-container"
      style={{
        minHeight: "100vh",
        backgroundColor: COLORS.background,
        padding: "2rem",
      }}
    >
      <h1 style={{ color: COLORS.primary, marginBottom: "1rem" }}>
        Welcome to BookWorm 📚
      </h1>

      <div className="books-grid">
        {books.length === 0 ? (
          <p>No books found</p>
        ) : (
          books.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
