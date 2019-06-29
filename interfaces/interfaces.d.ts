// declare namespace Express{
//     export interface Request{
//         // params: TParams,
//         body: User
//     }
// }

interface TUser{
    firstname?: string, 
    lastname?: string, 
    username?: string,
    email?: string,
    password?: string,
    repassword?: string, 
    type?: string
}