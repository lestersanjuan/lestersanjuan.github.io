// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../tools/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../tools/constants";
import { useState, useEffect } from "react";

export default function ProtectedRoute() {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  /* ---------------- token helpers ---------------- */
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (err) {
      console.log(err);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const { exp } = jwtDecode(token);
      const now = Date.now() / 1000;
      exp < now ? await refreshToken() : setIsAuthorized(true);
    } catch (err) {
      console.log(err);
      setIsAuthorized(false);
    }
  };
  /* ------------------------------------------------ */

  if (isAuthorized === null) return <div>Loading…</div>;

  // ─── render children via <Outlet /> ───
  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
}
