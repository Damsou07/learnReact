import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./global.css";

const Header = () => {
  return (
    <header style={{ backgroundColor: "#282c34", padding: "10px", color: "white", textAlign: "center" }}>
      <h1>Gestion des utilisateurs</h1>
      <nav>
        <Link to="/">Accueil</Link> | <Link to="/add">Ajouter</Link>
      </nav>
    </header>
  );
};

const Button = ({ text, onClick }) => {
  return (
    <button 
      style={{ padding: "10px 20px", fontSize: "16px", margin: "10px", cursor: "pointer", border: "none", borderRadius: "5px", backgroundColor: "#61dafb" }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email };
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setName("");
    setEmail("");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Ajouter un utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nom" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button text="Ajouter" />
      </form>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddUser />} />
      </Routes>
    </Router>
  );
};

export default App;
