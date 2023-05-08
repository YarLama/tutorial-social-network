import { authApi } from "./authApi";


// const rootApi = createApi({
//     reducerPath: 'rootApi',
//     baseQuery: fetchBaseQuery({baseUrl: '/'}),
//     endpoints: (builder) => ({
//         ...authApi.endpoints(builder),
//     })
// })

const rootApi = {
    ...authApi
}

export default rootApi;
