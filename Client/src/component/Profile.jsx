import { useEffect, useState } from "react";
import "../style/Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://server-backend-bkbu.onrender.com/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email,
        });
      });
  }, []);

  // handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // update profile
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    setUser(data.user);
    setEdit(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Profile</h1>

        {!edit ? (
          <>
            <p>
              <b>Name:</b> {user?.name}
            </p>
            <p>
              <b>Email:</b> {user?.email}
            </p>

            <button onClick={() => setEdit(true)}>Edit</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <>
            <input name="name" value={formData.name} onChange={handleChange} />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <button onClick={handleUpdate}>Save</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
