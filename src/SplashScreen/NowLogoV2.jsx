import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const NowLogoV2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Phase 1: O circle expands from a dot (frames 0-25) ---
  const oExpand = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    delay: 0,
  });
  const oScale = interpolate(oExpand, [0, 1], [0.05, 1]);
  const oOpacity = interpolate(oExpand, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });

  // O has a subtle rotation during expand
  const oRotation = interpolate(oExpand, [0, 1], [180, 0]);

  // --- Phase 2: Light sweep across (frames 15-40) ---
  const sweepProgress = interpolate(
    frame,
    [0.5 * fps, 1.2 * fps],
    [-150, 500],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );

  // --- Phase 3: N slams in from top (frames 18-30) ---
  const nSlam = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 200 },
    delay: Math.round(0.6 * fps),
  });
  const nY = interpolate(nSlam, [0, 1], [-120, 0]);
  const nOpacity = interpolate(nSlam, [0, 0.2], [0, 1], { extrapolateRight: "clamp" });

  // --- Phase 4: W slams in from bottom (frames 22-34) ---
  const wSlam = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 200 },
    delay: Math.round(0.8 * fps),
  });
  const wY = interpolate(wSlam, [0, 1], [120, 0]);
  const wOpacity = interpolate(wSlam, [0, 0.2], [0, 1], { extrapolateRight: "clamp" });

  // --- Phase 5: Checkmark whips in (frames 28-38) ---
  const checkWhip = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 250 },
    delay: Math.round(1.0 * fps),
  });
  const checkX = interpolate(checkWhip, [0, 1], [60, 0]);
  const checkOpacity = interpolate(checkWhip, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });

  // --- Phase 6: Dot drops in with heavy bounce (frames 32-45) ---
  const dotDrop = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 150, mass: 1.5 },
    delay: Math.round(1.2 * fps),
  });
  const dotY = interpolate(dotDrop, [0, 1], [-80, 0]);
  const dotOpacity = interpolate(dotDrop, [0, 0.15], [0, 1], { extrapolateRight: "clamp" });

  // --- Flash on impact (when N lands) ---
  const flashStart = Math.round(0.6 * fps) + 4;
  const flash = interpolate(
    frame,
    [flashStart, flashStart + 3, flashStart + 12],
    [0, 0.7, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // --- Subtle continuous shimmer on O circle ---
  const shimmer = interpolate(
    frame,
    [1.5 * fps, 2 * fps, 2.5 * fps, 3 * fps],
    [0, 0.15, 0, 0.1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Flash overlay */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(249, 166, 28, ${flash}), transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <svg
        viewBox="-80 -80 498.23 251.18"
        style={{
          width: 700,
          height: "auto",
          overflow: "visible",
        }}
      >
        <defs>
          <style>{`
            .v2-blue { fill: #2d65e4; stroke-width: 0px; }
            .v2-orange { fill: #f9a61c; stroke-width: 0px; }
          `}</style>
          {/* Light sweep gradient */}
          <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="40%" stopColor="white" stopOpacity="0.6" />
            <stop offset="50%" stopColor="white" stopOpacity="0.9" />
            <stop offset="60%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <clipPath id="logo-clip">
            <rect x="-80" y="-80" width="498.23" height="251.18" />
          </clipPath>
        </defs>

        <g>
          {/* N letter - slams from top */}
          <g
            style={{
              transform: `translateY(${nY}px)`,
              transformOrigin: "50px 45px",
              opacity: nOpacity,
            }}
          >
            <path
              className="v2-blue"
              d="m67.12,51.11L39.07,8.01c-2.42-3.83-6.67-6.13-11.24-6.13h0c-6.48,0-12.04,4.6-13.26,10.97L0,89.31h25.39l9.33-48.96,27.87,42.83c2.49,3.83,6.74,6.13,11.31,6.13h.14c6.47,0,12.04-4.6,13.29-10.96L101.96,1.87h-25.39l-9.45,49.24Z"
            />
          </g>

          {/* O circle - expands from dot with rotation */}
          <g
            style={{
              transform: `scale(${oScale}) rotate(${oRotation}deg)`,
              transformOrigin: "131.35px 45.59px",
              opacity: oOpacity,
            }}
          >
            <circle className="v2-orange" cx="131.35" cy="45.59" r="45.59" />
            {/* Shimmer highlight on O */}
            <circle
              cx="131.35"
              cy="45.59"
              r="45.59"
              fill="white"
              opacity={shimmer}
            />
          </g>

          {/* W letter - slams from bottom */}
          <g
            style={{
              transform: `translateY(${wY}px)`,
              transformOrigin: "240px 45px",
              opacity: wOpacity,
            }}
          >
            <path
              className="v2-blue"
              d="m264.23,1.87l-22.03,43.53-2.83-28.3c-.86-8.65-8.14-15.23-16.83-15.23h0c-6.6,0-12.6,3.84-15.36,9.83l-15.42,33.43-6.59-43.26h-25.23l11.45,75.21c1.07,7.03,7.11,12.22,14.22,12.22h0c5.61,0,10.71-3.26,13.06-8.36l21.11-45.76,4.11,41.16c.73,7.35,6.92,12.95,14.31,12.95h.87c5.42,0,10.39-3.05,12.83-7.89L292.18,1.87h-27.95Z"
            />
          </g>

          {/* Checkmark accent - whips in from right */}
          <g
            style={{
              transform: `translateX(${checkX}px)`,
              transformOrigin: "310px 30px",
              opacity: checkOpacity,
            }}
          >
            <path
              className="v2-blue"
              d="m296.86,54.71h0c2.75,0,5.34-1.34,6.92-3.59L338.23,1.87h-28.08l-20.83,40.47c-2.91,5.64,1.19,12.36,7.53,12.36Z"
            />
          </g>

          {/* Dot - drops in with heavy bounce */}
          <g
            style={{
              transform: `translateY(${dotY}px)`,
              transformOrigin: "282.73px 74.18px",
              opacity: dotOpacity,
            }}
          >
            <circle className="v2-blue" cx="282.73" cy="74.18" r="15.13" />
          </g>

          {/* Light sweep overlay */}
          <rect
            x={sweepProgress - 40}
            y="-80"
            width="80"
            height="251.18"
            fill="url(#sweep)"
            opacity="0.5"
            style={{ mixBlendMode: "overlay" }}
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
