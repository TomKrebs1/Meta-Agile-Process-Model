import {createMuiTheme} from "@material-ui/core";
import {blueGrey} from "@material-ui/core/colors";

export default function MapTheme(paletteType) {

  return createMuiTheme({
    palette: {
      type: paletteType,
      primary: {
        main: blueGrey[700]
      },
      secondary: {
        main: blueGrey[500]
      },
    }
  });
}