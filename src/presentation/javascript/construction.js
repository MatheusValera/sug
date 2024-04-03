/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const id = document.getElementById('id')
const idDelete = document.getElementById('idDelete')
const nameDelete = document.getElementById('nameDelete')
const editModal = document.getElementById('editModal')
const createdAt = document.getElementById('createdAt')
const company = document.getElementById('companySelect')
const status = document.getElementById('statusSelect')
const nameConstruction = document.getElementById('nameConstruction')
const startDate = document.getElementById('startDate')
const endDate = document.getElementById('endDate')
const deleteModal = document.getElementById('deleteModal')
const errorMessage = document.getElementById('errorMessage')
const errorMessageDelete = document.getElementById('errorMessageDelete')

VMasker(startDate).maskPattern('99/99/9999')
VMasker(endDate).maskPattern('99/99/9999')

function openModal (construction) {
  if (!construction) {
    nameConstruction.value = ''
    startDate.value = ''
    endDate.value = ''
    company.value = 0
    status.value = 0
  } else {
    id.value = construction.id
    createdAt.value = construction.createdAt.split('T')[0]
    startDate.value = construction.startDate.split('T')[0]
    endDate.value = construction.endDate.split('T')[0]
    status.value = construction.status
    nameConstruction.value = construction.name
    company.value = construction.companyId
  }
  editModal.style.display = 'block'
}

function requestModal () {
  const message = ''

  const payload = {
    name: nameConstruction.value,
    companyId: parseInt(company.value),
    startDate: new Date(startDate.value),
    endDate: new Date(endDate.value),
    status: status.value
  }
  console.log(payload.startDate)
  if (id.value) {
    payload.id = parseInt(id.value)

    const a = axios.post('/construction/updateConstruction', payload)
      .then(result => (result))
      .catch(function () {
        window.location.href = '/construcao'
      })

    console.log(a)
  } else {
    axios.post('/construction/saveConstruction', payload)
      .then(result => (result))
      .catch(function () {
        window.location.href = '/construcao'
      })
  }

  closeModal()
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
    id: parseInt(idDelete.value)
  }

  axios.post('/construction/deleteConstruction', payload)
    .then(() => {
      window.location.href = '/construcao'
    })
    .catch(error => {
      message = error.message
    })

  errorMessageDelete.value = message
}

// eslint-disable-next-line no-unused-vars
function filter () {
  const input = document.getElementById('search').value

  const table = document.getElementById('table')
  const trs = table.getElementsByTagName('tr')

  for (const tr of trs) {
    const td1 = tr.getElementsByTagName('td')[1]
    const td2 = tr.getElementsByTagName('td')[6]

    const value1 = td1?.textContent || td1?.innerText
    const value2 = td2?.textContent || td2?.innerText
    if (value1) {
      if (value1.toLowerCase().indexOf(input.toLowerCase()) > -1 || value2.toLowerCase().indexOf(input.toLowerCase()) > -1) {
        tr.style.display = ''
      } else {
        tr.style.display = 'none'
      }
    }
  }
}
