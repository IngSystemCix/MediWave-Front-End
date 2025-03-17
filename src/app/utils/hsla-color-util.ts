export const generatorColorHSLA = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = Math.abs((hash % 40) * 9); // Hue
  const s = 40; // Saturation (puedes ajustarlo según necesidad)
  const l = 50; // Lightness (ajustable también)
  const a = 1; // Alpha (opacidad, 1 es completamente opaco)

  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
};
