import { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { axiosInstance } from '../axiosInstance';
import useResponseErrorHandling from './useResponseErrorHandling';

interface UseApiPostRequestProps<R> {
    url: string;
    onSuccess?: (data: R) => void;
    onError?: () => void;
}

export default function useApiPostRequest<D = object, R = unknown>({
    url,
    onSuccess,
    onError,
}: UseApiPostRequestProps<R>) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { handleResponseError, ...errorProps } = useResponseErrorHandling();

    const postRequest = React.useCallback(
        async (data?: D): Promise<void> => {
            try {
                setIsLoading(true);
                const res: AxiosResponse<R> = await axiosInstance.post(url, data);
                onSuccess && onSuccess(res.data);
            } catch (error) {
                handleResponseError(error as AxiosError);

                onError && onError();
            } finally {
                setIsLoading(false);
            }
        },
        [onSuccess, onError, handleResponseError, url],
    );

    return {
        isLoading,
        ...errorProps,
        postRequest,
    };
}
