import { PrismaNotificationRepository } from '../../../data/repository/notification/NotificationRepository'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeCompanyService } from '../../../service/company/CompanyServiceFactory'
import { makeConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { GetNotificationService } from '../../../service/notification/getNotifications/GetReportsService'
import { makeUserService } from '../../../service/user/UserServiceFactory'
import { ConstructionController } from './ConstructionController'

export const makeConstructionController = (): ConstructionController => {
  const constructionService = makeConstructionService()
  const companyService = makeCompanyService()
  const userService = makeUserService()
  const notificationRepository = new PrismaNotificationRepository(prismaClient.getClient())
  const notificationService = new GetNotificationService(notificationRepository)
  return new ConstructionController(constructionService, companyService, userService, notificationService)
}
