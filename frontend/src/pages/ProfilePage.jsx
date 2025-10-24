import { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaBook, FaTrash } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import { API_URL } from "../constants/api";
import Loader from "../components/Loader";
import ProfileHeader from "../components/ProfileHeader";
import LogoutButton from "../components/LogoutButton";
import "../assets/styles/profile.css";

export default function ProfilePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteBookId, setDeleteBookId] = useState(null);

  const { token, user, logout } = useAuthStore();

  useEffect(() => {
    console.log("🔍 Profile - Auth State:", {
      hasToken: !!token,
      hasUser: !!user,
      user,
    });
  }, [token, user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/books/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch user books");
        setBooks(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load profile data. Try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleDeleteBook = async (bookId) => {
    if (!confirm("Are you sure you want to delete this recommendation?"))
      return;

    try {
      setDeleteBookId(bookId);
      const res = await fetch(`${API_URL}/api/books/${bookId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete book");
      setBooks(books.filter((b) => b._id !== bookId));
      alert("Recommendation deleted successfully");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete recommendation");
    } finally {
      setDeleteBookId(null);
    }
  };

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    await logout();
    window.location.href = "/auth/login"; // navigasi ke login
  };

  const renderRatingStars = (rating) => {
    return [...Array(5)].map((_, i) =>
      i < rating ? (
        <FaStar key={i} color="#f4b400" />
      ) : (
        <FaRegStar key={i} color="#ccc" />
      )
    );
  };

  if (loading) return <Loader />;

  return (
    <div className="profile-container">
      <ProfileHeader user={user} />
      <LogoutButton onLogout={handleLogout} />

      <div className="books-header">
        <h2>Your Recommendations 📚</h2>
        <span>{books.length} books</span>
      </div>

      {books.length === 0 ? (
        <div className="empty-state">
          <FaBook size={50} color="#ccc" />
          <p>No recommendations yet</p>
          <button
            className="add-book-btn"
            onClick={() => (window.location.href = "/create")}
          >
            Add Your First Book
          </button>
        </div>
      ) : (
        <div className="books-list">
          {books.map((item) => (
            <div className="book-item" key={item._id}>
              <img src={item.image} alt={item.title} className="book-image" />
              <div className="book-info">
                <h3 className="book-title">{item.title}</h3>
                <div className="rating-container">
                  {renderRatingStars(item.rating)}
                </div>
                <p className="book-caption">{item.caption}</p>
                <p className="book-date">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDeleteBook(item._id)}
                disabled={deleteBookId === item._id}
              >
                {deleteBookId === item._id ? "Deleting..." : <FaTrash />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
