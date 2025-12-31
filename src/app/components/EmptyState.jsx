export default function EmptyState() {
  return (
    <div className="h-64 flex flex-col justify-center items-center border border-dashed rounded-xl">
      <p className="text-lg font-medium">No posts yet</p>
      <p className="text-muted-foreground text-sm">
        Click “New Post” to create your first one 🚀
      </p>
    </div>
  );
}