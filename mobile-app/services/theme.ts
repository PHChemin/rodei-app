import { createTheme } from "@rneui/themed";
import { TextStyle } from "react-native";

//-------------------------------------------------------- Theme Constants

export const COLORS = {
  BACKGROUND: "#f8f8fb",
  PRIMARY: "#5082f5",
  SECONDARY: "#01a88d",
};

export const DEFAULT_RADIUS = 24;
export const DEFAULT_PADDING = 16;

const HEADINGS_RATIO = 1.067; // https://typescale.com/
const HEADINGS_BODY = 15; //RN default
const HEADINGS_LINE_HEIGHT_MULTIPLIER = 1.6;

//-------------------------------------------------------- Theme Helpers

const calcHeadingSize = (h: number) => {
  let headingSize = HEADINGS_BODY;
  for (let i = 0; i < 7 - h; i++) {
    headingSize *= HEADINGS_RATIO;
  }
  return headingSize;
};

const headingDefaults: TextStyle = {
  fontWeight: "bold",
  marginBottom: 16, //1rem
  marginTop: 36, //2.25rem
};

export const defaultShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,

  elevation: 3,
};

//-------------------------------------------------------- Theme

const theme = createTheme({
  lightColors: {
    primary: COLORS.PRIMARY,
    secondary: COLORS.SECONDARY,
  },
  components: {
    Button: {
      containerStyle: {
        borderRadius: DEFAULT_RADIUS,
      },
    },
    Text: {
      h1Style: {
        fontSize: calcHeadingSize(1),
        lineHeight: calcHeadingSize(1) * HEADINGS_LINE_HEIGHT_MULTIPLIER,
        ...headingDefaults,
      },
      h2Style: {
        fontSize: calcHeadingSize(2),
        fontWeight: "bold",
        lineHeight: calcHeadingSize(2) * HEADINGS_LINE_HEIGHT_MULTIPLIER,
        ...headingDefaults,
      },
      h3Style: {
        fontSize: calcHeadingSize(3),
        fontWeight: "bold",
        lineHeight: calcHeadingSize(3) * HEADINGS_LINE_HEIGHT_MULTIPLIER,
        ...headingDefaults,
      },
      h4Style: {
        fontSize: calcHeadingSize(4),
        fontWeight: "bold",
        lineHeight: calcHeadingSize(4) * HEADINGS_LINE_HEIGHT_MULTIPLIER,
        ...headingDefaults,
      },
      style: {
        fontSize: HEADINGS_BODY,
        lineHeight: HEADINGS_BODY * HEADINGS_LINE_HEIGHT_MULTIPLIER,
      },
    },
    Card: {
      containerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: "transparent",
        borderColor: "transparent",
        padding: 0,
        margin: 0,
      },
      wrapperStyle: {
        backgroundColor: "white",
        borderWidth: 0,
        borderRadius: DEFAULT_RADIUS,
        margin: 0,
        padding: DEFAULT_PADDING,
        ...defaultShadow,
      },
    },
  },
  mode: "light",
});

export default theme;
