import Theme from "./useTheme";
import { Sun, Moon } from "lucide-react";

function TogleButton() {
    const {theme,toggle}=Theme();
  return (
   <button onClick={toggle} className="p-2 rounded-full">
      {theme === "light" ? (
        <Moon size={22} />
      ) : (
        <Sun size={22} />
      )}
    </button>
  );
}

export default TogleButton
