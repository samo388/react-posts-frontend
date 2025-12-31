import { useState } from "react";
import api from "../../api/axios";
import { Button } from "./Button";
import  Input  from "./Input";

export function PostForm({ onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await api.post("/posts", { title, body: content });

    setLoading(false);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-card w-full max-w-md rounded-xl p-6 space-y-4 animate-fade"
      >
        <h2 className="text-xl font-semibold">Create New Post</h2>

        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div>
          <label className="block mb-1">Content</label>
          <textarea
            className="w-full rounded-lg border p-3"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={loading}>
            {loading ? "Saving..." : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
