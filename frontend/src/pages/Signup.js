import { useState } from "react";

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        className="bg-white shadow-lg rounded-2xl p-8 w-96"
        onSubmit={(e) => {
          e.preventDefault();
          onSignup(form);
        }}
      >
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Sign Up</h2>
        
        <input 
          type="text" 
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-primary"
        />

        <input 
          type="email" 
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-primary"
        />

        <textarea 
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-primary"
        />

        <input 
          type="password" 
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-primary"
        />

        <button 
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
