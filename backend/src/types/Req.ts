declare namespace Express 
{
    export interface Request
    {
        usuario: 
        {
            _id: string
            nome: string
            email: string
            isAdmin: string
            token: string
        }
    }
}