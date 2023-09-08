import { QueryKey, UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import queryString from 'query-string'

const defaultLimit = 20

interface Record<T> {
    [k: string]: T
}

type Model = Record<boolean | number | number[] | string | string[] | Model | (Model | undefined)[] | null | undefined>
type Filters = Record<string | number | boolean | null | string[] | number[] | undefined> & {
    page?: number
    limit?: number
}

type RestGetParameters<T> = Parameters<typeof useRestGet<T>>
type PaginatedResponse<T> = { results: T[]; count: number }

const useRestGet = <T>(
    endpoint: string,
    filters: Filters = {},
    options: Omit<UseQueryOptions<T, string, T>, 'queryKey' | 'queryFn' | 'initialData'> = {},
    showError = true,
) => {
    const { page, limit, ...rest } = filters

    if (page) {
        const currentLimit = limit ?? defaultLimit

        filters = { ...rest, offset: (page - 1) * currentLimit, limit: currentLimit }
    }

    const queryParametersStr = queryString.stringify(filters, {
        arrayFormat: 'bracket',
        skipNull: true,
        skipEmptyString: true,
        sort: false,
    })

    const queryKeys = [endpoint, filters]

    if (endpoint.indexOf('/') !== -1) {
        queryKeys.unshift(endpoint.split('/')[0])
    }

    return useQuery<T, string, T>({
        queryKey: queryKeys,
        queryFn: () => defaultQueryFn(`http://127.0.0.1:8000/api/${endpoint}${queryParametersStr && `?${queryParametersStr}`}`),
        retry: 1,
        retryDelay: 200,
        ...options,
    })
}

const defaultQueryFn = async (input: RequestInfo, init: RequestInit = {}) => {
    const res = await fetch(input, init)

    if (res.status >= 300) {
        throw res
    }

    if (res.status === 204) {
        return true
    }

    return res.json()
}

const useRestStore = (endpoint: string, clear: QueryKey[] = [], successMessage?: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: Model) =>
            defaultQueryFn(body.id ? `http://127.0.0.1:8000/api/${endpoint}/${body.id}` : `http://127.0.0.1:8000/api/${endpoint}`, {
                method: body.id ? 'PUT' : 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [endpoint] })
            for (const key of clear) {
                await queryClient.invalidateQueries({ queryKey: key })
            }
        },
        onError: async (error?: { status?: number }) => {
            if (error && error.status === 422) {
                //Validation Error
                return
            }

            if (error && error.status === 429) {
                //TooManyRequests Error
                return
            }

        },
    })
}

const useRestDelete = (endpoint: string, clear: QueryKey[] = []) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) =>
            defaultQueryFn(`http://127.0.0.1:8000/api/${endpoint}/${id}`, {
                method: 'DELETE',
            }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [endpoint] })

            for (const key of clear) {
                await queryClient.invalidateQueries({ queryKey: key })
            }
        },
    })
}


export {
    defaultLimit as limit,
    defaultQueryFn,
    useRestGet,
    useRestStore,
    useRestDelete
}

