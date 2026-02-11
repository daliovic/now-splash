import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Background } from "./Background";
import { NowLogoV5 } from "./NowLogoV5";

export const SplashScreenV5 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const taglineSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: Math.round(2.2 * fps),
  });
  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineSpring, [0, 1], [10, 0]);

  const taglineFadeOut = interpolate(
    frame,
    [durationInFrames - 28, durationInFrames - 12],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <Background />

      <Sequence from={0} premountFor={fps}>
        <NowLogoV5 />
      </Sequence>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: taglineOpacity * taglineFadeOut,
        }}
      >
        <div
          style={{
            marginTop: 190,
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
