import { Link } from "react-router-dom";
import "../styles/table.css";

const API = "https://tinylink-backend-c4bk.onrender.com";

export default function LinkTable({ links, onDelete }) {
  async function deleteLink(code) {
    await fetch(`${API}/api/links/${code}`, { method: "DELETE" });
    onDelete();
  }

  if (!links.length)
    return <div className="state">No links yet</div>;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Target</th>
            <th>Clicks</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((l) => (
            <tr key={l.code}>
              <td><Link to={`/code/${l.code}`}>{l.code}</Link>
</td>
              <td>{l.target}</td>
              <td>{l.total_clicks}</td>

              <td>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(`${API}/${l.code}`)
                  }
                >
                  Copy created link
                </button>

                <button onClick={() => deleteLink(l.code)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
