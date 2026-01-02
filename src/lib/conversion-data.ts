
export type Unit = {
  name: string;
  symbol: string;
  // Factor to convert from this unit to the base unit of the category.
  // For temperature, this is not used directly.
  factor: number;
};

export type ConversionCategory = {
  name: string;
  baseUnit: string;
  units: Record<string, Unit>;
};

export const conversionData: Record<string, ConversionCategory> = {
  length: {
    name: 'Length',
    baseUnit: 'meter',
    units: {
      meter: { name: 'Meters', symbol: 'm', factor: 1 },
      kilometer: { name: 'Kilometers', symbol: 'km', factor: 1000 },
      centimeter: { name: 'Centimeters', symbol: 'cm', factor: 0.01 },
      millimeter: { name: 'Millimeters', symbol: 'mm', factor: 0.001 },
      mile: { name: 'Miles', symbol: 'mi', factor: 1609.34 },
      yard: { name: 'Yards', symbol: 'yd', factor: 0.9144 },
      foot: { name: 'Feet', symbol: 'ft', factor: 0.3048 },
      inch: { name: 'Inches', symbol: 'in', factor: 0.0254 },
    },
  },
  mass: {
    name: 'Mass & Weight',
    baseUnit: 'gram',
    units: {
      gram: { name: 'Grams', symbol: 'g', factor: 1 },
      kilogram: { name: 'Kilograms', symbol: 'kg', factor: 1000 },
      milligram: { name: 'Milligrams', symbol: 'mg', factor: 0.001 },
      ton: { name: 'Metric Tons', symbol: 't', factor: 1000000 },
      pound: { name: 'Pounds', symbol: 'lb', factor: 453.592 },
      ounce: { name: 'Ounces', symbol: 'oz', factor: 28.3495 },
    },
  },
  temperature: {
    name: 'Temperature',
    baseUnit: 'kelvin',
    units: {
      celsius: { name: 'Celsius', symbol: '°C', factor: 1 },
      fahrenheit: { name: 'Fahrenheit', symbol: '°F', factor: 1 },
      kelvin: { name: 'Kelvin', symbol: 'K', factor: 1 },
    },
  },
  area: {
    name: 'Area',
    baseUnit: 'square meter',
    units: {
      'square-meter': { name: 'Square Meters', symbol: 'm²', factor: 1 },
      'square-kilometer': { name: 'Square Kilometers', symbol: 'km²', factor: 1000000 },
      'square-mile': { name: 'Square Miles', symbol: 'mi²', factor: 2590000 },
      hectare: { name: 'Hectares', symbol: 'ha', factor: 10000 },
      acre: { name: 'Acres', symbol: 'ac', factor: 4046.86 },
      'square-foot': { name: 'Square Feet', symbol: 'ft²', factor: 0.092903 },
    },
  },
  volume: {
    name: 'Volume',
    baseUnit: 'liter',
    units: {
      liter: { name: 'Liters', symbol: 'L', factor: 1 },
      milliliter: { name: 'Milliliters', symbol: 'mL', factor: 0.001 },
      'cubic-meter': { name: 'Cubic Meters', symbol: 'm³', factor: 1000 },
      'gallon-us': { name: 'Gallons (US)', symbol: 'gal', factor: 3.78541 },
      'quart-us': { name: 'Quarts (US)', symbol: 'qt', factor: 0.946353 },
      'pint-us': { name: 'Pints (US)', symbol: 'pt', factor: 0.473176 },
    },
  },
  speed: {
    name: 'Speed',
    baseUnit: 'meters per second',
    units: {
        'meters-per-second': { name: 'Meters/sec', symbol: 'm/s', factor: 1 },
        'kilometers-per-hour': { name: 'Kilometers/hr', symbol: 'km/h', factor: 1/3.6 },
        'miles-per-hour': { name: 'Miles/hr', symbol: 'mph', factor: 0.44704 },
        knot: { name: 'Knots', symbol: 'kn', factor: 0.514444 },
    },
  },
};
