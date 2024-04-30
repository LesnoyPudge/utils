


// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const rgbToHex = (rgb: [r: number, g: number, b: number]) => {
    return "#" + ((1 << 24 | rgb[0] << 16 | rgb[1] << 8 | rgb[2])
        .toString(16)
        .slice(1)
    );
}