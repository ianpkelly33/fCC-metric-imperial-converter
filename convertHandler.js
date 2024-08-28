function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const numInput = input.match(/^[\d./]+/g);
    const numString = numInput ? numInput[0] : '1';
    if ((numString.match(/\//g) || []).length > 1) {
      return 'invalid number';
    };
    if (numString.includes('/')) {
      const [numerator, denominator] = numString.split('/').map(Number);
      result = numerator / denominator;
    } else {
      result = Number(numString);
    };
    if (isNaN(result) || !isFinite(result)) {
      return 'invalid number';
    };
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const unitRegex = /[a-zA-Z]+$/g;
    result = input.match(unitRegex)[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(result)) {
      return 'invalid unit';
    };
    return result === 'l' ? 'L' : result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    let result = unitMap[initUnit];
    return result;
  };

  this.spellOutUnit = function(unit) {
    const unitFull = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return unitFull[unit] || 'invalid unit';
  };
  
  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,
      kg: 1 / 0.453592
    };
    return parseFloat((initNum * conversionRates[initUnit]).toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
};

module.exports = ConvertHandler;
