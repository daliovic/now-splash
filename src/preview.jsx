import React from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { SplashScreen } from "./SplashScreen";

const App = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <h1 style={{ color: "#fff", fontFamily: "system-ui", fontWeight: 300, letterSpacing: 2 }}>
        NOW Splash Screen Preview
      </h1>
      <Player
        component={SplashScreen}
        compositionWidth={1920}
        compositionHeight={1080}
        durationInFrames={120}
        fps={30}
        style={{ width: 960, height: 540, borderRadius: 8 }}
        controls
        autoPlay
        loop
      />
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);
