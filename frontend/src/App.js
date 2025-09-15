import { useState, useEffect } from "react";
import Login from "../../Frontend-Code/src/pages/pages/Login";
import Signup from "../../Frontend-Code/src/pages/pages/Signup";
import api from "./api";

export default function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [stores, setStores] = useState([]);

  // Login handler
  const handleLogin = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, role } = res.data;
      localStorage.setItem("token", token);
      setUser({ email, role });
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert("Login failed! Check your email/password.");
    }
  };

  // Signup handler
 const handleSignup = async (form) => {
  try {
    await api.post("/auth/signup", { ...form});
    alert("Signup successful! You can now login.");
    setShowSignup(false); 
    // switch to login page
  }
   catch (err) {
    console.error(err.response?.data || err);
    alert("Signup failed! Try again.");
  }
};


  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setStores([]);
  };

  // Fetch stores after login
  useEffect(() => {
    if (user) {
      const fetchStores = async () => {
        try {
          const res = await api.get("/stores"); 
          setStores(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchStores();
    }
  }, [user]);

  return (
    <div className="p-4">
      {!user ? (
        showSignup ? (
          <Signup onSignup={handleSignup} />
        ) : (
          <Login onLogin={handleLogin} />
        )
      ) : (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>

          <h3 className="mt-4 text-xl font-bold">Stores</h3>
          <ul>
            {stores.map((store) => (
              <li key={store.id} className="border p-2 my-2 rounded">
                <strong>{store.name}</strong> - Avg Rating: {store.avgRating || 0}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!user && (
        <div className="text-center mt-4">
          {showSignup ? (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setShowSignup(false)}
                className="text-blue-600 underline"
              >
                Login
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => setShowSignup(true)}
                className="text-blue-600 underline"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
