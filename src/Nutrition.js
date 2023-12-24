export const Nutrition = ({ label, quantity, unit }) => {
  if (quantity <= 0.1) {
    return null;
  }

  return (
    <div className="info">
      <p className="label">{label}</p> 
      <p>{quantity.toFixed(2)} {unit}</p>
    </div>
  );
};
