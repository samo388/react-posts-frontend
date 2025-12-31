import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/useAuth";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState(null);
  const { user, logout } = useAuth();

  // Fetch posts (يدعم pagination أو array مباشر)
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");

      // لو Laravel بيرجع pagination
      if (Array.isArray(res.data?.data)) {
        setPosts(res.data.data);
      }
      // لو بيرجع array مباشر
      else if (Array.isArray(res.data)) {
        setPosts(res.data);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error("Fetch posts error:", err);
      setPosts([]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/posts/${editingId}`, { title, body });
        setEditingId(null);
      } else {
        await api.post("/posts", { title, body });
      }

      setTitle("");
      setBody("");
      fetchPosts();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const editPost = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setBody(post.body);
  };

  const deletePost = async (id) => {
    if (!confirm("Delete this post?")) return;

    try {
      await api.delete(`/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 700, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Welcome {user?.name}</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* Form */}
      <div style={{ marginTop: 20 }}>
        <h3>{editingId ? "Edit Post" : "New Post"}</h3>

        <form onSubmit={submit}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 10 }}
          />

          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 10 }}
          />

          <button>{editingId ? "Update" : "Create"}</button>
        </form>
      </div>

      {/* Posts List */}
      <div style={{ marginTop: 30 }}>
        {Array.isArray(posts) && posts.length === 0 && (
          <p>No posts yet.</p>
        )}

        {Array.isArray(posts) &&
          posts.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ccc",
                padding: 15,
                marginBottom: 15,
              }}
            >
              <h3>{post.title}</h3>
              <p>{post.body}</p>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => editPost(post)}>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
