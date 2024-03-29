/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const id = document.getElementById('id')
const cnpj = document.getElementById('cnpj')
const contact = document.getElementById('contact')
const idDelete = document.getElementById('idDelete')
const nameDelete = document.getElementById('nameDelete')
const editModal = document.getElementById('editModal')
const createdAt = document.getElementById('createdAt')
const nameCompany = document.getElementById('nameCompany')
const deleteModal = document.getElementById('deleteModal')
const errorMessage = document.getElementById('errorMessage')
const errorMessageDelete = document.getElementById('errorMessageDelete')
const nameResponsiblePerson = document.getElementById('nameResponsiblePerson')
const contactResponsiblePerson = document.getElementById('contactResponsiblePerson')

VMasker(contact).maskPattern('(99) 99999-9999')
VMasker(cnpj).maskPattern('99.999.999/9999-99')
VMasker(contactResponsiblePerson).maskPattern('(99) 99999-9999')

function openModal (company) {
  if (!company) {
    cnpj.value = ''
    contact.value = ''
    nameCompany.value = ''
    nameResponsiblePerson.value = ''
    contactResponsiblePerson.value = ''
  } else {
    id.value = company.id
    createdAt.value = company.createdAt
    cnpj.value = company.cnpj
    contact.value = company.contact
    nameCompany.value = company.nameCompany
    nameResponsiblePerson.value = company.nameResponsiblePerson
    contactResponsiblePerson.value = company.contactResponsiblePerson
  }
  editModal.style.display = 'block'
}

function requestModal () {
  const message = ''

  const payload = {
    cnpj: cnpj.value,
    contact: contact.value,
    nameCompany: nameCompany.value,
    nameResponsiblePerson: nameResponsiblePerson.value,
    contactResponsiblePerson: contactResponsiblePerson.value
  }
  if (id.value) {
    payload.id = id.value
    payload.createdAt = createdAt.value

    const a = axios.post('/company/updateCompany', payload)
      .then(result => (result))
      .catch(function () {
        window.location.href = '/companhia'
      })

    console.log(a)
  } else {
    axios.post('/company/saveCompany', payload)
      .then(result => (result))
      .catch(function () {
        window.location.href = '/companhia'
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

  axios.post('/company/deleteCompany', payload)
    .then(() => {
      window.location.href = '/companhia'
    })
    .catch(error => {
      message = error.message
    })

  errorMessageDelete.value = message
}
