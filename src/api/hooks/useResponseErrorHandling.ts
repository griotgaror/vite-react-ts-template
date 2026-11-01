import { AxiosError } from 'axios';
import React from 'react';
import useStatusCodeHandling from './useStatusCodeHandling';

interface ApiResponseErrorMsg {
    detail: string;
}

export interface ResErrorDetails {
    name: string;
    message: string;
    statusCode: number | null;
}

export type ResError = ResErrorDetails | undefined;

export default function useResponseErrorHandling() {
    const [errorDetails, setErrorDetails] = React.useState<ResError>(undefined);
    const { handleStatusCode } = useStatusCodeHandling();

    const extractErrorDetails = React.useCallback(
        (error: AxiosError): ResErrorDetails => {
            if (error.response) {
                const data = error.response.data as ApiResponseErrorMsg | undefined;

                return {
                    name: 'ApiError',
                    message: data?.detail || 'The service is currently not available',
                    statusCode: error.response.status,
                };
            }

            if (error.request) {
                return {
                    name: 'NetworkError',
                    message: 'No Response Received from Server',
                    statusCode: null,
                };
            }

            return {
                name: 'ClientError',
                message: 'Error while setting up request',
                statusCode: 400,
            };
        },
        [],
    );

    const handleResponseError = React.useCallback(
        (error: AxiosError) => {
            const details = extractErrorDetails(error);

            handleStatusCode(details.statusCode);
            setErrorDetails(details);
        },
        [handleStatusCode, extractErrorDetails],
    );

    const clearError = React.useCallback(() => setErrorDetails(undefined), []);

    return {
        errorDetails,
        setErrorDetails,
        handleResponseError,
        clearError,
    };
}
