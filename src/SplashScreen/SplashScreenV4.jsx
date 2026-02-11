import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Background } from "./Background";
import { NowLogoV4 } from "./NowLogoV4";

export const SplashScreenV4 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const taglineSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: Math.round(2.0 * fps),
  });
  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineSpring, [0, 1], [12, 0]);

  const taglineFadeOut = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames - 15],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <Background />

      <Sequence from={Math.round(0.1 * fps)} premountFor={fps}>
        <NowLogoV4 />
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
