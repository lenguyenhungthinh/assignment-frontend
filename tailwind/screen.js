const SCREENS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
};

function screenToPx(screen) {
  return `${screen}px`;
}

function screenUp(screen) {
  return { min: screenToPx(screen) };
}

function screenDown(screen) {
  return { max: screenToPx(screen - 1) };
}

export const getScreens = () => {
  return {
    xs: screenUp(SCREENS.xs),
    xsDown: screenDown(SCREENS.sm),

    sm: screenUp(SCREENS.sm),
    smDown: screenDown(SCREENS.md),

    md: screenUp(SCREENS.md),
    mdDown: screenDown(SCREENS.lg),

    lg: screenUp(SCREENS.lg),
    lgDown: screenDown(SCREENS.xl),

    xl: screenUp(SCREENS.xl),
    xlDown: screenDown(SCREENS['2xl']),

    '2xl': screenUp(SCREENS['2xl']),
    '2xlDown': screenDown(SCREENS['3xl']),

    '3xl': screenUp(SCREENS['3xl']),
  };
};
