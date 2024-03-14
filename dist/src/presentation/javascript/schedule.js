/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const id = document.getElementById('id')
const createdAt = document.getElementById('createdAt')
const user = document.getElementById('usersSelect')
const construction = document.getElementById('constructionSelect')
const allocationId = document.getElementById('allocationId')
const allocationCreatedAt = document.getElementById('allocationCreatedAt')
const dateSchedule = document.getElementById('dateSchedule')
const status = document.getElementById('statusSelect')
const idDelete = document.getElementById('idDelete')
const editModal = document.getElementById('editModal')
const deleteModal = document.getElementById('deleteModal')
const errorMessage = document.getElementById('errorMessage')
const errorMessageDelete = document.getElementById('errorMessageDelete')

VMasker(dateSchedule).maskPattern('99/99/9999')

user.addEventListener('blur', completeConstruction().then(() => {}))

construction.addEventListener('blur', completeAllocation)

async function completeConstruction () {
  const constructionR = await axios.post('/construction/getConstructions', {})
    .then(result => (result.data))

  console.log(constructionR)

  const constructionToUser = constructionR.filter(x => x?.userId === user.value)

  for (const c in constructionToUser) {
    const option = document.createElement('option')
    option.text = c.name
    option.value = c.id
    construction.add(option)
  }

  console.log(constructionToUser)
  if (!constructionToUser.length) {
    errorMessage.textContent = 'Usuário não alocação para nenhuma construção.'
    errorMessage.style.display = 'block'
  }
}

async function completeAllocation () {
  const allocationR = await axios.post('/allocation/getAllocation', { option: 5, id: construction.value })

  const allocationToUser = allocationR.filter(x => x?.userId === user.value)[0]

  allocationCreatedAt.value = allocationToUser.createdAt
}

function openModal (schedule) {
  if (!schedule) {
    user.value = 0
    construction.value = 0
    allocationId.value = 0
    allocationCreatedAt.value = null
    dateSchedule.value = null
    status.value = 0
  } else {
    id.value = schedule.id
    createdAt.value = schedule.createdAt
    user.value = schedule.userId
    status.value = schedule.status
    construction.value = schedule.constructionId
    allocationId.value = schedule.allocationId
    dateSchedule.value = schedule.dateSchedule
  }
  editModal.style.display = 'block'
}

function requestModal () {
  const message = ''

  const payload = {
    userId: parseInt(user.value),
    constructionId: parseInt(construction.value),
    allocationId: parseInt(allocationId.value),
    dateSchedule: dateSchedule.value,
    status: status.value
  }
  if (id.value) {
    payload.id = parseInt(id.value)
    payload.createdAt = createdAt.value

    const a = axios.post('/schedule/updateSchedule', payload)
      .then(result => (result))
      .catch(function () {
        window.location.href = '/schedule'
      })

    console.log(a)
  } else {
    axios.post('/schedule/saveSchedule', payload)
      .then(result => (result))
      .catch(function () {
        window.location.href = '/schedule'
      })
  }

  closeModal()
}

function closeModal () {
  editModal.style.display = 'none'
}

function openModalDelete (id) {
  idDelete.value = parseInt(id)
  deleteModal.style.display = 'block'
}

function closeModalDelete () {
  deleteModal.style.display = 'none'
}

function deleteModalRequest () {
  let message = ''
  const payload = {
    id: idDelete.value
  }

  axios.post('/schedule/deleteSchedule', payload)
    .then(() => {
      window.location.href = '/schedule'
    })
    .catch(error => {
      message = error.message
    })

  errorMessageDelete.value = message
}
