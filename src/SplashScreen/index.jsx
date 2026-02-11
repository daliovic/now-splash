import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Background } from "./Background";
import { NowLogo } from "./NowLogo";
import { LottieOrb } from "./LottieOrb";

export const SplashScreen = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Overall fade in
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fade out at the end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Tagline entrance
  const taglineSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: Math.round(1.5 * fps),
  });
  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineSpring, [0, 1], [20, 0]);

  // Tagline fade out
  const taglineFadeOut = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames - 15],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      {/* Dark animated background */}
      <Background />

      {/* Lottie orb glow behind the logo */}
      <Sequence from={0} premountFor={fps}>
        <LottieOrb />
      </Sequence>

      {/* NOW Logo with staggered letter animations */}
      <Sequence from={Math.round(0.2 * fps)} premountFor={fps}>
        <NowLogo />
      </Sequence>

      {/* Tagline */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: taglineOpacity * taglineFadeOut,
        }}
      >
        <div
          style={{
            marginTop: 180,
            fontSize: 24,
            fontFamily:
              'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
            fontWeight: 300,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.7)",
            transform: `translateY(${taglineY}px)`,
          }}
        >
          Delivery, Now.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
