/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const userId = document.getElementById('userId')
const scheduleId = document.getElementById('schedule')
const description = document.getElementById('description')
const confirm = document.getElementById('confirm')
const errorMessage = document.getElementById('errorMessage')

async function saveReport () {
  if (description.value.length < 50 || scheduleId.value === 0 || !confirm.checked) {
    errorMessage.textContent = 'Preencha com todas as informações.'
    errorMessage.style.display = 'block'
  } else {
    errorMessage.style.display = 'none'
    const payload = {
      userId: parseInt(userId.value),
      scheduleId: parseInt(scheduleId.value),
      description: description.value
    }

    const response = await axios.post('/report/saveReport', payload)
  }
}
