declare namespace Express{
    export interface Request{
        // params: TParams,
        body: User
    }
}

interface User{
    username: string,
    password: string
}