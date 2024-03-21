const buttonsUserFeature = [
  {
    category: 3,
    href: '/usuarios',
    name: 'Gerenciar usuários',
    adminHasNecessary: true
  }
]

const buttonsAllocationFeature = [
  {
    category: 1,
    href: '/minhas-alocacoes',
    name: 'Ver minhas alocações',
    adminHasNecessary: false
  },
  {
    category: 2,
    href: '/alocacoes',
    name: 'Ver alocações',
    adminHasNecessary: false
  },
  {
    category: 3,
    href: '/alocacao',
    name: 'Gerenciar alocações',
    adminHasNecessary: true
  }
]

const buttonsCompanyFeature = [
  {
    category: 3,
    href: '/companhia',
    name: 'Gerenciar companhias',
    adminHasNecessary: true
  }
]

const buttonsConstructionFeature = [
  {
    category: 2,
    href: '/construcoes',
    name: 'Ver construções',
    adminHasNecessary: false
  },
  {
    category: 3,
    href: '/construcao',
    name: 'Gerenciar construções',
    adminHasNecessary: true
  }
]

const buttonsScheduleFeature = [
  {
    category: 1,
    href: '/meus-agendamentos',
    name: 'Ver meus agendamentos',
    adminHasNecessary: false
  },
  {
    category: 2,
    href: '/agendamentos',
    name: 'Ver agendamentos',
    adminHasNecessary: false
  },
  {
    category: 3,
    href: '/agendamento',
    name: 'Gerenciar agendamentos',
    adminHasNecessary: true
  }
]

const buttonsReportFeature = [
  {
    category: 1,
    href: '/meus/relatorios',
    name: 'Ver meus relatórios',
    adminHasNecessary: false
  },
  {
    category: 1,
    href: '/entregar-relatorio',
    name: 'Entregar relatório',
    adminHasNecessary: false
  },
  {
    category: 2,
    href: '/relatorios',
    name: 'Ver relatórios',
    adminHasNecessary: false
  },
  {
    category: 3,
    href: '/relatorio',
    name: 'Gerenciar relatórios',
    adminHasNecessary: true
  }
]

export const getUserButtons = async (user: any): Promise<any> => {
  const buttonsToUser: any = {}

  const buttonU = buttonsUserFeature.filter(
    b =>
      user.admin || (b.category <= user.categoryRules && (!b.adminHasNecessary || (b.adminHasNecessary === user.admin)))
  )

  const buttonA = buttonsAllocationFeature.filter(
    b =>
      user.admin || (b.category <= user.categoryRules && (!b.adminHasNecessary || (b.adminHasNecessary === user.admin)))
  )

  const buttonC = buttonsCompanyFeature.filter(
    b =>
      user.admin || (b.category <= user.categoryRules && (!b.adminHasNecessary || (b.adminHasNecessary === user.admin)))
  )

  const buttonCo = buttonsConstructionFeature.filter(
    b =>
      user.admin || (b.category <= user.categoryRules && (!b.adminHasNecessary || (b.adminHasNecessary === user.admin)))
  )

  const buttonS = buttonsScheduleFeature.filter(
    b =>
      user.admin || (b.category <= user.categoryRules && (!b.adminHasNecessary || (b.adminHasNecessary === user.admin)))
  )

  const buttonR = buttonsReportFeature.filter(
    b =>
      user.admin || (b.category <= user.categoryRules && (!b.adminHasNecessary || (b.adminHasNecessary === user.admin)))
  )

  buttonsToUser.buttonsUser = buttonU
  buttonsToUser.buttonsAllocation = buttonA
  buttonsToUser.buttonsCompany = buttonC
  buttonsToUser.buttonsConstruction = buttonCo
  buttonsToUser.buttonsSchedule = buttonS
  buttonsToUser.buttonsReport = buttonR

  return buttonsToUser
}
