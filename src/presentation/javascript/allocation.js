/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const id = document.getElementById('id')
const idDelete = document.getElementById('idDelete')
const nameDelete = document.getElementById('nameDelete')
const editModal = document.getElementById('editModal')
const createdAt = document.getElementById('createdAt')
const construction = document.getElementById('constructionSelect')
const user = document.getElementById('usersSelect')
const status = document.getElementById('statusSelect')
const deleteModal = document.getElementById('deleteModal')
const errorMessage = document.getElementById('errorMessage')
const errorMessageDelete = document.getElementById('errorMessageDelete')

function openModal (allocation) {
  if (!allocation) {
    user.value = 0
    construction.value = 0
    status.value = 0
  } else {
    id.value = allocation.id
    createdAt.value = allocation.createdAt
    user.value = allocation.userId
    status.value = allocation.status
    construction.value = allocation.constructionId
  }
  editModal.style.display = 'block'
}

function requestModal () {
  const message = ''

  const payload = {
    userId: parseInt(user.value),
    constructionId: parseInt(construction.value),
    status: status.value
  }
  if (id.value) {
    payload.id = parseInt(id.value)
    payload.createdAt = createdAt.value

    const a = axios.post('/allocation/updateAllocation', payload)
      .then(result => {
        if (result?.data?.message) { errorMessage.textContent = result.data.message } else { window.location.reload() }
        errorMessage.style.display = 'block'
      })
      .catch(function () {
        window.location.href = '/alocacao'
      })

    console.log(a)
  } else {
    axios.post('/allocation/saveAllocation', payload)
      .then(result => {
        if (result?.data?.message) {
          errorMessage.textContent = result.data.message
          errorMessage.style.display = 'block'
        } else {
          // closeModal()
          // window.location.reload()
        }
      })
      .catch(function () {
        window.location.href = '/alocacao'
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
    id: parseInt(idDelete.value)
  }

  axios.post('/allocation/deleteAllocation', payload)
    .then(() => {
      window.location.href = '/alocacao'
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
    const td1 = tr.getElementsByTagName('td')[3]
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
