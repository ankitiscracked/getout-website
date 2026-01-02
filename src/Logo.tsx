interface LogoProps {
  gStroke?: string;
  oStroke?: string;
  momentumStroke?: string;
}

export default function Logo({
  gStroke = "#292524", // stone-800
  oStroke = "#78716c", // stone-500
  momentumStroke = "#a8a29e", // stone-400
}: LogoProps) {
  const gStrokeStyle = {
    stroke: gStroke,
    strokeWidth: 12,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const oStrokeStyle = {
    stroke: oStroke,
    strokeWidth: 12,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const momentumLineStyle = {
    stroke: momentumStroke,
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    opacity: 0.6,
  };

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Drop shadow filter */}
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="2"
            dy="3"
            stdDeviation="3"
            floodColor="#292524"
            floodOpacity="0.25"
          />
        </filter>
        {/* Gradient for main stroke */}
        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#44403c" />
          <stop offset="100%" stopColor="#1c1917" />
        </linearGradient>
      </defs>

      {/* Apply vertical axis tilt (skewY) */}
      <g transform="translate(100, 100) skewY(-15)" filter="url(#dropShadow)">
        {/* Full circle - with gradient */}
        <circle
          cx="0"
          cy="0"
          r="45"
          style={{ ...gStrokeStyle, stroke: "url(#circleGradient)" }}
        />

        {/* Top to top-right quarter - reduced opacity (overlaid) */}
        <path d="M 0,-45 A 45,45 0 0,1 45,0" style={oStrokeStyle} />
      </g>

      {/* Horizontal line extending from right side inward (G indicator) - not skewed */}
      <line x1="138" y1="100" x2="100" y2="100" style={gStrokeStyle} />

      {/* Momentum lines - left side (evenly spaced, alternating distance pattern) */}
      <g transform="translate(100, 100)">
        <line x1="-56" y1="-35" x2="-36" y2="-35" style={momentumLineStyle} />
        <line x1="-72" y1="-12" x2="-52" y2="-12" style={momentumLineStyle} />
        <line x1="-68" y1="12" x2="-48" y2="12" style={momentumLineStyle} />
        <line x1="-72" y1="35" x2="-52" y2="35" style={momentumLineStyle} />

        {/* Momentum lines - right side (evenly spaced, alternating distance pattern) */}
        <line x1="52" y1="-35" x2="72" y2="-35" style={momentumLineStyle} />
        <line x1="48" y1="-12" x2="68" y2="-12" style={momentumLineStyle} />
        <line x1="52" y1="12" x2="72" y2="12" style={momentumLineStyle} />
        <line x1="38" y1="35" x2="58" y2="35" style={momentumLineStyle} />
      </g>
    </svg>
  );
}
