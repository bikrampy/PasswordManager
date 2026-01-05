import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [site, setSite] = useState("");
  const [savedPasswords, setSavedPasswords] = useState([]);

  const generatePassword = () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }
    setPassword(pass);
  };

  const savePassword = () => {
    if (!site || !password) return;
    const newEntry = {
      id: Date.now(),
      site,
      password,
    };
    const updated = [...savedPasswords, newEntry];
    setSavedPasswords(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
    setSite("");
  };

  const copySavedPassword = (password) => {
    navigator.clipboard.writeText(password);
  };

  const deleteSavedPassword = (id) => {
    const filtered = savedPasswords.filter((item) => item.id !== id);
    setSavedPasswords(filtered);
    localStorage.setItem("passwords", JSON.stringify(filtered));
  };

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("passwords"));
    if (stored) setSavedPasswords(stored);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 px-4">
      <nav className="flex gap-8 justify-center py-6 text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-orange-400 font-semibold"
              : "text-gray-300 hover:text-white"
          }
        >
          Generate
        </NavLink>

        <NavLink
          to="/saved"
          className={({ isActive }) =>
            isActive
              ? "text-orange-400 font-semibold"
              : "text-gray-300 hover:text-white"
          }
        >
          Saved
        </NavLink>
      </nav>
      <Outlet
        context={{
          length,
          setLength,
          numberAllowed,
          setNumberAllowed,
          charAllowed,
          setCharAllowed,
          password,
          site,
          setSite,
          generatePassword,
          savePassword,
          savedPasswords,
          copySavedPassword,
          deleteSavedPassword,
        }}
      />
    </div>
  );
}

export default App;