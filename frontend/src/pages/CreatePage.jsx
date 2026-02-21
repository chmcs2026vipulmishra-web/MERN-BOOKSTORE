import api from "../lib/axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router"; 

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/books", {
        title,
        author,
        publishYear: Number(publishYear),
      });

      toast.success("Book created successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" /> Back to books
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Book</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label" htmlFor="title">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter book title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label" htmlFor="author">
                    <span className="label-text">Author</span>
                  </label>
                  <input
                    id="author"
                    type="text"
                    placeholder="Enter book author"
                    className="input input-bordered"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label" htmlFor="publishYear">
                    <span className="label-text">Year of publishing</span>
                  </label>
                  <input
                    id="publishYear"
                    type="number"
                    placeholder="e.g. 2025"
                    className="input input-bordered"
                    value={publishYear}
                    onChange={(e) => setPublishYear(e.target.value)}
                    required
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Book"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
