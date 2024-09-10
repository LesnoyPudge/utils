


// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const hexToRgb = (hex: string) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      return String(r + r + g + g + b + b);
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;

    return [
        parseInt(result[1] || '0', 16),
        parseInt(result[2] || '0', 16),
        parseInt(result[3] || '0', 16),
    ];
};