/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const id = document.getElementById('id')
const createdAt = document.getElementById('createdAt')
const user = document.getElementById('userId')
const construction = document.getElementById('constructionId')
const allocation = document.getElementById('allocationSelect')
const description = document.getElementById('description')
const idDelete = document.getElementById('idDelete')
const nameDelete = document.getElementById('nameDelete')
const editModal = document.getElementById('editModal')
const deleteModal = document.getElementById('deleteModal')
const errorMessage = document.getElementById('errorMessage')
const errorMessageDelete = document.getElementById('errorMessageDelete')

async function completeAllocation () {
  try {
    const response = await axios.post('/construction/getConstructions', {})
    const constructions = JSON.parse(response.data)

    const response2 = await axios.post('/allocation/getAllocations', {})
    const allocations = JSON.parse(response2.data)

    if (!Array.isArray(constructions)) {
      console.error('Dados recebidos não são uma array', constructions)
      return
    }

    const auxA = allocations.filter(x => x.id === parseInt(allocation.value))[0]

    const constructionsToUser = constructions.filter(x => x?.id === auxA.constructionId)[0]

    construction.value = constructionsToUser.id
  } catch (error) {
  }
}

async function completeSelect () {
  allocation.innerHTML = ''
  try {
    const response = await axios.post('/allocation/getAllocations', {})
    const allocations = JSON.parse(response.data)

    if (!Array.isArray(allocations)) {
      console.error('Dados recebidos não são uma array', allocations)
      return
    }
    const res = await axios.post('/construction/getConstructions', {})
    const constructions = JSON.parse(res.data)

    const allocationToUser = allocations
      .filter(x => x?.userId === parseInt(user.value))
      .map(a => ({ ...a, nameConstruction: constructions.filter(c => c?.id === a.constructionId)[0]?.name }))

    allocationToUser.forEach(c => {
      const option = document.createElement('option')
      option.text = `${c.createdAt.split('T')[0]} - ${c.nameConstruction}`
      option.value = c.id
      allocation.appendChild(option)
    })
  } catch (error) {
    console.error('Erro ao completar alocação:', error)
  }
}

function openModal (schedule) {
  allocation.innerHTML = ''
  if (!schedule) {
    construction.value = 0
    allocation.value = 0
    description.value = ''
    status.value = 0
    completeSelect()
  } else {
    id.value = schedule.id
    createdAt.value = schedule.createdAt
    user.value = schedule.userId
    construction.value = schedule.constructionId
    allocation.value = schedule.allocationId
    description.value = schedule.description
  }
  editModal.style.display = 'block'
}

function requestModal () {
  let message = 'Sua operação foi concluída com sucesso'

  const payload = {
    userId: parseInt(user.value),
    constructionId: parseInt(construction.value),
    allocationId: parseInt(allocation.value),
    dateSchedule: new Date(dateSchedule.value),
    status: status.value
  }
  payload.dateSchedule.setHours(payload.dateSchedule.getHours() + 3)
  if (id.value) {
    payload.id = parseInt(id.value)
    payload.createdAt = createdAt.value

    const a = axios.post('/schedule/updateSchedule', payload)
      .then(result => (result))
      .catch(function () {
        if (result.message) {
          message = result.message
        }
        messageToModal.innerHTML = message
        informationModal.style.display = 'block'
      })
  } else {
    axios.post('/schedule/saveSchedule', payload)
      .then(result => (result))
      .catch(function () {
        message = result.message
      })
  }
}

function closeModal () {
  editModal.style.display = 'none'
}

function openModalDelete (obj) {
  idDelete.value = parseInt(obj.id)
  nameDelete.value = obj.name
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

  axios.post('/report/deleteReport', payload)
    .then(() => {
      window.location.href = '/agendamento'
    })
    .catch(error => {
      message = error.message
    })

  errorMessageDelete.value = message
}
