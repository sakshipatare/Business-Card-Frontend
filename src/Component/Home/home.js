import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Home() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const nextId = useRef(1);

  useEffect(() => {
  const fetchInitialUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${apiUrl}/homes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        const formatted = data.map((user, index) => {
        const [firstName = "", lastName = ""] = user.name?.split(" ") || [];

        return {
          id: index + 1,
          firstName,
          lastName,
          email: user.email,
          phone: user.phone,
          companyName: user.companyName || "",
          companyNumber: user.companyNumber || "",
          companyAddress: user.companyAddress || "",
        };
      });


        setUsers(formatted);
        nextId.current = formatted.length + 1;
      } else {
        console.error("Unexpected data format from /homes:", data);
      }
    } catch (err) {
      console.error("Error loading saved users:", err);
    }
  };

  fetchInitialUsers();
}, [apiUrl]);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");

    if (email) {
      const alreadyExists = users.some(user => user.email === email);
      if (!alreadyExists) {
        fetch(`${apiUrl}/cards/email/${email}`)
          .then(res => res.json())
          .then(async (data) => {
            const newUser = {
              id: nextId.current++,
              firstName: data.Fname || "",
              lastName: data.Lname || "",
              email: data.email || "",
              phone: data.phone || "",
              companyName: data.Cname || "",
              companyNumber: data.Cnumber || "",
              companyAddress: data.Cadd || "",
              isPending: true,
            };


            setUsers(prev => [...prev, newUser]);

            const transformedData = {
              email: newUser.email,
              name: `${newUser.firstName} ${newUser.lastName}`,
              phone: newUser.phone,
              companyName: newUser.companyName,
              companyNumber: newUser.companyNumber,
              companyAddress: newUser.companyAddress,
            };


            const token = localStorage.getItem("token");

            try {
              await axios.post(`${apiUrl}/homes`, transformedData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              });
            } catch (err) {
              console.error("Failed to save scanned user:", err.response?.data || err.message);
            }
          })
          .catch(err => console.error("Error fetching scanned card data:", err));
      }
    }
  }, [apiUrl, users]);

  const filteredUsers = users.filter(user =>
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccept = async (email) => {
  const userToAccept = users.find(user => user.email === email);
  const token = localStorage.getItem("token");

  if (!userToAccept) return;

  try {
    const transformedData = {
      email: userToAccept.email,
      name: `${userToAccept.firstName} ${userToAccept.lastName}`,
      phone: userToAccept.phone,
      companyName: userToAccept.companyName,
      companyNumber: userToAccept.companyNumber,
      companyAddress: userToAccept.companyAddress,
    };

    await axios.post(`${apiUrl}/homes`, transformedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Now mark as not pending
    setUsers(prev =>
      prev.map(user =>
        user.email === email ? { ...user, isPending: false } : user
      )
    );
  } catch (err) {
    console.error("Failed to accept and save user:", err.response?.data || err.message);
  }
};


    const handleReject = async (email) => {
      const token = localStorage.getItem("token");

      try {
        await axios.delete(`${apiUrl}/homes/email/${encodeURIComponent(email)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.warn("Failed to remove from backend:", err.response?.data || err.message);
      }

      setUsers(prev => prev.filter(user => user.email !== email));
    };


  return (
    <div className="home">
      <h2>Network</h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", marginBottom: "20px", width: "300px" }}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th>
            <th>Phone</th><th>Company Name</th><th>Company Number</th><th>Company Address</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.companyName}</td>
              <td>{user.companyNumber}</td>
              <td>{user.companyAddress}</td>
              <td>
                {user.isPending ? (
                  <>
                    <button onClick={() => handleAccept(user.email)}>Accept</button>
                    <button onClick={() => handleReject(user.email)}>Reject</button>
                  </>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
