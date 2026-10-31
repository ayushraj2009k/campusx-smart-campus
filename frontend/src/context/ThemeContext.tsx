import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UIMode = 'bharat' | 'liquid_glass';
export type Appearance = 'dark' | 'light' | 'system';
export type ColorTheme = 'bharat_saffron' | 'cyber_nexus';
export type Typography = 'tech_sans' | 'classic_serif';

interface ThemeContextType {
  uiMode: UIMode;
  appearance: Appearance;
  effectiveAppearance: 'dark' | 'light';
  colorTheme: ColorTheme;
  typography: Typography;
  isAppearanceModalOpen: boolean;
  setUiMode: (mode: UIMode) => void;
  setAppearance: (appearance: Appearance) => void;
  setColorTheme: (theme: ColorTheme) => void;
  setTypography: (typography: Typography) => void;
  openAppearanceModal: () => void;
  closeAppearanceModal: () => void;
  completeFirstTimeSetup: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uiMode, setUiModeState] = useState<UIMode>(() => {
    return (localStorage.getItem('campusx_ui_mode') as UIMode) || 'bharat';
  });

  const [appearance, setAppearanceState] = useState<Appearance>(() => {
    return (localStorage.getItem('campusx_appearance') as Appearance) || 'dark';
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    return (localStorage.getItem('campusx_color_theme') as ColorTheme) || 'bharat_saffron';
  });

  const [typography, setTypographyState] = useState<Typography>(() => {
    return (localStorage.getItem('campusx_typography') as Typography) || 'tech_sans';
  });

  // First time prompt opens automatically if not configured yet
  const [isAppearanceModalOpen, setIsAppearanceModalOpen] = useState<boolean>(() => {
    return !localStorage.getItem('campusx_appearance_configured');
  });

  // Calculate effective appearance (dark / light)
  const getSystemTheme = (): 'dark' | 'light' => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>(getSystemTheme());

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const effectiveAppearance: 'dark' | 'light' = appearance === 'system' ? systemTheme : appearance;

  // Sync to DOM root and localStorage
  useEffect(() => {
    const root = document.documentElement;

    // Appearance class
    if (effectiveAppearance === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Data attributes for comprehensive styling hooks
    root.setAttribute('data-ui-mode', uiMode);
    root.setAttribute('data-color-theme', colorTheme);
    root.setAttribute('data-typography', typography);
    root.setAttribute('data-appearance', effectiveAppearance);

    // Save to localStorage
    localStorage.setItem('campusx_ui_mode', uiMode);
    localStorage.setItem('campusx_appearance', appearance);
    localStorage.setItem('campusx_theme', effectiveAppearance);
    localStorage.setItem('campusx_color_theme', colorTheme);
    localStorage.setItem('campusx_typography', typography);
  }, [uiMode, appearance, effectiveAppearance, colorTheme, typography]);

  const setUiMode = (mode: UIMode) => {
    setUiModeState(mode);
    // If switching to bharat, default to saffron theme; if switching to liquid glass, default to cyber nexus
    if (mode === 'bharat' && colorTheme === 'cyber_nexus') {
      setColorThemeState('bharat_saffron');
    } else if (mode === 'liquid_glass' && colorTheme === 'bharat_saffron') {
      setColorThemeState('cyber_nexus');
    }
  };

  const setAppearance = (app: Appearance) => {
    setAppearanceState(app);
  };

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
  };

  const setTypography = (typo: Typography) => {
    setTypographyState(typo);
  };

  const openAppearanceModal = () => setIsAppearanceModalOpen(true);
  const closeAppearanceModal = () => setIsAppearanceModalOpen(false);

  const completeFirstTimeSetup = () => {
    localStorage.setItem('campusx_appearance_configured', 'true');
    setIsAppearanceModalOpen(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        uiMode,
        appearance,
        effectiveAppearance,
        colorTheme,
        typography,
        isAppearanceModalOpen,
        setUiMode,
        setAppearance,
        setColorTheme,
        setTypography,
        openAppearanceModal,
        closeAppearanceModal,
        completeFirstTimeSetup,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
