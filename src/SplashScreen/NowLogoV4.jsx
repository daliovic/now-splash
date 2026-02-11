import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

// Approximate path lengths for stroke-dasharray
const N_PATH_LENGTH = 380;
const W_PATH_LENGTH = 520;
const CHECK_PATH_LENGTH = 130;
const O_CIRCUMFERENCE = Math.PI * 2 * 45.59;

export const NowLogoV4 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ===== N stroke draw =====
  const nDrawProgress = interpolate(
    frame,
    [0, Math.round(0.7 * fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );
  const nStroke = nDrawProgress * N_PATH_LENGTH;

  // N fill floods in after stroke completes
  const nFillSpring = spring({
    frame,
    fps,
    config: { damping: 25, stiffness: 100 },
    delay: Math.round(0.65 * fps),
  });

  // ===== O stroke draw (starts slightly after N begins) =====
  const oDrawProgress = interpolate(
    frame,
    [Math.round(0.2 * fps), Math.round(0.8 * fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );
  const oStroke = oDrawProgress * O_CIRCUMFERENCE;

  // O fill
  const oFillSpring = spring({
    frame,
    fps,
    config: { damping: 25, stiffness: 100 },
    delay: Math.round(0.75 * fps),
  });

  // ===== W stroke draw =====
  const wDrawProgress = interpolate(
    frame,
    [Math.round(0.35 * fps), Math.round(1.05 * fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );
  const wStroke = wDrawProgress * W_PATH_LENGTH;

  // W fill
  const wFillSpring = spring({
    frame,
    fps,
    config: { damping: 25, stiffness: 100 },
    delay: Math.round(1.0 * fps),
  });

  // ===== Checkmark stroke draw =====
  const checkDrawProgress = interpolate(
    frame,
    [Math.round(0.85 * fps), Math.round(1.15 * fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
  );
  const checkStroke = checkDrawProgress * CHECK_PATH_LENGTH;

  // Checkmark fill
  const checkFillSpring = spring({
    frame,
    fps,
    config: { damping: 25, stiffness: 100 },
    delay: Math.round(1.1 * fps),
  });

  // ===== Dot appears with a pop =====
  const dotSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 160 },
    delay: Math.round(1.2 * fps),
  });
  const dotScale = interpolate(dotSpring, [0, 1], [0, 1]);

  // ===== Pen cursor traveling along the drawing =====
  // Shows a small dot at the "pen tip" during active drawing
  const penActive = frame < Math.round(1.2 * fps);
  const penX = interpolate(
    frame,
    [0, Math.round(0.2 * fps), Math.round(0.35 * fps), Math.round(0.85 * fps), Math.round(1.15 * fps)],
    [0, 131, 160, 296, 338],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const penY = interpolate(
    frame,
    [0, Math.round(0.2 * fps), Math.round(0.35 * fps), Math.round(0.85 * fps), Math.round(1.15 * fps)],
    [50, 45, 2, 54, 2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const penOpacity = interpolate(
    frame,
    [0, 4, Math.round(1.1 * fps), Math.round(1.2 * fps)],
    [0, 0.6, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ===== Subtle shadow builds as fills appear =====
  const shadowProgress = interpolate(
    frame,
    [0.65 * fps, 1.3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ===== Gentle breathe at end =====
  const breatheStart = Math.round(2.0 * fps);
  const breathe = interpolate(
    frame,
    [breatheStart, breatheStart + 18, breatheStart + 36],
    [1, 1.012, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
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
          width: 720,
          height: "auto",
          overflow: "visible",
          filter: `drop-shadow(0 ${3 * shadowProgress}px ${10 * shadowProgress}px rgba(45, 101, 228, ${0.1 * shadowProgress}))`,
        }}
      >
        <defs>
          <style>{`
            .v4-blue-fill { fill: #2d65e4; stroke: none; }
            .v4-orange-fill { fill: #f9a61c; stroke: none; }
          `}</style>
        </defs>

        <g style={{ transform: `scale(${breathe})`, transformOrigin: "169px 45px" }}>

          {/* ---- STROKE LAYER (draws first) ---- */}

          {/* N stroke */}
          <path
            d="m67.12,51.11L39.07,8.01c-2.42-3.83-6.67-6.13-11.24-6.13h0c-6.48,0-12.04,4.6-13.26,10.97L0,89.31h25.39l9.33-48.96,27.87,42.83c2.49,3.83,6.74,6.13,11.31,6.13h.14c6.47,0,12.04-4.6,13.29-10.96L101.96,1.87h-25.39l-9.45,49.24Z"
            fill="none"
            stroke="#2d65e4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={N_PATH_LENGTH}
            strokeDashoffset={N_PATH_LENGTH - nStroke}
          />

          {/* O stroke */}
          <circle
            cx="131.35"
            cy="45.59"
            r="45.59"
            fill="none"
            stroke="#f9a61c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={O_CIRCUMFERENCE}
            strokeDashoffset={O_CIRCUMFERENCE - oStroke}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "131.35px 45.59px",
            }}
          />

          {/* W stroke */}
          <path
            d="m264.23,1.87l-22.03,43.53-2.83-28.3c-.86-8.65-8.14-15.23-16.83-15.23h0c-6.6,0-12.6,3.84-15.36,9.83l-15.42,33.43-6.59-43.26h-25.23l11.45,75.21c1.07,7.03,7.11,12.22,14.22,12.22h0c5.61,0,10.71-3.26,13.06-8.36l21.11-45.76,4.11,41.16c.73,7.35,6.92,12.95,14.31,12.95h.87c5.42,0,10.39-3.05,12.83-7.89L292.18,1.87h-27.95Z"
            fill="none"
            stroke="#2d65e4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={W_PATH_LENGTH}
            strokeDashoffset={W_PATH_LENGTH - wStroke}
          />

          {/* Checkmark stroke */}
          <path
            d="m296.86,54.71h0c2.75,0,5.34-1.34,6.92-3.59L338.23,1.87h-28.08l-20.83,40.47c-2.91,5.64,1.19,12.36,7.53,12.36Z"
            fill="none"
            stroke="#2d65e4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={CHECK_PATH_LENGTH}
            strokeDashoffset={CHECK_PATH_LENGTH - checkStroke}
          />

          {/* ---- FILL LAYER (floods in after strokes) ---- */}

          {/* N fill */}
          <path
            className="v4-blue-fill"
            d="m67.12,51.11L39.07,8.01c-2.42-3.83-6.67-6.13-11.24-6.13h0c-6.48,0-12.04,4.6-13.26,10.97L0,89.31h25.39l9.33-48.96,27.87,42.83c2.49,3.83,6.74,6.13,11.31,6.13h.14c6.47,0,12.04-4.6,13.29-10.96L101.96,1.87h-25.39l-9.45,49.24Z"
            opacity={nFillSpring}
          />

          {/* O fill */}
          <circle
            cx="131.35"
            cy="45.59"
            r="45.59"
            className="v4-orange-fill"
            opacity={oFillSpring}
          />

          {/* W fill */}
          <path
            className="v4-blue-fill"
            d="m264.23,1.87l-22.03,43.53-2.83-28.3c-.86-8.65-8.14-15.23-16.83-15.23h0c-6.6,0-12.6,3.84-15.36,9.83l-15.42,33.43-6.59-43.26h-25.23l11.45,75.21c1.07,7.03,7.11,12.22,14.22,12.22h0c5.61,0,10.71-3.26,13.06-8.36l21.11-45.76,4.11,41.16c.73,7.35,6.92,12.95,14.31,12.95h.87c5.42,0,10.39-3.05,12.83-7.89L292.18,1.87h-27.95Z"
            opacity={wFillSpring}
          />

          {/* Checkmark fill */}
          <path
            className="v4-blue-fill"
            d="m296.86,54.71h0c2.75,0,5.34-1.34,6.92-3.59L338.23,1.87h-28.08l-20.83,40.47c-2.91,5.64,1.19,12.36,7.53,12.36Z"
            opacity={checkFillSpring}
          />

          {/* Dot - pops in */}
          <g
            style={{
              transform: `scale(${dotScale})`,
              transformOrigin: "282.73px 74.18px",
            }}
          >
            <circle className="v4-blue-fill" cx="282.73" cy="74.18" r="15.13" opacity={dotSpring} />
          </g>

          {/* Pen cursor */}
          {penActive && (
            <circle
              cx={penX}
              cy={penY}
              r="3"
              fill="#2d65e4"
              opacity={penOpacity}
            >
            </circle>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
