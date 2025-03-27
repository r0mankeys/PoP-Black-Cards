import {
  toggleModal,
  returnTrimmedString,
  calculateAge,
  alertUnderAge,
  redirectUser,
} from './clientUtils.js'
import { isValidAge } from './validate.js'
import { checkUserExistsInDB, postFormData } from './api.js'

const form = document.getElementById('blackCardForm')
const confirmModal = document.getElementById('confirmationModal')
const confirmModalYesButton = document.getElementById(
  'confirmationModalYesButton',
)
const alreadyInModal = document.getElementById('alreadyInModal')

let formPayload = null // Stores form data before final submission

// Utility to get trimmed input values
const getFormData = () => ({
  firstName: returnTrimmedString(document.getElementById('firstName').value),
  lastName: returnTrimmedString(document.getElementById('lastName').value),
  dateOfBirth: document.getElementById('dateOfBirth').value,
  age: calculateAge(document.getElementById('dateOfBirth').value),
  email: returnTrimmedString(document.getElementById('email').value),
  homeAddress: document.getElementById('homeAddress').value.trim(),
  blackCardNumber: document.getElementById('blackCardNumber').value,
})

// Validate form and open confirmation modal if needed
const handleFormValidation = async event => {
  event.preventDefault()

  const blackCardNumber = document.getElementById('blackCardNumber').value

  if (!isValidAge(document.getElementById('dateOfBirth').value)) {
    alertUnderAge(document.getElementById('dateOfBirth'), form)
    return
  }
  if (
    await checkUserExistsInDB(
      +blackCardNumber,
      document.getElementById('email').value,
    )
  ) {
    toggleModal(alreadyInModal, 'open')
    form.reset()
    return
  }

  // Store the valid form data and open confirmation modal
  formPayload = getFormData()
  toggleModal(confirmModal, 'open')
}

// Submit the form data after confirmation
const submitForm = async () => {
  if (!formPayload) return

  try {
    const response = await postFormData(formPayload)
    toggleModal(confirmModal, 'close')
    redirectUser(response)
  } catch (error) {
    console.error(error)
  } finally {
    formPayload = null // Reset to prevent submitting stale data
  }
}

// Event Listeners
form.addEventListener('submit', handleFormValidation)
confirmModalYesButton.addEventListener('click', submitForm)
document.querySelectorAll('.confirm-modal-close-button').forEach(button => {
  button.addEventListener('click', () => toggleModal(confirmModal, 'close'))
})
document
  .getElementById('alreadyInModalCloseButton')
  .addEventListener('click', () => {
    toggleModal(alreadyInModal, 'close')
  })
