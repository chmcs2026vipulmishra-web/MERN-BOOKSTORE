import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import BookCard from "../components/BookCard";
import BookNotFound from "../components/BookNotFound";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books");
        console.log(res.data)
        setBooks(res.data);
      } catch (error) {
        toast.error("Failed to load books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-6">
        {loading && 
          <div className="text-center text-primary py-10">Loading... books</div>
        }

        {books.length === 0 && <BookNotFound />}

        {books.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} setBooks={setBooks} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
