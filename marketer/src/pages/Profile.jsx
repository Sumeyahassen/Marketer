import { useNavigate } from "react-router-dom";
import { User, Phone, MapPin, Banknote, LogOut } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-700 text-white py-8 px-8 text-center">
        <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-6xl text-green-700">
          R
        </div>
        <h1 className="text-3xl font-bold">Ramesh Marketer</h1>
        <p className="text-green-100">Marketer ID: MKT-7890</p>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <User size={24} className="text-green-600" />
              <input
                className="input input-bordered flex-1"
                value="Ramesh Kumar"
              />
            </div>
            <div className="flex items-center gap-4">
              <Phone size={24} className="text-green-600" />
              <input
                className="input input-bordered flex-1"
                value="+91 98765 43210"
              />
            </div>
            <div className="flex items-center gap-4">
              <MapPin size={24} className="text-green-600" />
              <input
                className="input input-bordered flex-1"
                value="Hisar, Haryana"
              />
            </div>
          </div>
          <button className="btn btn-success mt-6 w-full">
            Update Profile
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Bank Details</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Banknote size={24} className="text-green-600" />
              <input
                className="input input-bordered flex-1"
                placeholder="Account Number"
              />
            </div>
            <input
              className="input input-bordered w-full"
              placeholder="IFSC Code"
            />
          </div>
          <button className="btn btn-outline btn-success mt-6 w-full">
            Save Bank Details
          </button>
        </div>

        <button
          onClick={logout}
          className="btn btn-error btn-lg w-full flex items-center justify-center gap-3"
        >
          <LogOut size={24} /> Logout
        </button>
      </div>
    </div>
  );
}
