const valueInput = document.getElementById('value');
const fromUnitSelect = document.getElementById('from-unit');
const fromUnitTypeSelect = document.getElementById('from-unit-type');
const toUnitTypeSelect = document.getElementById('to-unit-type');
const convertBtn = document.getElementById('convert-btn');
const resultElement = document.getElementById('result');

const units = {
    length: [
        { name: 'Meter', conversionFactor: 1 },
        { name: 'Centimeter', conversionFactor: 0.01 },
        { name: 'Millimeter', conversionFactor: 0.001 },
        { name: 'Kilometer', conversionFactor: 1000 },
        { name: 'Inch', conversionFactor: 0.0254 },
        { name: 'Foot', conversionFactor: 0.3048 },
        { name: 'Yard', conversionFactor: 0.9144 },
        { name: 'Mile', conversionFactor: 1609.34 },
    ],
    weight: [
        { name: 'Gram', conversionFactor: 1 },
        { name: 'Kilogram', conversionFactor: 1000 },
        { name: 'Milligram', conversionFactor: 0.001 },
        { name: 'Ton', conversionFactor: 1000000 },
        { name: 'Pound', conversionFactor: 453.592 },
        { name: 'Ounce', conversionFactor: 28.3495 },
    ],
    temperature: [
        { name: 'Celsius', conversionFactor: 1, offset: 0 },
        { name: 'Fahrenheit', conversionFactor: 1.8, offset: 32 },
        { name: 'Kelvin', conversionFactor: 1, offset: 273.15 },
    ],
};

function generateUnitTypes(unitType) {
    const unitTypes = units[unitType];
    fromUnitTypeSelect.innerHTML = '';
    toUnitTypeSelect.innerHTML = '';
    unitTypes.forEach((unit) => {
        const option = document.createElement('option');
        option.value = unit.name;
        option.textContent = unit.name;
        fromUnitTypeSelect.appendChild(option.cloneNode(true));
        toUnitTypeSelect.appendChild(option);
    });
}

fromUnitSelect.addEventListener('change', () => {
    const unitType = fromUnitSelect.value;
    generateUnitTypes(unitType);
});

generateUnitTypes('length');

convertBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const value = parseFloat(valueInput.value);
    const fromUnitType = fromUnitTypeSelect.value;
    const toUnitType = toUnitTypeSelect.value;
    const unitType = fromUnitSelect.value;
    const fromUnit = units[unitType].find((unit) => unit.name === fromUnitType);
    const toUnit = units[unitType].find((unit) => unit.name === toUnitType);
    let result;
    if (unitType === 'temperature') {
        result = (value - fromUnit.offset) / fromUnit.conversionFactor * toUnit.conversionFactor + toUnit.offset;
    } else {
        result = value * fromUnit.conversionFactor / toUnit.conversionFactor;
    }
    resultElement.textContent = `${value} ${fromUnitType} is equal to ${result} ${toUnitType}`;
});
