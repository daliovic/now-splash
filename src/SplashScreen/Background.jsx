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

  // Fade from dark to slightly lighter
  const bgLightness = interpolate(
    frame,
    [0, 1 * fps, 2 * fps],
    [2, 6, 8],
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
      [0, 0.3 + (i % 3) * 0.1, 0.3 + (i % 3) * 0.1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return { x, y, size, opacity: particleOpacity, i };
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 50%, hsl(224, 50%, ${bgLightness}%) 0%, hsl(224, 60%, ${bgLightness - 3}%) ${pulseRadius}%, #010208 100%)`,
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
              boxShadow: `0 0 ${size * 3}px ${i % 3 === 0 ? "rgba(249, 166, 28, 0.5)" : "rgba(45, 101, 228, 0.5)"}`,
            }}
          />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
