import { Pencil, Trash } from "lucide-react";
import api from "../../api/axios";
import { Button } from "./Button";

export function PostCard({ post, onDelete }) {
  const remove = async () => {
    if (!confirm("Delete this post?")) return;
    await api.delete(`/posts/${post.id}`);
    onDelete();
  };

  return (
    <div className="bg-card rounded-xl p-5 border hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
      <p className="text-muted-foreground line-clamp-3">{post.body}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-muted-foreground">
          {new Date(post.created_at).toLocaleDateString()}
        </span>

        <div className="flex gap-2">
          <Button variant="ghost">
            <Pencil size={16} />
          </Button>
          <Button variant="danger" onClick={remove}>
            <Trash size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
