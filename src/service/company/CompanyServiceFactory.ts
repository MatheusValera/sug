import { makeGetCompanyService } from './getCompany/GetCompanyServiceFactory'
import { makeGetCompaniesService } from './getCompanies/GetCompaniesServiceFactory'
import { makeSaveCompanyService } from './saveCompany/SaveCompanyServiceFactory'
import { makeDeleteCompanyService } from './deleteCompany/DeleteCompanyServiceFactory'
import { makeUpdateCompanyService } from './updateCompany/UpdateCompanyServiceFactory'
import { IGetCompanyService } from '../../domain/service/company/getCompany/IGetCompanyService'
import { ISaveCompanyService } from '../../domain/service/company/saveCompany/ISaveCompanyService'
import { IGetCompaniesService } from '../../domain/service/company/getCompanies/IGetCompaniesService'
import { IDeleteCompanyService } from '../../domain/service/company/deleteCompany/IDeleteCompanyService'
import { IUpdateCompanyService } from '../../domain/service/company/updateCompany/IUpdateCompanyService'

export interface ICompanyService {
  getCompanyService: IGetCompanyService
  getCompaniesService: IGetCompaniesService
  saveCompanyService: ISaveCompanyService
  updateCompanyService: IUpdateCompanyService
  deleteCompanyService: IDeleteCompanyService
}

export const makeCompanyService = (): ICompanyService => {
  const getCompanyService = makeGetCompanyService().getCompanyService
  const saveCompanyService = makeSaveCompanyService().saveCompanyService
  const updateCompanyService = makeUpdateCompanyService().updateCompanyService
  const deleteCompanyService = makeDeleteCompanyService().deleteCompanyService
  const getCompaniesService = makeGetCompaniesService().getCompaniesService

  return {
    getCompanyService,
    saveCompanyService,
    updateCompanyService,
    deleteCompanyService,
    getCompaniesService
  }
}
