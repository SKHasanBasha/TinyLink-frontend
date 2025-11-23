import { useState } from "react";

const API = "https://tinylink-backend-c4bk.onrender.com";

export default function AddLinkForm({ onCreate }) {
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
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ target, code })
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
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter long URL"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />

      <input
        placeholder="Custom code (optional)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>

      {msg && <div className="state">{msg}</div>}
    </form>
  );
}
