import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

import logo from "../assets/tbrainai-logo.png";

function Navbar() {

  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log("Login Error:", error);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (

    <div className="navbar bg-base-300 border-b px-4">

      {/* LOGO + NAME */}

      <div className="flex-1 flex items-center gap-2">

        <img
          src={logo}
          alt="TBrainAI"
          className="w-8 h-8"
        />

        <span className="text-xl font-bold">
          TBrainAI
        </span>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center gap-3">

        {/* THEME TOGGLE */}

        <button
          className="btn btn-sm btn-ghost"
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* USER MENU */}

        <div className="dropdown dropdown-end">

          <div tabIndex={0} className="avatar cursor-pointer">

            <div className="w-8 rounded-full">

              {user ? (

                <img src={user.photoURL} />

              ) : (

                <div className="bg-neutral text-neutral-content flex items-center justify-center w-8 h-8 rounded-full">
                  T
                </div>

              )}

            </div>

          </div>

          <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">

            {user ? (
              <>
                <li className="font-bold px-2">{user.displayName}</li>
                <li><button onClick={logout}>Logout</button></li>
              </>
            ) : (
              <li>
                <button onClick={login}>Login with Google</button>
              </li>
            )}

          </ul>

        </div>

      </div>

    </div>

  );
}

export default Navbar;