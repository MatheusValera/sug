/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const userId = document.getElementById('userId')
const tableReports = document.getElementById('tableReports')
const scheduleId = document.getElementById('schedule')
const description = document.getElementById('description')
const confirm = document.getElementById('confirm')
const errorMessage = document.getElementById('errorMessage')
const informationModal = document.getElementById('informationModal')
const messageToModal = document.getElementById('message')
const messageToModalP = document.getElementById('messageP')

async function saveReport () {
  if (scheduleId.value === '0') {
    errorMessage.textContent = 'Você não tem relatórios pendentes.'
    errorMessage.style.display = 'block'
  } else if (description.value.length < 50 || !confirm.checked) {
    errorMessage.textContent = 'Preencha com todas as informações.'
    errorMessage.style.display = 'block'
  } else {
    errorMessage.style.display = 'none'
    const payload = {
      userId: parseInt(userId.value),
      scheduleId: parseInt(scheduleId.value),
      description: description.value
    }

    const result = await axios.post('/report/saveReport', payload).then(result => (result))
      .then(result => {
        let message = 'Operação realizada com sucesso!'
        if (result.message) {
          message = result.message
        }
        messageToModalP.textContent = message
        messageToModalP.style.display = 'block'
        informationModal.style.display = 'block'
      })
      .catch(function (e) {
        console.log(messageToModal)
        messageToModal.textContent = 'Erro interno, tentar novamente.'
        messageToModal.style.display = 'block'
        informationModal.style.display = 'block'
      })
  }
}

function reload () {
  window.location.href = '/meus-relatorios'
}

async function completeReports () {
  try {
    const id = parseInt(scheduleId.value)
    const response = await axios.post('/report/getReports', { id, option: 5 })
    const reports = JSON.parse(response.data)

    console.log(reports)

    if (!Array.isArray(reports)) {
      console.error('Dados recebidos não são uma array', reports)
    }
    const aux = [
      { createdAt: new Date(), description: 'Algo', user: { name: 'Matheus', office: 'Engenheiro' } }
    ]

    for (const report of reports) {
      console.log(report)
      const tr = document.createElement('tr')
      const cel1 = document.createElement('td')
      cel1.textContent = report.createdAt?.toLocaleString('pt-Br').split(',')[0]
      const cel2 = document.createElement('td')
      cel2.textContent = report.description
      const cel3 = document.createElement('td')
      cel3.textContent = report.user.name
      const cel4 = document.createElement('td')
      cel4.textContent = report.user.office
      const cel5 = document.createElement('td')
      cel5.innerHTML = '<div class="form-check form-check-flat form-check-primary"><label class="form-check-label" for="admin">Aprovado<input class="form-check-input" type="checkbox" id="approved" name="approved"=""><i class="input-helper"></i></label></div>'

      tr.appendChild(cel1)
      tr.appendChild(cel2)
      tr.appendChild(cel3)
      tr.appendChild(cel4)
      tr.appendChild(cel5)
      tableReports.getElementsByTagName('tbody')[0].appendChild(tr)
    }
  } catch (error) {
    console.log(error)
  }
}
