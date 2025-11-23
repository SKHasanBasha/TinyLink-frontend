import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/stats.css";


const API = "http://localhost:4000";

export default function Stats() {
  const { code } = useParams();
  const [data, setData] = useState(null);

  async function loadStats() {
    const res = await fetch(`${API}/api/links/${code}`);
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    loadStats();
  }, [code]);

  if (!data) return <div className="state">Loading...</div>;

  return (
    <div className="stats-container">
      <div className="stats-card">
        <div className="stats-header">
          <h2>Stats for {code}</h2>
        </div>

        <div className="stats-row">
          <div className="stats-label">Target</div>
          <div className="stats-value">
            <a href={data.target} target="_blank" rel="noreferrer">
              {data.target}
            </a>
          </div>
        </div>

        <div className="stats-row">
          <div className="stats-label">Total Clicks</div>
          <div className="stats-value">{data.total_clicks}</div>
        </div>

        <div className="stats-row">
          <div className="stats-label">Last Clicked</div>
          <div className="stats-value">{data.last_clicked || "-"}</div>
        </div>

        <div className="stats-row">
          <div className="stats-label">Created At</div>
          <div className="stats-value">{data.created_at}</div>
        </div>
      </div>
    </div>
  );
}
