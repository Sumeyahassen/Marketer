export default function OtpStep({ phone, otp, setOtp, verifyOtp, timer, resendOtp, setStep }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <label className="text-lg font-semibold text-gray-700">
          Enter OTP sent to +251 {phone}
        </label>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="1 2 3 4 5 6"
          maxLength="6"
          className="input input-bordered input-lg w-full mt-3 text-center text-3xl font-bold"
        />

        <p className="text-sm text-gray-500 mt-3 text-center">
          Demo OTP: <code className="font-bold text-green-600">123456</code>
        </p>
      </div>

      <button
        onClick={verifyOtp}
        disabled={otp.length !== 6}
        className="btn btn-lg w-full text-xl bg-green-600 hover:bg-green-700"
      >
        Verify & Login
      </button>

      <div className="text-center">
        <button onClick={() => setStep(1)} className="underline text-gray-600">
          Change Number
        </button>

        <span className="mx-3 text-gray-400">|</span>

        <button
          onClick={resendOtp}
          disabled={timer > 0}
          className={timer > 0 ? "text-gray-400" : "text-green-600"}
        >
          {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}
