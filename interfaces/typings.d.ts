// declare namespace Express{
//     export interface Request{
//         // params: TParams,
//         body: User
//     }
// }

// declare module 'Interfaces' {

    export interface TUser{
        firstname?: string, 
        lastname?: string, 
        username?: string,
        email?: string,
        password?: string,
        repassword?: string, 
        type?: string
    }
    
    export interface PortfolioHeaderProps{
        portfolio: Object;
        toggleModal: Function;
        user: Object;
    }
// }