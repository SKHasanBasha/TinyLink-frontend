import { useState } from "react";
import "../styles/Card.css";


const API = "http://localhost:4000";

export default function AddLinkFormCard({ onCreate }) {
  const [target, setTarget] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error);
      } else {
        setMsg("Created: " + data.shortUrl);
        setTarget("");
        setCode("");
        onCreate();
      }
    } catch {
      setMsg("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="card-container">
      <div className="card">
        <h3>Shorten Your URL</h3>
        <p className="card-subtitle">Paste your long URL and get a tiny link instantly.</p>

        <form onSubmit={handleSubmit} className="card-form">
          <input
            type="text"
            placeholder="Enter your long URL"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />

          <input
            type="text"
            placeholder="Custom short code (optional)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button disabled={loading} className="btn-create">
            {loading ? "Creating..." : "Create TinyLink"}
          </button>
        </form>

        {msg && <div className="response-msg">{msg}</div>}
      </div>
    </div>
  );
}
