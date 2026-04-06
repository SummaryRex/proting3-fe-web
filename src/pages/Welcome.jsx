import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/bg-mining.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex items-center justify-center p-4"
    >
      <div className="text-center max-w-2xl">
        {/* Judul dengan dua warna */}
        <h1 className="text-white text-6xl md:text-8xl font-black tracking-tight leading-none uppercase">
          <span className="text-[#F2A900]">DJATI</span>MINING
        </h1>

        {/* Subtitle */}
        <p className="text-white text-xl md:text-2xl mt-4 font-medium">
          Mining Equipment Maintenance System
        </p>

        {/* Tombol Sign In */}
        <button 
          onClick={() => navigate("/login")} // Sesuaikan route jika diperlukan
          className="mt-8 w-full md:w-auto min-w-[300px] py-4 bg-[#F2A900] hover:bg-[#d49400] text-black font-bold text-lg rounded-md transition-colors duration-300 uppercase shadow-lg"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Welcome;