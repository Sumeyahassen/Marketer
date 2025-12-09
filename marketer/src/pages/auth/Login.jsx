import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import LoginHeader from "../../components/login/LoginHeader";
import PhoneStep from "../../components/login/PhoneStep";
import OtpStep from "../../components/login/ OtpStep";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setPhone("9876543210");
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer((v) => v - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const sendOtp = () => {
    if (!/^\d{10}$/.test(phone)) return toast.error("Invalid number");

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setTimer(30);
      toast.success("OTP sent");
    }, 1000);
  };

  const verifyOtp = () => {
    if (otp !== "123456") return toast.error("Wrong OTP");

    localStorage.setItem("token", "fake-jwt-token-123");
    localStorage.setItem("user", JSON.stringify({ name: "User", phone }));

    toast.success("Login successful!");

    setTimeout(() => navigate("/dashboard"), 1000);
  };

  const resendOtp = () => {
    if (timer > 0) return;
    setTimer(30);
    toast.success("New OTP sent");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

          <LoginHeader />

          <div className="p-8">
            {step === 1 && (
              <PhoneStep
                phone={phone}
                setPhone={setPhone}
                sendOtp={sendOtp}
                loading={loading}
              />
            )}

            {step === 2 && (
              <OtpStep
                phone={phone}
                otp={otp}
                setOtp={setOtp}
                verifyOtp={verifyOtp}
                resendOtp={resendOtp}
                timer={timer}
                setStep={setStep}
              />
            )}
          </div>
        </div>
      </div>

      <Toaster position="top-center" />
    </>
  );
}
