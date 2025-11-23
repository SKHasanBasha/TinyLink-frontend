import { Link } from "react-router-dom";

export default function Navbar() {
  const navStyle = {
    backgroundColor: "#111",
    padding: "8px 8px",
    width: "100%",
    margin: "0 auto",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    position: "sticky",
  };

  const linkStyle = {
    content:"",
    color: "#d1d5db",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
    padding: "4px 8px"
  };

  return (
    <nav style={navStyle}>
     
      <h2 style={{ margin: 5 }}>TinyLink</h2>

      {/* Dashboard Link */}
      <Link
        to="/"
        style={linkStyle}
        onMouseEnter={(e) => (e.target.style.color = "#fff")}
        onMouseLeave={(e) => (e.target.style.color = "#d1d5db")}
      >
        Dashboard
      </Link>
    </nav>
  );
}
