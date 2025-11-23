import { useEffect, useState } from "react";
import AddLinkFormCard from "../components/AddLinkFormCard";
import LinkTable from "../components/LinkTable";

const API = "http://localhost:4000";

export default function Dashboard() {
  const [links, setLinks] = useState([]);

  async function loadLinks() {
    const res = await fetch(`${API}/api/links`);
    const data = await res.json();
    setLinks(data);
  }

  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px", marginTop: "40px" }}>
        Welcome to TinyLink
      </h2>

      <AddLinkFormCard onCreate={loadLinks} />

      <LinkTable links={links} onDelete={loadLinks} />
    </>
  );
}
