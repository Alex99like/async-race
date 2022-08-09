const countVelocity = (distance: number): number => {
  if (distance < 325) return 250;
  if (distance < 600) return 220;
  if (distance < 900) return 150;
  if (distance > 900) return 100;
  return 0;
};

export default countVelocity;
