import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Background = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Subtle radial gradient pulse
  const pulseRadius = interpolate(
    frame,
    [0, durationInFrames],
    [40, 65],
    { extrapolateRight: "clamp" }
  );

  // Gentle lightness shift
  const bgLightness = interpolate(
    frame,
    [0, 1 * fps, 2 * fps],
    [97, 98, 99],
    { extrapolateRight: "clamp" }
  );

  // Particle-like floating dots
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const baseRadius = 200 + (i % 3) * 80;
    const speed = 0.3 + (i % 4) * 0.15;
    const size = 2 + (i % 3) * 1.5;

    const x = Math.cos(angle + frame * speed * 0.02) * baseRadius;
    const y = Math.sin(angle + frame * speed * 0.02) * baseRadius;

    const particleOpacity = interpolate(
      frame,
      [10 + i * 2, 20 + i * 2, durationInFrames - 20, durationInFrames],
      [0, 0.4 + (i % 3) * 0.15, 0.4 + (i % 3) * 0.15, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return { x, y, size, opacity: particleOpacity, i };
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 50%, hsl(224, 20%, ${bgLightness}%) 0%, hsl(224, 10%, ${bgLightness - 2}%) ${pulseRadius}%, #f5f6fa 100%)`,
      }}
    >
      {/* Floating particles */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {particles.map(({ x, y, size, opacity, i }) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              background: i % 3 === 0 ? "#f9a61c" : "#2d65e4",
              opacity,
              transform: `translate(${x}px, ${y}px)`,
              boxShadow: `0 0 ${size * 4}px ${i % 3 === 0 ? "rgba(249, 166, 28, 0.6)" : "rgba(45, 101, 228, 0.6)"}`,
            }}
          />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
