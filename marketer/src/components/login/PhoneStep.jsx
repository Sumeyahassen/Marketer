export default function PhoneStep({ phone, setPhone, sendOtp, loading }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <label className="text-lg font-semibold text-gray-700">Phone Number</label>

        <input
          type="tel"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          placeholder="98765 43210"
          className="pl-10 input input-bordered input-lg w-full mt-3 text-xl text-black bg-gray-300"
          maxLength="10"
        />
      </div>

      <button
        onClick={sendOtp}
        disabled={loading || phone.length !== 10}
        className="btn btn-success btn-lg w-full text-xl bg-green-600 hover:bg-green-700"
      >
        {loading ? <span className="loading loading-spinner"></span> : "Send OTP"}
      </button>
    </div>
  );
}
