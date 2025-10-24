import { useEffect, useState, useCallback } from "react";
import { FaStar, FaRegStar, FaBook } from "react-icons/fa";
import { testBooksEndpoint } from "../api/authService";
import { useAuthStore } from "../store/authStore";
import { API_URL } from "../constants/api";
import Loader from "../components/Loader";
import { formatPublishDate } from "../lib/utils";
import "../assets/styles/home.css";

export default function HomePage() {
  const { token } = useAuthStore();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchBooks = useCallback(
    async (pageNum = 1) => {
      try {
        if (pageNum === 1) setLoading(true);
        else setLoadingMore(true);

        console.log("📚 Fetching books, page:", pageNum);

        const res = await fetch(
          `${API_URL}/api/books?page=${pageNum}&limit=5`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log("✅ Books fetched:", data.books?.length || 0);

        if (pageNum === 1) setBooks(data.books || []);
        else setBooks((prev) => [...prev, ...(data.books || [])]);

        setHasMore(data.books && data.books.length > 0);
      } catch (err) {
        console.error("❌ Error fetching books:", err);
        alert("Failed to load books. Please try again.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (token) {
      console.log("🔑 Token available, testing API...");
      testBooksEndpoint(token).then((res) => {
        if (res.success) fetchBooks(1);
      });
    }
  }, [token, fetchBooks]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchBooks(nextPage);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bookworm Community</h1>
        <p>Discover books recommended by fellow readers</p>
      </header>

      {books.length === 0 ? (
        <div className="empty-state">
          <FaBook size={64} color="#CCCCCC" />
          <p>No books yet</p>
          <p>Be the first to share a book recommendation!</p>
        </div>
      ) : (
        <>
          <div className="book-list">
            {books.map((item) => (
              <div className="book-card" key={item._id}>
                <div className="book-header">
                  <img
                    src={item.user?.profileImage}
                    alt={item.user?.username}
                    className="avatar"
                  />
                  <span className="username">{item.user?.username}</span>
                </div>

                <div className="book-image-container">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="book-image"
                  />
                </div>

                <div className="book-details">
                  <h3 className="book-title">{item.title}</h3>
                  <div className="rating-container">
                    {[...Array(5)].map((_, i) =>
                      i < item.rating ? (
                        <FaStar key={i} color="#FFD700" />
                      ) : (
                        <FaRegStar key={i} color="#FFD700" />
                      )
                    )}
                  </div>
                  <p className="caption">{item.caption}</p>
                  <p className="date">{formatPublishDate(item.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <button onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
