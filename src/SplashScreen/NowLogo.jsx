import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const NowLogo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- N letter animation ---
  const nSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
    delay: 0,
  });
  const nScale = interpolate(nSpring, [0, 1], [0, 1]);
  const nX = interpolate(nSpring, [0, 1], [-80, 0]);

  // --- O circle animation (orange) ---
  const oSpring = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 100 },
    delay: 6,
  });
  const oScale = interpolate(oSpring, [0, 1], [0, 1]);

  // --- W letter animation ---
  const wSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
    delay: 12,
  });
  const wScale = interpolate(wSpring, [0, 1], [0, 1]);
  const wX = interpolate(wSpring, [0, 1], [80, 0]);

  // --- Dot animation ---
  const dotSpring = spring({
    frame,
    fps,
    config: { damping: 6, stiffness: 180 },
    delay: 20,
  });
  const dotScale = interpolate(dotSpring, [0, 1], [0, 1.3]);
  const dotScaleSettle = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
    delay: 24,
  });
  const dotFinal = interpolate(dotScaleSettle, [0, 1], [dotScale, 1]);

  // --- Checkmark / accent piece ---
  const checkSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 200 },
    delay: 16,
  });
  const checkOpacity = interpolate(checkSpring, [0, 1], [0, 1]);
  const checkY = interpolate(checkSpring, [0, 1], [-20, 0]);

  // --- Overall glow pulse ---
  const glowFrame = Math.max(0, frame - 30);
  const glowPulse = interpolate(
    glowFrame,
    [0, 15, 30],
    [0, 0.6, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        viewBox="-80 -60 498.23 211.18"
        style={{
          width: 700,
          height: "auto",
          overflow: "visible",
          filter: `drop-shadow(0 0 ${glowPulse * 30}px rgba(45, 101, 228, ${glowPulse}))`,
        }}
      >
        <defs>
          <style>{`
            .cls-1 { fill: #2d65e4; stroke-width: 0px; }
            .cls-2 { fill: #f9a61c; stroke-width: 0px; }
          `}</style>
        </defs>
        <g>
          {/* N letter */}
          <g
            style={{
              transform: `translateX(${nX}px) scale(${nScale})`,
              transformOrigin: "40px 45px",
              opacity: nSpring,
            }}
          >
            <path
              className="cls-1"
              d="m67.12,51.11L39.07,8.01c-2.42-3.83-6.67-6.13-11.24-6.13h0c-6.48,0-12.04,4.6-13.26,10.97L0,89.31h25.39l9.33-48.96,27.87,42.83c2.49,3.83,6.74,6.13,11.31,6.13h.14c6.47,0,12.04-4.6,13.29-10.96L101.96,1.87h-25.39l-9.45,49.24Z"
            />
          </g>

          {/* O circle (orange) */}
          <g
            style={{
              transform: `scale(${oScale})`,
              transformOrigin: "131.35px 45.59px",
              opacity: oSpring,
            }}
          >
            <circle className="cls-2" cx="131.35" cy="45.59" r="45.59" />
          </g>

          {/* W letter */}
          <g
            style={{
              transform: `translateX(${wX}px) scale(${wScale})`,
              transformOrigin: "240px 45px",
              opacity: wSpring,
            }}
          >
            <path
              className="cls-1"
              d="m264.23,1.87l-22.03,43.53-2.83-28.3c-.86-8.65-8.14-15.23-16.83-15.23h0c-6.6,0-12.6,3.84-15.36,9.83l-15.42,33.43-6.59-43.26h-25.23l11.45,75.21c1.07,7.03,7.11,12.22,14.22,12.22h0c5.61,0,10.71-3.26,13.06-8.36l21.11-45.76,4.11,41.16c.73,7.35,6.92,12.95,14.31,12.95h.87c5.42,0,10.39-3.05,12.83-7.89L292.18,1.87h-27.95Z"
            />
          </g>

          {/* Checkmark accent */}
          <g
            style={{
              transform: `translateY(${checkY}px)`,
              transformOrigin: "310px 30px",
              opacity: checkOpacity,
            }}
          >
            <path
              className="cls-1"
              d="m296.86,54.71h0c2.75,0,5.34-1.34,6.92-3.59L338.23,1.87h-28.08l-20.83,40.47c-2.91,5.64,1.19,12.36,7.53,12.36Z"
            />
          </g>

          {/* Dot */}
          <g
            style={{
              transform: `scale(${dotFinal})`,
              transformOrigin: "282.73px 74.18px",
              opacity: dotSpring,
            }}
          >
            <circle className="cls-1" cx="282.73" cy="74.18" r="15.13" />
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
