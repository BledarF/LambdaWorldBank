import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Logout.css";

function Logout(props) {
  const [error, setError] = useState("");
  const history = useHistory();
  const { fetchActiveSession, loggedIn } = props;

  async function deleteSession(url) {
    try {
      const deleteResponse = await fetch(url, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return deleteResponse;
    } catch (error) {
      return error;
    }
  }

  async function handleLogout() {
    const deleteSessionUrl = "http://localhost:7000/api/sessions";
    const deleteResponse = await deleteSession(deleteSessionUrl);
    const deleteJsonResponse = await deleteResponse.json();
    console.log(deleteJsonResponse);
    if (!deleteJsonResponse.status) {
      setError("Logout unSuccessful");
    } else {
      setError("");
      fetchActiveSession();
    }
  }

  return loggedIn ? (
    <Button id="logout" onClick={handleLogout}>
      Logout! <p>{error}</p>
    </Button>
  ) : null;
}

export default Logout;
