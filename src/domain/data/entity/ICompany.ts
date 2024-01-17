export interface ICompany {
  readonly cnpj: string
  readonly contact: string
  readonly createdAt: Date
  readonly updatedAt?: Date
  readonly nameCompany: string
  readonly nameResponsiblePerson: string
  readonly contactResponsiblePerson: string
}
