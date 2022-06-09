import React, { useState } from "react";
import { logout, useAuth } from "../firebase";

export default function Logout() {
  const [loading, setLoading] = useState(false);

  const currentUser = useAuth();

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }
  return (
    <div className="logout-card-containers">
      <div className="logout-cards">
        <div>Currently logged in as: {currentUser?.email}</div>
        <button disabled={loading || !currentUser} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
