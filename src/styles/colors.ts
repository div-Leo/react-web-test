 
export enum Colors {
  WHITE = '#ffffff',
  BLACK = '#000000',
  GRAY_800 = '#36424a',
  GRAY_600 = '#6e7a83',
  GRAY_400 = '#b6babd',
  GRAY_300 = '#e2e4e5',
  GRAY_200 = '#f1f1f1',
  GRAY_100 = '#fafafa',
  ERROR_800 = '#ff9944',
  ERROR_600 = '#fbb86d',
  ERROR_400 = '#fac496',
  ACCENT_800 = '#3d6eff',
  ACCENT_600 = '#1d4acd',
  ACCENT_400 = '#012aa3',
  TRANSPARENT = 'transparent',
}

export const SemanticColors = {
  text: {
    primary: Colors.GRAY_800,
    secondary: Colors.GRAY_600,
    weak: Colors.GRAY_400,
    link: Colors.ACCENT_400,
    linkHover: Colors.ACCENT_600
  },
  background: {
    primary: Colors.WHITE,
    secondary: Colors.GRAY_100,
    inverted: Colors.GRAY_800
  },
  icon: {
    primary: Colors.GRAY_800,
    secondary: Colors.GRAY_400,
    inverted: Colors.WHITE
  },
  border: {
    primary: Colors.GRAY_300,
    secondary: Colors.GRAY_600,
    highlight: Colors.ERROR_600
  },
  button: {
    primary: {
      text: Colors.WHITE,
      background: Colors.ACCENT_600,
      
      textHover: Colors.WHITE,
      backgroundHover: Colors.ACCENT_800,

      textInverted: Colors.WHITE,
      backgroundInverted: Colors.ERROR_600,

      textHoverInverted: Colors.WHITE,
      backgroundHoverInverted: Colors.ERROR_800
    },
    secondary: {
      text: Colors.GRAY_600,
      background: Colors.WHITE,
      border: Colors.GRAY_300,

      textHover: Colors.GRAY_800,
      backgroundHover: Colors.WHITE,
      borderHover: Colors.GRAY_400,

      textInverted: Colors.GRAY_600,
      backgroundInverted: Colors.GRAY_400,
      borderInverted: Colors.GRAY_400,

      textHoverInverted: Colors.GRAY_800,
      backgroundHoverInverted: Colors.GRAY_400,
      borderHoverInverted: Colors.GRAY_400
    }
  },
  tabBar: {
    active: Colors.ACCENT_400,
    default: Colors.GRAY_600,
    hover: Colors.ACCENT_800
  },
  label: {
    text: Colors.WHITE,
    primary: Colors.ACCENT_600,
    secondary: Colors.ERROR_400
  },
  toggle: {
    enabled: {
      background: Colors.GRAY_200,
      before: Colors.WHITE, 
      after: Colors.ACCENT_600
    },
    disabled: {
      background: Colors.GRAY_400,
      before: Colors.GRAY_100,
      after: Colors.ACCENT_400
    },
  },
  select: {
    text: {
      primary: Colors.GRAY_800,
      secondary: Colors.GRAY_600,
      highlighted: Colors.ACCENT_600,
      disabled: Colors.GRAY_300,
      error: Colors.ERROR_600
    },
    background: {
      primary: Colors.GRAY_100
    },
    border: {
      primary: Colors.GRAY_600,
      highlighted: Colors.ACCENT_600,
      disabled: Colors.GRAY_300,
      error: Colors.ERROR_600
    }
  },
  spinner: {
    primary: Colors.ACCENT_800,
  },
  input: {
    text: {
      primary: Colors.GRAY_800,
      secondary: Colors.GRAY_600,
      highlighted: Colors.ACCENT_600,
      disabled: Colors.GRAY_300,
      error: Colors.ERROR_600
    },
    background: {
      primary: Colors.GRAY_100
    },
    border: {
      primary: Colors.GRAY_600,
      highlighted: Colors.ACCENT_600,
      disabled: Colors.GRAY_300,
      error: Colors.ERROR_600
    }
  },
  checkbox: {
    text: {
      primary: Colors.GRAY_800,
      highlighted: Colors.ACCENT_600,
      disabled: Colors.GRAY_300,
      error: Colors.ERROR_600
    },
    background: {
      default: Colors.GRAY_100,
      hover: Colors.GRAY_300,
      highlighted: Colors.ACCENT_600,
      disabled: Colors.GRAY_300
    },
    border: {
      default: Colors.GRAY_600,
      highlighted: Colors.TRANSPARENT,
      disabled: Colors.TRANSPARENT,
      error: Colors.ERROR_600
    }
  }
};
