import React from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { SplashScreen } from "./SplashScreen";
import { SplashScreenV2 } from "./SplashScreen/SplashScreenV2";
import { SplashScreenV3 } from "./SplashScreen/SplashScreenV3";
import { SplashScreenV4 } from "./SplashScreen/SplashScreenV4";
import { SplashScreenV5 } from "./SplashScreen/SplashScreenV5";

const Label = ({ children }) => (
  <h2
    style={{
      color: "rgba(255,255,255,0.5)",
      fontFamily: "system-ui",
      fontWeight: 300,
      fontSize: 14,
      letterSpacing: 3,
      textTransform: "uppercase",
      margin: "0 0 8px",
    }}
  >
    {children}
  </h2>
);

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          color: "#fff",
          fontFamily: "system-ui",
          fontWeight: 300,
          letterSpacing: 2,
          margin: 0,
        }}
      >
        NOW Splash Screen Preview
      </h1>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Label>V1 — Spring Entrance</Label>
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

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Label>V2 — Cinematic Slam</Label>
        <Player
          component={SplashScreenV2}
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

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Label>V3 — Ripple Reveal</Label>
        <Player
          component={SplashScreenV3}
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

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Label>V4 — Line Draw</Label>
        <Player
          component={SplashScreenV4}
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

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Label>V5 — Zoom Unveil</Label>
        <Player
          component={SplashScreenV5}
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
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);
