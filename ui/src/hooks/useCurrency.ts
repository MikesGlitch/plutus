import Currency from 'currency.js'

export const useCurrency = () => {
  const commonOptions: Currency.Options = { symbol: '£', precision: 2, errorOnInvalid: true }

  // takes the money in pennies (in my case) and multiplies it by a cent (100) putting it into pounds then formatting it
  const fromPenniesToCurrency = (valueInPennies: number) => {
    return Currency(valueInPennies, { ...commonOptions, fromCents: true }).format()
  }

  // Conert value in pounds and pennies (23.32) to just pennies (2332) for storage in integer
  const toPennies = (valueInPoundsAndPennies: string) => {
    return Currency(valueInPoundsAndPennies, commonOptions).intValue
  }

  // Clean the human entered string to remove any extra decimals or unuseful values
  const cleanValue = (valueInPoundsAndPennies: string) => {
    return Currency(valueInPoundsAndPennies, commonOptions).toString()
  }

  // Should allow any number with an optional decimal, but if specified it needs precision of 2
  // Valid: 0.00, 0, -12.23 -3
  // Invalid: 0.0, -12.3
  const isValidCurrency = (value: string) => {
    const validCurrencyRegex = /^-?\d+(?:\.\d{2,2})?$/ // lord have mercy on me - https://www.regextester.com/
    if (validCurrencyRegex.test(value)) {
      return true
    }

    return false
  }

  return {
    fromPenniesToCurrency,
    toPennies,
    isValidCurrency,
    cleanValue
  }
}
