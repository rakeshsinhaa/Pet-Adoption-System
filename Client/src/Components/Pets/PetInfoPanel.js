import React, { useEffect, useState } from "react";

const PetInfoPanel = ({ isOpen, pet, onClose }) => {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pet || !isOpen) return;

    const fetchBreedInfo = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/breed-info?type=${pet.type}&name=${pet.name}&age=${pet.age}`
        );
        const data = await response.json();
        setInfo(data.info);
      } catch (error) {
        setInfo("Failed to load information.");
      } finally {
        setLoading(false);
      }
    };

    fetchBreedInfo();
  }, [pet, isOpen]);

  // Convert newline/bullet content to <li>
  const formatInfoAsList = (text) => {
    if (!text) return [];
    return text
      .split("\n")
      .filter(line => line.trim().length > 0)
      .map((line, index) => <li key={index}>{line.replace(/^- /, "")}</li>);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: isOpen ? "0" : "-380px",
        width: "380px",
        height: "100vh",
        background: "#ffffff",
        transition: "right 0.35s ease",
        padding: "20px",
        boxShadow: "-4px 0 15px rgba(0,0,0,0.15)",
        zIndex: 3000,
        overflowY: "auto",
        borderLeft: "1px solid #eee",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "#eee",
          border: "none",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        ✖
      </button>

      {/* Header */}
      <h2 style={{ marginTop: "40px", marginBottom: "10px" }}>Pet Information</h2>

      {/* Basic Details */}
      {pet && (
        <div
          style={{
            background: "#f9fafb",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
            border: "1px solid #eee",
          }}
        >
          <p><b>Name:</b> {pet.name}</p>
          <p><b>Type:</b> {pet.type}</p>
          <p><b>Age:</b> {pet.age}</p>
        </div>
      )}

      <hr />

      <h3 style={{ marginTop: "15px" }}>Pet Insights</h3>

      {/* Loading shimmer */}
      {loading ? (
        <div style={{ marginTop: "10px" }}>
          <div className="shimmer" style={{
            height: "12px",
            width: "90%",
            background: "linear-gradient(90deg, #eee, #ddd, #eee)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
            borderRadius: "4px",
            marginBottom: "8px"
          }}></div>
          <div className="shimmer" style={{
            height: "12px",
            width: "70%",
            background: "linear-gradient(90deg, #eee, #ddd, #eee)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
            borderRadius: "4px",
            marginBottom: "8px"
          }}></div>
        </div>
      ) : (
        <ul style={{ paddingLeft: "20px", marginTop: "10px", lineHeight: "1.6" }}>
          {formatInfoAsList(info)}
        </ul>
      )}
    </div>
  );
};

export default PetInfoPanel;
