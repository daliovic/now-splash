import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const NowLogoV5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ===== Camera zoom out from O circle =====
  const zoomProgress = interpolate(
    frame,
    [0.3 * fps, 1.6 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.22, 0.68, 0.35, 1) }
  );
  const zoom = interpolate(zoomProgress, [0, 1], [12, 1]);

  // Camera center shifts from O position to logo center
  const cameraX = interpolate(zoomProgress, [0, 1], [131.35, 169]);
  const cameraY = interpolate(zoomProgress, [0, 1], [45.59, 45]);

  // ===== Zoom overshoot - pulls back slightly past 1x then settles =====
  const settleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
    delay: Math.round(1.55 * fps),
  });
  const settleScale = interpolate(settleSpring, [0, 1], [0.95, 1]);

  // ===== O pulse on entrance =====
  const oOpacity = interpolate(frame, [0, 5], [0, 1], { extrapolateRight: "clamp" });
  const oPulse = interpolate(
    frame,
    [3, 10, 18],
    [0.9, 1.08, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ===== Ring ripple from O when zoom begins pulling back =====
  const ringStart = Math.round(0.3 * fps);
  const ringProgress = interpolate(
    frame,
    [ringStart, ringStart + Math.round(1.2 * fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
  );
  const ringRadius = interpolate(ringProgress, [0, 1], [46, 300]);
  const ringOpacity = interpolate(ringProgress, [0, 0.1, 1], [0, 0.35, 0]);

  // ===== N slides in from left as revealed =====
  const nSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 100 },
    delay: Math.round(0.7 * fps),
  });
  const nOpacity = interpolate(nSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
  const nX = interpolate(nSpring, [0, 1], [15, 0]);

  // ===== W slides in from right =====
  const wSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 100 },
    delay: Math.round(0.85 * fps),
  });
  const wOpacity = interpolate(wSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
  const wX = interpolate(wSpring, [0, 1], [-15, 0]);

  // ===== Checkmark snaps in with scale =====
  const checkSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 140 },
    delay: Math.round(1.2 * fps),
  });
  const checkOpacity = interpolate(checkSpring, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
  const checkScale = interpolate(checkSpring, [0, 1], [0.6, 1]);
  const checkX = interpolate(checkSpring, [0, 1], [10, 0]);

  // ===== Dot pops in with a small bounce =====
  const dotSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 160 },
    delay: Math.round(1.35 * fps),
  });
  const dotScale = interpolate(dotSpring, [0, 1], [0, 1]);

  // ===== Orange bg wash =====
  const bgWash = interpolate(
    zoomProgress,
    [0, 0.2, 0.55],
    [0.18, 0.1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ===== Shadow =====
  const shadowStrength = interpolate(
    zoomProgress,
    [0.7, 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Warm orange wash */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 48%, rgba(249, 166, 28, ${bgWash}), transparent 70%)`,
        }}
      />

      <svg
        viewBox="-80 -60 498.23 211.18"
        style={{
          width: 700,
          height: "auto",
          overflow: "visible",
          filter: `drop-shadow(0 ${3 * shadowStrength}px ${10 * shadowStrength}px rgba(45, 101, 228, ${0.1 * shadowStrength}))`,
        }}
      >
        <defs>
          <style>{`
            .v5-blue { fill: #2d65e4; stroke-width: 0px; }
            .v5-orange { fill: #f9a61c; stroke-width: 0px; }
          `}</style>
        </defs>

        {/* Zoom + settle group */}
        <g
          style={{
            transform: `scale(${zoom * settleScale})`,
            transformOrigin: `${cameraX}px ${cameraY}px`,
          }}
        >
          {/* Ring ripple from O */}
          <circle
            cx="131.35"
            cy="45.59"
            r={ringRadius}
            fill="none"
            stroke="#f9a61c"
            strokeWidth="1.5"
            opacity={ringOpacity}
          />

          {/* N letter - slides in from left */}
          <g
            style={{
              transform: `translateX(${nX}px)`,
              opacity: nOpacity,
            }}
          >
            <path
              className="v5-blue"
              d="m67.12,51.11L39.07,8.01c-2.42-3.83-6.67-6.13-11.24-6.13h0c-6.48,0-12.04,4.6-13.26,10.97L0,89.31h25.39l9.33-48.96,27.87,42.83c2.49,3.83,6.74,6.13,11.31,6.13h.14c6.47,0,12.04-4.6,13.29-10.96L101.96,1.87h-25.39l-9.45,49.24Z"
            />
          </g>

          {/* O circle - hero with entrance pulse */}
          <g
            style={{
              transform: `scale(${oPulse})`,
              transformOrigin: "131.35px 45.59px",
              opacity: oOpacity,
            }}
          >
            <circle className="v5-orange" cx="131.35" cy="45.59" r="45.59" />
          </g>

          {/* W letter - slides in from right */}
          <g
            style={{
              transform: `translateX(${wX}px)`,
              opacity: wOpacity,
            }}
          >
            <path
              className="v5-blue"
              d="m264.23,1.87l-22.03,43.53-2.83-28.3c-.86-8.65-8.14-15.23-16.83-15.23h0c-6.6,0-12.6,3.84-15.36,9.83l-15.42,33.43-6.59-43.26h-25.23l11.45,75.21c1.07,7.03,7.11,12.22,14.22,12.22h0c5.61,0,10.71-3.26,13.06-8.36l21.11-45.76,4.11,41.16c.73,7.35,6.92,12.95,14.31,12.95h.87c5.42,0,10.39-3.05,12.83-7.89L292.18,1.87h-27.95Z"
            />
          </g>

          {/* Checkmark - snaps in with scale */}
          <g
            style={{
              transform: `translateX(${checkX}px) scale(${checkScale})`,
              transformOrigin: "310px 30px",
              opacity: checkOpacity,
            }}
          >
            <path
              className="v5-blue"
              d="m296.86,54.71h0c2.75,0,5.34-1.34,6.92-3.59L338.23,1.87h-28.08l-20.83,40.47c-2.91,5.64,1.19,12.36,7.53,12.36Z"
            />
          </g>

          {/* Dot - pops with bounce */}
          <g
            style={{
              transform: `scale(${dotScale})`,
              transformOrigin: "282.73px 74.18px",
            }}
          >
            <circle className="v5-blue" cx="282.73" cy="74.18" r="15.13" />
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
