"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateProfilePage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setName(profile.name || "");
      setTitle(profile.title || "");
      setAbout(profile.about || "");
    }
  }, []);

  const handleSave = () => {
    const profile = { name, title, about };
    localStorage.setItem("profile", JSON.stringify(profile));
    router.push("/jobs");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Profile</h2>
      <input
        placeholder="Name"
        className="w-full p-2 border rounded mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Desired Job Title"
        className="w-full p-2 border rounded mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="About Me"
        className="w-full p-2 border rounded mb-2"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Save Profile
      </button>
    </div>
  );
}
