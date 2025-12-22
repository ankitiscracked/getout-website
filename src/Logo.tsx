interface LogoProps {
  gStroke?: string;
  oStroke?: string;
  momentumStroke?: string;
}

export default function Logo({ 
  gStroke = 'black', 
  oStroke = '#666666', 
  momentumStroke = 'black' 
}: LogoProps) {
  const gStrokeStyle = {
    stroke: gStroke,
    strokeWidth: 12,
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const oStrokeStyle = {
    stroke: oStroke,
    strokeWidth: 12,
    fill: 'none',
    strokeLinecap: 'butt' as const,
    strokeLinejoin: 'round' as const,
  };

  const momentumLineStyle = {
    stroke: momentumStroke,
    strokeWidth: 1.5,
    opacity: 0.15,
  };

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Apply vertical axis tilt (skewY) */}
      <g transform="translate(100, 100) skewY(-15)">
        {/* Full circle - full opacity */}
        <circle cx="0" cy="0" r="45" style={gStrokeStyle} />
        
        {/* Top to top-right quarter - reduced opacity (overlaid) */}
        <path d="M 0,-45 A 45,45 0 0,1 45,0" style={oStrokeStyle} />
      </g>
      
      {/* Horizontal line extending from right side inward (G indicator) - not skewed */}
      <line x1="140" y1="100" x2="115" y2="100" style={gStrokeStyle} />
      
      {/* Momentum horizontal lines scattered throughout (not affected by skew) */}
      <g transform="translate(100, 100)">
        <line x1="-55" y1="-50" x2="-20" y2="-50" style={momentumLineStyle} />
        <line x1="-62" y1="-38" x2="-28" y2="-38" style={momentumLineStyle} />
        <line x1="-50" y1="-25" x2="-10" y2="-25" style={momentumLineStyle} />
        <line x1="-68" y1="-12" x2="-32" y2="-12" style={momentumLineStyle} />
        <line x1="-45" y1="2" x2="-15" y2="2" style={momentumLineStyle} />
        <line x1="-60" y1="18" x2="-25" y2="18" style={momentumLineStyle} />
        <line x1="-55" y1="35" x2="-12" y2="35" style={momentumLineStyle} />
        <line x1="-48" y1="50" x2="-20" y2="50" style={momentumLineStyle} />
        
        <line x1="15" y1="-52" x2="50" y2="-52" style={momentumLineStyle} />
        <line x1="20" y1="-38" x2="70" y2="-38" style={momentumLineStyle} />
        <line x1="12" y1="-22" x2="55" y2="-22" style={momentumLineStyle} />
        <line x1="25" y1="-8" x2="65" y2="-8" style={momentumLineStyle} />
        <line x1="18" y1="8" x2="62" y2="8" style={momentumLineStyle} />
        <line x1="22" y1="28" x2="50" y2="28" style={momentumLineStyle} />
        <line x1="16" y1="42" x2="72" y2="42" style={momentumLineStyle} />
        <line x1="28" y1="55" x2="60" y2="55" style={momentumLineStyle} />
      </g>
    </svg>
  )
}
