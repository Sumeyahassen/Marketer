import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = phone, 2 = OTP
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0); // for resend cooldown
  const navigate = useNavigate();

  // Auto-fill for demo (remove in production if you want)
  useEffect(() => {
    setPhone("9876543210");
  }, []);

  // Countdown timer for "Resend OTP"
  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const sendOtp = () => {
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit number");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success("OTP sent! (Use 123456 for demo)");
      setStep(2);
      setTimer(30); // 30 sec cooldown
      setLoading(false);
    }, 1200);
  };

  const verifyOtp = () => {
    if (otp === "123456") {
      localStorage.setItem("token", "fake-jwt-token-123");
      localStorage.setItem(
        "user",
        JSON.stringify({ name: "Mulalem Marketer", phone })
      );
      toast.success("Login Successful! Welcome back 👋");
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      toast.error("Wrong OTP! Use 123456 for demo");
    }
  };

  const resendOtp = () => {
    if (timer > 0) return;
    toast.success("New OTP sent! (Still 123456 😄)");
    setTimer(30);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className=" cursor-move bg-gradient-to-r from-green-600 to-emerald-600 text-white p-10 text-center">
            <div className="w-30 h-24 mx-auto mb-4 flex items-center justify-center text-6xl shadow-lg">
              Agri Prodact
            </div>
            <h1 className="text-4xl font-bold mt-4">Majet </h1>
            <p className="text-green-100 text-lg mt-2">Marketer Portal</p>
          </div>

          <div className="p-8">
            {/* Step 1: Phone */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <label className="text-lg font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="  98765 43210"
                    className=" pl-10 input input-bordered input-lg w-full mt-3 text-xl text-black font-mono tracking-wider bg-gray-300 placeholder:text-gray-900 placeholder:pl-10"
                    maxLength="10"
                    autoFocus
                  />
                </div>

                <button
                  onClick={sendOtp}
                  disabled={loading || phone.length !== 10}
                  className="btn btn-success btn-lg w-full text-gray-800 text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition bg-green-600 hover:bg-green-700"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <label className="text-lg font-semibold text-gray-700">
                    Enter OTP sent to +251 {phone}
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="1 2 3 4 5 6"
                    className="input input-bordered input-lg w-full mt-3 text-center text-3xl font-bold tracking-widest letter-spacing-4"
                    maxLength="6"
                    autoFocus
                  />
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    Demo OTP:{" "}
                    <code className="font-bold text-green-600">123456</code>
                  </p>
                </div>

                <button
                  onClick={verifyOtp}
                  disabled={otp.length !== 6}
                  className="btn  btn-lg w-full text-gray-800 text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition bg-green-600 hover:bg-green-700"
                >
                  Verify & Login
                </button>

                <div className="text-center">
                  <button
                    onClick={() => setStep(1)}
                    className="text-gray-600 hover:text-gray-800 underline"
                  >
                    Change Number
                  </button>
                  <span className="mx-3 text-gray-400">|</span>
                  <button
                    onClick={resendOtp}
                    disabled={timer > 0}
                    className={`font-medium ${
                      timer > 0
                        ? "text-gray-400"
                        : "text-green-600 hover:text-green-700"
                    }`}
                  >
                    {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                  </button>
                </div>
              </div>
            )}

            <p className="text-center text-xs text-gray-500 mt-10">
              By logging in, you agree to our{" "}
              <span className="text-green-600 underline cursor-pointer">
                Terms
              </span>{" "}
              &{" "}
              <span className="text-green-600 underline cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>

      <Toaster position="top-center" />
    </>
  );
}

// Optional: Add this to your index.css for animation
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}
*/
