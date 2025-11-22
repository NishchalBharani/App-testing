export default function Layout({ children }) {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem 1rem",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {children}
    </div>
  );
}
