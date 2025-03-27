function toggleModal(modal, state = null) {
  if (state === 'open') return modal.showModal()
  if (state === 'close') return modal.close()

  modal.open ? modal.close() : modal.showModal()
}

function returnTrimmedString(string) {
  return string.replace(/\s+/g, '')
}

function calculateAge(DOB) {
  const birthDate = new Date(DOB)
  const currentDate = new Date()

  let age = currentDate.getFullYear() - birthDate.getFullYear()

  if (!birthdayHasPassed(birthDate, currentDate)) {
    age -= 1
  }

  return age
}

function birthdayHasPassed(birthDate, currentDate) {
  return (
    currentDate.getMonth() > birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() >= birthDate.getDate())
  )
}

function alertUnderAge(dateOfBirth, form) {
  dateOfBirth.setCustomValidity(
    'You must be at least 18 years old to have a black card.',
  )
  form.reportValidity()

  dateOfBirth.addEventListener(
    'input',
    () => {
      dateOfBirth.setCustomValidity('') // Clear message when user modifies the date
    },
    { once: true },
  )
}

function redirectUser(response) {
  if (response.redirected) {
    window.location.href = response.url
  } else {
    console.error('Redirect failed, check the response object', response)
  }
}

export {
  toggleModal,
  returnTrimmedString,
  calculateAge,
  birthdayHasPassed,
  alertUnderAge,
  redirectUser,
}
