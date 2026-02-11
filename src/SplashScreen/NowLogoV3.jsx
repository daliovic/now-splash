import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

const CIRCUMFERENCE = Math.PI * 2 * 45.59; // ~286.5

// Particle burst from O center when it fills
const BURST_COUNT = 16;
const burstParticles = Array.from({ length: BURST_COUNT }, (_, i) => {
  const angle = (i / BURST_COUNT) * Math.PI * 2 + (i % 2) * 0.3;
  const distance = 60 + (i % 3) * 40;
  const size = 2 + (i % 3) * 1.5;
  const isOrange = i % 4 === 0;
  return { angle, distance, size, isOrange, i };
});

export const NowLogoV3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ===== PHASE 1: O circle draws with spin =====
  const oDrawSpeed = spring({
    frame,
    fps,
    config: { damping: 40, stiffness: 180 },
    delay: 0,
  });
  const oStroke = interpolate(oDrawSpeed, [0, 1], [0, CIRCUMFERENCE]);
  const oSpin = interpolate(oDrawSpeed, [0, 1], [-45, 0]);

  // O fill with a gentle punch
  const oFillSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 140 },
    delay: Math.round(0.4 * fps),
  });
  const oFillOpacity = interpolate(oFillSpring, [0, 1], [0, 1]);
  const oImpactScale = interpolate(oFillSpring, [0, 0.5, 1], [0.92, 1.06, 1]);

  // ===== PHASE 2: Shockwave flash on O fill =====
  const shockwaveStart = Math.round(0.4 * fps);
  const shockwaveProgress = interpolate(
    frame,
    [shockwaveStart, shockwaveStart + 18],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.exp) }
  );
  const shockwaveRadius = interpolate(shockwaveProgress, [0, 1], [46, 500]);
  const shockwaveOpacity = interpolate(shockwaveProgress, [0, 0.1, 1], [0, 0.5, 0]);
  const shockwaveWidth = interpolate(shockwaveProgress, [0, 1], [6, 1]);

  // ===== Particle burst =====
  const burstProgress = interpolate(
    frame,
    [shockwaveStart, shockwaveStart + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
  );

  // ===== PHASE 3: Triple staggered ripples =====
  const ripples = [0, 4, 9].map((delayFrames, idx) => {
    const start = Math.round(0.5 * fps) + delayFrames;
    const progress = interpolate(
      frame,
      [start, start + Math.round(1.2 * fps)],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
    );
    const radius = interpolate(progress, [0, 1], [45, 450 - idx * 30]);
    const opacity = interpolate(progress, [0, 0.15, 1], [0.45 - idx * 0.1, 0.3 - idx * 0.08, 0]);
    const width = 2.5 - idx * 0.7;
    const color = idx === 1 ? "#f9a61c" : "#2d65e4";
    return { radius, opacity, width, color, idx };
  });

  // ===== PHASE 4: N letter - ripple reveal + gentle overshoot =====
  const nSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
    delay: Math.round(0.6 * fps),
  });
  const nScale = interpolate(nSpring, [0, 1], [0.7, 1]);
  const nOpacity = interpolate(nSpring, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
  const nRotation = interpolate(nSpring, [0, 1], [4, 0]);
  const nX = interpolate(nSpring, [0, 1], [18, 0]);

  // ===== PHASE 5: W letter - ripple reveal + gentle overshoot =====
  const wSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
    delay: Math.round(0.75 * fps),
  });
  const wScale = interpolate(wSpring, [0, 1], [0.7, 1]);
  const wOpacity = interpolate(wSpring, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
  const wRotation = interpolate(wSpring, [0, 1], [-3, 0]);
  const wX = interpolate(wSpring, [0, 1], [-15, 0]);

  // ===== PHASE 6: Checkmark whips in with rotation =====
  const checkSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 150 },
    delay: Math.round(0.95 * fps),
  });
  const checkScale = interpolate(checkSpring, [0, 1], [0.5, 1]);
  const checkOpacity = interpolate(checkSpring, [0, 0.25], [0, 1], { extrapolateRight: "clamp" });
  const checkRotation = interpolate(checkSpring, [0, 1], [-12, 0]);
  const checkX = interpolate(checkSpring, [0, 1], [20, 0]);

  // ===== PHASE 7: Dot - controlled bounce =====
  const dotSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 180 },
    delay: Math.round(1.15 * fps),
  });
  const dotScale = interpolate(dotSpring, [0, 1], [0, 1]);
  const dotY = interpolate(dotSpring, [0, 1], [-30, 0]);

  // ===== PHASE 8: Breathing pulse after assembly =====
  const breatheStart = Math.round(1.8 * fps);
  const breathe = interpolate(
    frame,
    [breatheStart, breatheStart + 15, breatheStart + 30],
    [1, 1.018, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ===== Dynamic shadow that grows as elements appear =====
  const shadowStrength = interpolate(
    frame,
    [0.4 * fps, 1.2 * fps],
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
      <svg
        viewBox="-100 -100 538.23 291.18"
        style={{
          width: 750,
          height: "auto",
          overflow: "visible",
          filter: `drop-shadow(0 ${4 * shadowStrength}px ${12 * shadowStrength}px rgba(45, 101, 228, ${0.12 * shadowStrength}))`,
        }}
      >
        <defs>
          <style>{`
            .v3-blue { fill: #2d65e4; stroke-width: 0px; }
            .v3-orange { fill: #f9a61c; stroke-width: 0px; }
          `}</style>
          <radialGradient id="o-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f9a61c" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f9a61c" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Everything breathes together */}
        <g style={{ transform: `scale(${breathe})`, transformOrigin: "169px 45px" }}>

          {/* Shockwave */}
          <circle
            cx="131.35"
            cy="45.59"
            r={shockwaveRadius}
            fill="none"
            stroke="#f9a61c"
            strokeWidth={shockwaveWidth}
            opacity={shockwaveOpacity}
          />

          {/* Triple ripples */}
          {ripples.map(({ radius, opacity, width, color, idx }) => (
            <circle
              key={idx}
              cx="131.35"
              cy="45.59"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={width}
              opacity={opacity}
            />
          ))}

          {/* Burst particles */}
          {burstParticles.map(({ angle, distance, size, isOrange, i }) => {
            const px = 131.35 + Math.cos(angle) * distance * burstProgress;
            const py = 45.59 + Math.sin(angle) * distance * burstProgress;
            const pOpacity = interpolate(burstProgress, [0, 0.15, 0.8, 1], [0, 0.8, 0.3, 0]);
            const pScale = interpolate(burstProgress, [0, 0.2, 1], [0.5, 1, 0.2]);
            return (
              <circle
                key={`p-${i}`}
                cx={px}
                cy={py}
                r={size * pScale}
                fill={isOrange ? "#f9a61c" : "#2d65e4"}
                opacity={pOpacity}
              />
            );
          })}

          {/* O glow behind circle */}
          <circle
            cx="131.35"
            cy="45.59"
            r="65"
            fill="url(#o-glow)"
            opacity={oFillOpacity * 0.6}
          />

          {/* O circle - fast draw with spin, then punch fill */}
          <g style={{
            transform: `rotate(${oSpin}deg) scale(${oImpactScale})`,
            transformOrigin: "131.35px 45.59px",
          }}>
            <circle
              cx="131.35"
              cy="45.59"
              r="45.59"
              fill="none"
              stroke="#f9a61c"
              strokeWidth="3.5"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE - oStroke}
              strokeLinecap="round"
            />
            <circle
              cx="131.35"
              cy="45.59"
              r="45.59"
              fill="#f9a61c"
              opacity={oFillOpacity}
            />
          </g>

          {/* N letter - slides in from O direction with rotation overshoot */}
          <g
            style={{
              transform: `translateX(${nX}px) scale(${nScale}) rotate(${nRotation}deg)`,
              transformOrigin: "50px 45px",
              opacity: nOpacity,
            }}
          >
            <path
              className="v3-blue"
              d="m67.12,51.11L39.07,8.01c-2.42-3.83-6.67-6.13-11.24-6.13h0c-6.48,0-12.04,4.6-13.26,10.97L0,89.31h25.39l9.33-48.96,27.87,42.83c2.49,3.83,6.74,6.13,11.31,6.13h.14c6.47,0,12.04-4.6,13.29-10.96L101.96,1.87h-25.39l-9.45,49.24Z"
            />
          </g>

          {/* W letter - slides in from O direction with rotation overshoot */}
          <g
            style={{
              transform: `translateX(${wX}px) scale(${wScale}) rotate(${wRotation}deg)`,
              transformOrigin: "240px 45px",
              opacity: wOpacity,
            }}
          >
            <path
              className="v3-blue"
              d="m264.23,1.87l-22.03,43.53-2.83-28.3c-.86-8.65-8.14-15.23-16.83-15.23h0c-6.6,0-12.6,3.84-15.36,9.83l-15.42,33.43-6.59-43.26h-25.23l11.45,75.21c1.07,7.03,7.11,12.22,14.22,12.22h0c5.61,0,10.71-3.26,13.06-8.36l21.11-45.76,4.11,41.16c.73,7.35,6.92,12.95,14.31,12.95h.87c5.42,0,10.39-3.05,12.83-7.89L292.18,1.87h-27.95Z"
            />
          </g>

          {/* Checkmark accent - whips in with rotation */}
          <g
            style={{
              transform: `translateX(${checkX}px) scale(${checkScale}) rotate(${checkRotation}deg)`,
              transformOrigin: "310px 30px",
              opacity: checkOpacity,
            }}
          >
            <path
              className="v3-blue"
              d="m296.86,54.71h0c2.75,0,5.34-1.34,6.92-3.59L338.23,1.87h-28.08l-20.83,40.47c-2.91,5.64,1.19,12.36,7.53,12.36Z"
            />
          </g>

          {/* Dot - drops in with heavy bounce */}
          <g
            style={{
              transform: `translateY(${dotY}px) scale(${dotScale})`,
              transformOrigin: "282.73px 74.18px",
            }}
          >
            <circle className="v3-blue" cx="282.73" cy="74.18" r="15.13" />
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
