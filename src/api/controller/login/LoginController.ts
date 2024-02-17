import express from 'express'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { INext } from '../../common/INext'
import { IRequest } from '../../common/IRequest'
import { IResponse } from '../../common/IResponse'
import { IController } from '../../common/IController'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { EncryptAdapter } from '../../../infra/cryptography/EncryptAdapter'
import { BadRequestResponse } from '../../common/responses/BadRequestResponse'
import { PrismaUserRepository } from '../../../data/repository/user/UserRepository'

export class LoginController implements IController {
  public router = express.Router()

  constructor (private readonly checkPasswords: EncryptAdapter) {
    const localStrategy = new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true
      },
      this.authenticate.bind(this)
    )
    passport.use('local', localStrategy)

    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/login', this.handler.bind(this))
    this.router.post('/login', this.login.bind(this))
  }

  async handler (req: IRequest, res: IResponse): Promise<IResponse> {
    if (req.user) {
      res.status(200).redirect('/center')
      return
    }
    res.status(200).render('./login.pug', {})
  }

  async _refreshSession (req): Promise<void> {
    return new Promise((resolve) => {
      req.session.regenerate(resolve)
    })
  }

  async login (req: IRequest, res: IResponse, next: INext): Promise<IResponse> {
    if (req.user) {
      res.redirect('/center')
      return
    }

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    const password: string = req.body.password?.trim() ?? undefined
    const email: string = req.body.email?.trim() ?? undefined

    if (!email || !password) {
      await BadRequestResponse.handler(res, 'Invalid request')
      return
    }
    passport.authenticate('local', null, async (err, user, info) => {
      if (err) {
        console.error(err)
        res.status(500).json({
          success: false,
          message: 'Um erro inesperado aconteceu. Tente novamente em alguns minutos.'
        })
        return
      }

      if (!user) {
        res.status(401).json({
          success: false,
          message: info.msg
        })
        return
      }

      await this._refreshSession(req)
      // @ts-expect-error
      req.logIn(user, () => {
        res.status(200).json({
          success: true
        })
        res.redirect('/home')
      })
    })(req, res, next)
  }

  async authenticate (req, email: string, password: string, callback): Promise<void> {
    const userRepository = new PrismaUserRepository(prismaClient.getClient())
    const user = await userRepository.getUser('email', email)

    if (!user) {
      callback(null, false, {
        msg:
          `The email address ${email} is not associated with any account. `
      })
      return
    }
    const isMatch = await this.checkPasswords.compare(password, user.password)

    if (!isMatch) {
      callback(null, false, { msg: 'A senha digitada está incorreta' })
      return
    }

    await this._refreshSession(req)
    req.logIn(user, err => {
      callback(err, user)
    })
  }
}
