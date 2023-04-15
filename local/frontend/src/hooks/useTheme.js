import { useSearchParams } from "react-router-dom";

const useTheme = () => {
  const [searchParams] = useSearchParams();
  const themeParam = searchParams.get("theme");

  const THEMES = {
    CODING: "coding",
    AFTERDARK: "afterdark"
  }

  return {
    isAfterDark: themeParam === THEMES.AFTERDARK,
    isCoding: themeParam === THEMES.CODING
  };
};

export default useTheme;
