/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
declare namespace Express {
  export interface Request {
    usuario: {
      _id: string
      nome: string
      email: string
      admin: boolean
      token: string
    }
  }
}
