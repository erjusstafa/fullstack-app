import { useMutation, useQuery } from "@tanstack/react-query";


type APIHandler<T> = (url: string) => Promise<T>;

export function useGet<T>(
  queryKey: string[],
  url: string,
  handleCustomAPI: APIHandler<T>,
  initialData?: T | undefined,
  enabled?: boolean,
) {
  return useQuery<T>({
    queryKey: queryKey,
    queryFn: () => handleCustomAPI(url),
    staleTime: 1000 * 60 * 5,
    initialData: initialData,
    enabled: enabled,
  });
}

export function useGetDetail<TResponse, TSelected>(
  queryKey: string[],
  url: string,
  documentId: string | number,
  handleCustomAPI: (url: string) => Promise<TResponse>,
  selectFn: (data: TResponse) => TSelected,
  options?: { staleTime?: number }
) {
  return useQuery<TResponse, Error, TSelected>({
    queryKey,
    queryFn: async () => {
      return handleCustomAPI(url);
    },
    select: selectFn,
    staleTime: options?.staleTime ?? 1000 * 60 * 5,
    enabled: !!documentId,
  });
}

export function usePost<TPayload, TResponse>(
  mutationFn: (data: TPayload) => Promise<TResponse>,
  onSuccess?: (data: TResponse) => void,
  onError?: (err: Error) => void
) {
  return useMutation({
    mutationFn,
    onSuccess,
    onError,
  });
}

/* export const usePut=(url) =>{
    return useMutation(async (data) => {
      const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      return res.json();
    });
  } */

/* export const useDelete =(url)=> {
    return useMutation(async (id) => {
      const res = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
      return res.json();
    });
  }
   */
