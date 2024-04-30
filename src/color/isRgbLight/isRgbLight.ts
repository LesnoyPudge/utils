


type RGB = Readonly<[r: number, g: number, b: number]>;

export const isRgbLight = (rgb: RGB) => {
    return (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) > 186;
};