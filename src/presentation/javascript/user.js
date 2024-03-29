/* eslint-disable no-undef */

document.addEventListener('DOMContentLoaded', function () {
  const editUserForm = document.getElementById('editUserForm')
  const editButtons = document.querySelectorAll('.editBtn')
  const addUser = document.querySelectorAll('.addUser')
  const deleteButtons = document.querySelectorAll('.deleteBtn')
  const editModal = document.getElementById('editModal')
  const closeModal = document.querySelector('.closeModal')
  const errorMessage = document.getElementById('errorMessage')

  const nameInput = document.getElementById('name')
  const categoryRulesInput = document.getElementById('categoryRulesInput')
  const emailInput = document.getElementById('email')
  const cpfInput = document.getElementById('cpf')
  const passwordInput = document.getElementById('password')
  const phoneInput = document.getElementById('phone')
  const zipCodeInput = document.getElementById('zipCode')
  const cityInput = document.getElementById('city')
  const roadInput = document.getElementById('road')
  const officeInput = document.getElementById('officeSelect')
  const numberHouseInput = document.getElementById('numberHouse')
  const neighborhoodInput = document.getElementById('neighborhood')
  const createdAtInput = document.getElementById('createdAt')
  const userIdInput = document.getElementById('userId')
  const adminInput = document.getElementById('admin')

  VMasker(zipCodeInput).maskPattern('99999-999')
  VMasker(phoneInput).maskPattern('(99) 99999-9999')
  VMasker(cpfInput).maskPattern('999.999.999-99')
  VMasker(numberHouseInput).maskPattern('99999')

  zipCodeInput.addEventListener('blur', completeInformationAddress)

  editButtons.forEach(button => {
    button.addEventListener('click', function () {
      const userId = parseInt(button.dataset.id)
      // eslint-disable-next-line no-undef
      axios.post('/user/getUser', { key: 'id', value: userId })
        .then(function (response) {
          const data = JSON.parse(response.data)

          console.log(data)
          nameInput.value = data.name
          emailInput.value = data.email
          cpfInput.value = data.cpf
          userIdInput.value = userId
          categoryRulesInput.value = data.categoryRules

          passwordInput.value = data.password
          phoneInput.value = data.phone
          zipCodeInput.value = data.zipCode
          cityInput.value = data.city
          roadInput.value = data.road
          officeInput.value = data.office
          numberHouseInput.value = data.numberHouse
          neighborhoodInput.value = data.neighborhood
          createdAtInput.value = new Date(data.createdAt)
          adminInput.checked = data.admin
        })
        .catch(function (error) {
          console.error(error)
        })
      editModal.style.display = 'block'
    })
  })

  // Fechar o modal ao clicar no botão de fechar
  closeModal.addEventListener('click', function () {
    editModal.style.display = 'none'
  })

  deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
      const userId = button.dataset.id
      // eslint-disable-next-line no-undef
      axios.post('/user/deleteUser', { id: userId })
        .then(function (response) {
          window.location.reload()
        })
        .catch(function (error) {
          console.error(error)
        })
    })
  })

  editUserForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const id = document.getElementById('userId').value
    const createdAt = document.getElementById('createdAt').value
    const name = document.getElementById('name').value
    const categoryRules = parseInt(document.getElementById('categoryRulesInput').value)
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const cpf = document.getElementById('cpf').value
    const phone = document.getElementById('phone').value
    const zipCode = document.getElementById('zipCode').value
    const city = document.getElementById('city').value
    const road = document.getElementById('road').value
    const office = document.getElementById('officeSelect').value
    const numberHouse = document.getElementById('numberHouse').value
    const neighborhood = document.getElementById('neighborhood').value
    const admin = document.getElementById('admin').checked

    if (id) {
      // eslint-disable-next-line no-undef
      axios.post('/user/updateUser', {
        id,
        createdAt,
        name,
        email,
        admin,
        password,
        cpf,
        phone,
        zipCode,
        city,
        road,
        office,
        numberHouse,
        neighborhood,
        categoryRules
      })
        .then(function (response) {
          window.location.reload()
        })
        .catch(function (error) {
          console.error(error)
          errorMessage.textContent = error.message
          errorMessage.style.display = 'block'
        })
    } else {
      // eslint-disable-next-line no-undef
      axios.post('/user/saveUser', {
        name,
        email,
        admin,
        password,
        cpf,
        phone,
        zipCode,
        city,
        road,
        office,
        numberHouse,
        neighborhood,
        categoryRules
      })
        .then(function (response) {
          window.location.reload()
        })
        .catch(function (error) {
          console.error(error)
          errorMessage.textContent = error.message
          errorMessage.style.display = 'block'
        })
    }
  })

  addUser.forEach(button => {
    button.addEventListener('click', function () {
      // eslint-disable-next-line no-undef
      console.log('a')
      nameInput.value = ''
      emailInput.value = ''
      cpfInput.value = ''
      categoryRulesInput.value = 0

      passwordInput.value = ''
      phoneInput.value = ''
      zipCodeInput.value = ''
      cityInput.value = ''
      roadInput.value = ''
      officeInput.value = ''
      numberHouseInput.value = ''
      neighborhoodInput.value = ''
      adminInput.checked = false

      editModal.style.display = 'block'
    })
  })

  async function completeInformationAddress () {
    const zipCode = zipCodeInput.value
    try {
      const result = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
      if (result.data) {
        cityInput.value = result.data.localidade
        roadInput.value = result.data.logradouro
        neighborhoodInput.value = result.data.bairro
      }
    } catch (e) {}
  }
})
