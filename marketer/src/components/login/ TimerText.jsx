export default function TimerText({ timer }) {
  return (
    <p className="text-center text-sm text-gray-400">
      {timer > 0 ? `Resend available in ${timer}s` : ""}
    </p>
  );
}
