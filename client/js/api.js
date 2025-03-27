async function postFormData(formData) {
  try {
    const response = await fetch('/thankyou', {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`
      if (response.status === 400) errorMessage = 'Invalid input data.'
      if (response.status === 500)
        errorMessage = 'Server error, please try again later.'
      throw new Error(errorMessage)
    }
    return response
  } catch (error) {
    console.error(error)
  }
}

async function checkUserExistsInDB(blackCardNumber, email) {
  try {
    const response = await fetch('/checkuser', {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blackCardNumber, email }),
    })
    if (+response.status === 404) {
      return false
    } else if (+response.status === 200) {
      return true
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  } catch (error) {
    return error
  }
}

export { postFormData, checkUserExistsInDB }
