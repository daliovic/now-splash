import "./index.css";
import { Composition, Folder } from "remotion";
import { SplashScreen } from "./SplashScreen";
import { SplashScreenV2 } from "./SplashScreen/SplashScreenV2";
import { SplashScreenV3 } from "./SplashScreen/SplashScreenV3";
import { SplashScreenV4 } from "./SplashScreen/SplashScreenV4";
import { SplashScreenV5 } from "./SplashScreen/SplashScreenV5";

const COMP_PROPS = {
  durationInFrames: 120,
  fps: 30,
  width: 1920,
  height: 1080,
};

export const RemotionRoot = () => {
  return (
    <Folder name="Splash-Screens">
      <Composition id="SplashScreen" component={SplashScreen} {...COMP_PROPS} />
      <Composition id="SplashScreenV2" component={SplashScreenV2} {...COMP_PROPS} />
      <Composition id="SplashScreenV3" component={SplashScreenV3} {...COMP_PROPS} />
      <Composition id="SplashScreenV4" component={SplashScreenV4} {...COMP_PROPS} />
      <Composition id="SplashScreenV5" component={SplashScreenV5} {...COMP_PROPS} />
    </Folder>
  );
};
