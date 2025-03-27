import { calculateAge } from './clientUtils.js'

function isValidAge(DOB) {
  const age = calculateAge(DOB)
  return age >= 18
}
export { isValidAge }
