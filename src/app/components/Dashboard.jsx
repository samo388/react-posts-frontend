import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Button } from "./Button";
import { PostCard } from "./PostCard";
import { PostForm } from "./PostForm";
import EmptyState from "./EmptyState";
import { useAuth } from "../../context/AuthContext";



export default function Dashboard() {
  const { logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await api.get("/posts");
    setPosts(res.data.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Posts</h1>
          <p className="text-muted-foreground">
            Create, edit and manage your content
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => setShowForm(true)}>+ New Post</Button>
          <Button variant="ghost" onClick={logout}>Logout</Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-3">
          {loading ? (
            <p className="text-muted-foreground">Loading posts...</p>
          ) : posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={fetchPosts}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <PostForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            fetchPosts();
          }}
        />
      )}
    </div>
  );
}
