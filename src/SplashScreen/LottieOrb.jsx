import { Lottie } from "@remotion/lottie";
import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  cancelRender,
  continueRender,
  delayRender,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

// A subtle Lottie loading/pulse animation behind the logo
const LOTTIE_URL =
  "https://lottie.host/e4814213-928a-40e0-814f-8e8688f41f62/5MMOqfRfsB.json";

export const LottieOrb = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [handle] = useState(() => delayRender("Loading Lottie animation"));
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(LOTTIE_URL)
      .then((res) => res.json())
      .then((json) => {
        setAnimationData(json);
        continueRender(handle);
      })
      .catch((err) => {
        // If Lottie fails to load, continue render without it
        console.warn("Lottie load failed, continuing without it:", err);
        continueRender(handle);
      });
  }, [handle]);

  const orbScale = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 0,
  });

  const orbOpacity = interpolate(frame, [0, 15, 60, 90], [0, 0.4, 0.4, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  if (!animationData) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: orbOpacity,
      }}
    >
      <Lottie
        animationData={animationData}
        style={{
          width: 500,
          height: 500,
          transform: `scale(${orbScale})`,
        }}
      />
    </AbsoluteFill>
  );
};
