const generatePastelColor = (): string => {
  const r = Math.floor(Math.random() * 127 + 127);
  const g = Math.floor(Math.random() * 127 + 127);
  const b = Math.floor(Math.random() * 127 + 127);
  return `rgba(${r}, ${g}, ${b}, 0.5)`;
};

const getSolidColor = (rgbaColor: string): string => {
    return rgbaColor.replace('0.5', '1');
};

export { generatePastelColor, getSolidColor };