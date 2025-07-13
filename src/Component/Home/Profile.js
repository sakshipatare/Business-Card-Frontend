import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [cardData, setCardData] = useState({
    Fname: "",
    Lname: "",
    email: "",
    phone: "",
    Cname: "",
    Cnumber: "",
    Cadd: "",
  });
  const [isCardAdded, setIsCardAdded] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        const [first, last] = parsedUser.name?.split(" ") || ["", ""];
        setCardData((prev) => ({
          ...prev,
          Fname: first,
          Lname: last,
          email: parsedUser.email,
        }));

        // Fetch card data if already added
      fetch(`http://localhost:4000/cards/email/${parsedUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.email) {
            setCardData({
              id: data.id,
              Fname: data.Fname,
              Lname: data.Lname,
              email: data.email,
              phone: data.phone,
              Cname: data.Cname,
              Cnumber: data.Cnumber,
              Cadd: data.Cadd,
            });
            setIsCardAdded(true);
            setIsEditing(false);
          }
        })
        .catch((err) => {
          console.error("No existing card:", err);
        });
      } catch (err) {
        console.error("Invalid JSON in localStorage:", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/cards/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Card added successfully!");
        setIsCardAdded(true);
        setIsEditing(false);

        // Get the returned card ID from backend
        setCardData(prev => ({
          ...prev,
          id: result.id   // ⬅ Save this for update
        }));

      } else {
        alert(result.message || "Failed to add card info.");
      }
    } catch (err) {
      console.error("Error adding card:", err);
      alert("Something went wrong. Try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/cards/${cardData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Card updated successfully!");
        setIsEditing(false);
      } else {
        alert(result.message || "Failed to update card info.");
      }
    } catch (err) {
      console.error("Error updating card:", err);
      alert("Something went wrong. Try again.");
    }
  };

  if (!user) return <p>No user data found. Please login again.</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile Form</h2>
        <form onSubmit={isCardAdded ? handleUpdate : handleAdd}>
          <label>First Name:</label>
          <input
            type="text"
            name="Fname"
            value={cardData.Fname}
            onChange={handleChange}
            readOnly
          />

          <label>Last Name:</label>
          <input
            type="text"
            name="Lname"
            value={cardData.Lname}
            onChange={handleChange}
            readOnly
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={cardData.email}
            onChange={handleChange}
            readOnly={!isEditing}
          />

          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={cardData.phone}
            onChange={handleChange}
            placeholder="e.g. +91 1234567890"
            readOnly={!isEditing}
            required
          />

          <label>Company Name:</label>
          <input
            type="text"
            name="Cname"
            value={cardData.Cname}
            onChange={handleChange}
            readOnly={!isEditing}
            required
          />

          <label>Company Phone:</label>
          <input
            type="tel"
            name="Cnumber"
            value={cardData.Cnumber}
            onChange={handleChange}
            readOnly={!isEditing}
            required
          />

          <label>Company Address:</label>
          <input
            type="text"
            name="Cadd"
            value={cardData.Cadd}
            onChange={handleChange}
            readOnly={!isEditing}
            required
          />

          <div className="profile-buttons">
            <button type="submit">
              {isCardAdded ? "Update Info" : "Add Info"}
            </button>

            {isCardAdded && !isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="edit-btn"
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
