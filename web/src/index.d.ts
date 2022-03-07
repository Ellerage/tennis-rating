export interface User {
    id: string
    firstName: string
    lastName: string
    username: string
    rating: string
}

export type ANY_TYPE = any


 declare module 'react-fireflies' {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    const f:any

    export default f
}