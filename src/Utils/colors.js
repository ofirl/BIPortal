/** colors bank */
const allColors = ['#8884d8', '#ff7300', '#413ea0'];

let currentColorIndex = 0;
/**
 * @typedef assignedColors
 * @type {object}
 * @property {string} * the color asigned
 */
let assignedColors = {};

/**
 * gets a color, or assign a new one
 * 
 * @param {string} key name
 * @param {string} color color value
 * @return {string} color value
 */
export function getColor(key, color) {
    if (color)
        return setColor(key, color);

    if (assignedColors[key] == null) {
        let nextColor = allColors[currentColorIndex++];
        while (currentColorIndex < allColors.length && Object.keys(assignedColors).find((c) => !assignedColors[c].localeCompare(nextColor)))
            nextColor = allColors[currentColorIndex++];

        assignedColors[key] = nextColor;
    }

    return assignedColors[key];
}

/**
 * sets a color
 * 
 * @param {string} key name
 * @param {string} color color value
 * @return {string} color value
 */
export function setColor(key, color) {
    return assignedColors[key] = color;
}

/**
 * sets colors
 * 
 * @param {object} colorsObj colors object ( {name: colorValue})
 */
export function setColors(colorsObj) {
    assignedColors = { ...assignedColors, ...colorsObj };
}