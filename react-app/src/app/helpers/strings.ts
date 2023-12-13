export function convertColumnNamesToDisplayText(inputString: string) {
  const newStr = inputString
    .replace(/([A-Z])/g, ' $1') // insert a space before all capital letters
    .replace(/^./, (str: string) => str.toUpperCase()) // capitalize the first letter of each word
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2'); // insert a space between last lowercase & uppercase letter
  return newStr;
}
