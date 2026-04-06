import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/bg-mining.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center", // cuma vertical center
      }}
    >
      {/* KONTEN KIRI */}
      <div style={{ paddingLeft: "100px" }}>
        
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "900",
            color: "white",
            lineHeight: "1",
          }}
        >
          <span style={{ color: "#f59e0b" }}>DJATI</span>MINING
        </h1>

        <p style={{ color: "#d1d5db", marginTop: "10px" }}>
          Mining Equipment Maintenance System
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            marginTop: "20px",
            width: "300px",
            padding: "12px",
            background: "#f59e0b",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          SIGN IN
        </button>

      </div>
    </div>
  );
}

export default Welcome;