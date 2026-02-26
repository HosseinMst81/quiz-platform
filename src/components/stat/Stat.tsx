import './Stat.css'
function Stat({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="result-stat">
      <span className="result-stat-icon" style={{ color }}>
        {icon}
      </span>
      <span className="result-stat-value" style={{ color }}>
        {value}
      </span>
      <span className="result-stat-label">{label}</span>
    </div>
  );
}

export default Stat;
