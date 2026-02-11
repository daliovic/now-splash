import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Background } from "./Background";
import { NowLogoV2 } from "./NowLogoV2";
import { LottieOrb } from "./LottieOrb";

export const SplashScreenV2 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Overall fade in
  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fade out at the end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Tagline - slides up from below
  const taglineSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
    delay: Math.round(1.8 * fps),
  });
  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineSpring, [0, 1], [30, 0]);

  // Tagline fade out
  const taglineFadeOut = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 10],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <Background />

      <Sequence from={0} premountFor={fps}>
        <LottieOrb />
      </Sequence>

      <Sequence from={Math.round(0.15 * fps)} premountFor={fps}>
        <NowLogoV2 />
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
            color: "rgba(0, 0, 0, 0.45)",
            transform: `translateY(${taglineY}px)`,
          }}
        >
          Delivery, Now.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
