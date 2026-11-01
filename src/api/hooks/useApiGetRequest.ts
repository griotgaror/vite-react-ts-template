import { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { axiosInstance } from '../axiosInstance';
import useResponseErrorHandling from './useResponseErrorHandling';

interface UseApiRequestProps<R, P> {
    url: string;
    onSuccess: (data: R) => void;
    onError?: () => void;
    onInit?: boolean;
    params?: P;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useApiGetRequest<R = unknown, P = any>({
    url,
    onSuccess,
    onError,
    onInit = true,
    params,
}: UseApiRequestProps<R, P>) {
    const [isLoading, setIsLoading] = React.useState<boolean>(onInit);
    const { handleResponseError, ...errorProps } = useResponseErrorHandling();

    const fetchRequest = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const res: AxiosResponse<R> = await axiosInstance.get(url, {
                params: params,
            });
            onSuccess(res.data);
        } catch (error) {
            handleResponseError(error as AxiosError);
            if (onError) onError();
        } finally {
            setIsLoading(false);
        }
    }, [handleResponseError, onSuccess, onError, url, params]);

    React.useEffect(() => {
        if (onInit) fetchRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        isLoading,
        fetchRequest,
        errorProps,
    };
}
