const { celsiusToFahrenheit, fahrenheitToCelsius } = require('../src/math')

test('Should covert celsius to fahrenheit check ', () => {
    const temp = celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})

test('Should convert fahrenheit to celsius check ', () => {
    const ftc = fahrenheitToCelsius(32)
    expect(ftc).toBe(0)
})


