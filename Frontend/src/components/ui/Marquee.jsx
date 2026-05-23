// components/ui/Marquee.jsx
const NAMES = ['GoAirClass', 'Punarmilan', 'Namastey India', 'OnlineGo', 'Learning Hub', 'Car Rentals', 'Tour Hub'];
const ROW   = [...NAMES, ...NAMES, ...NAMES, ...NAMES];

export default function Marquee() {
  return (
    <div className="marquee-section">
      {/* Row 1 — RIGHT */}
      <div className="marquee-wrap">
        <div className="marquee-track marquee-right row-1">
          {ROW.map((name, i) => (
            <span key={i} className="marquee-item">
              {name}
              <span className="marquee-sep">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* divider */}
      <div className="marquee-divider" />

      {/* Row 2 — LEFT */}
      <div className="marquee-wrap">
        <div className="marquee-track marquee-left row-2">
          {ROW.map((name, i) => (
            <span key={i} className="marquee-item">
              {name}
              <span className="marquee-sep">◇</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}