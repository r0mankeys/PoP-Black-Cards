async function doesUersExistInDB(pool, blackCardNumber, email) {
  console.log(blackCardNumber, email)
  const query = await pool.query(
    'SELECT * FROM black_card_users WHERE card_number = $1 OR email = $2',
    [blackCardNumber, email],
  )
  return query && query.rows.length > 0
}

async function addUserToDB(pool, user) {
  const query = {
    text: 'INSERT INTO black_card_users (full_name, card_number, date_of_birth, age, email, home_address) VALUES ($1, $2, $3, $4, $5, $6)',
    values: [
      user.fullName,
      user.cardNumber,
      user.DOB,
      user.age,
      user.email,
      user.address,
    ],
  }

  try {
    const result = await pool.query(query)
    return result.rowCount > 0
  } catch (error) {
    throw error
  }
}

export { doesUersExistInDB, addUserToDB }
