document.addEventListener('DOMContentLoaded', function () {
  const editUserForm = document.getElementById('editUserForm')
  const editButtons = document.querySelectorAll('.editBtn')
  const deleteButtons = document.querySelectorAll('.deleteBtn')
  const editModal = document.getElementById('editModal')
  const closeModal = document.querySelector('.closeModal')

  const nameInput = document.getElementById('name')
  const emailInput = document.getElementById('email')
  const cpfInput = document.getElementById('cpf')
  const passwordInput = document.getElementById('password')
  const phoneInput = document.getElementById('phone')
  const zipCodeInput = document.getElementById('zipCode')
  const cityInput = document.getElementById('city')
  const roadInput = document.getElementById('road')
  const officeInput = document.getElementById('office')
  const numberHouseInput = document.getElementById('numberHouse')
  const neighborhoodInput = document.getElementById('neighborhood')
  const createdAtInput = document.getElementById('createdAt')
  const userIdInput = document.getElementById('userId')
  const adminInput = document.getElementById('admin')

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
      // Carregar os dados do usuário no modal (isso depende da implementação)
      // Por exemplo, você pode fazer uma requisição AJAX para obter os dados do usuário
      // e preencher os campos do formulário de edição
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
          console.log(response.data)
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
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const cpf = document.getElementById('cpf').value
    const phone = document.getElementById('phone').value
    const zipCode = document.getElementById('zipCode').value
    const city = document.getElementById('city').value
    const road = document.getElementById('road').value
    const office = document.getElementById('office').value
    const numberHouse = document.getElementById('numberHouse').value
    const neighborhood = document.getElementById('neighborhood').value
    const admin = document.getElementById('admin').value === '0'

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
      neighborhood
    })
      .then(function (response) {
        console.log(response.data)
        window.location.reload()
      })
      .catch(function (error) {
        console.error(error)
      })
  })
})
