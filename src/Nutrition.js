export const Nutrition = ({ index, label, quantity, unit }) => {
  if (quantity <= 0.1) {
    return null;
  }

  return (
    <div key={index} className="info">
      <p className="label">{label}</p> 
      <p>{quantity.toFixed(2)} {unit}</p>
    </div>
  );
};
