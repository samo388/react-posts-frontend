export function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-primary text-white hover:bg-primary/90",
    ghost: "hover:bg-accent",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
