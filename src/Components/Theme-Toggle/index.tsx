import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import * as S from "./styles";

export function ThemeToggle  (){
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <S.ToggleButton
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Alternar tema"
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5" />
        
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </S.ToggleButton>
  );
};