import { useAppDataContext } from '@/context/appDataContext';

export default function useStatusCodeHandling() {
    const { updateAppDataStates } = useAppDataContext();

    const handleStatusCode = function (statusCode: number | null) {
        switch (statusCode) {
            case 401:
                // Invalid Session => logout
                updateAppDataStates({
                    userData: undefined,
                });
                break;
            case 403:
                // Account Permission changed
                break;
            case 500:
                // Internal server error
                break;
            case 502:
                // Service not available
                break;
            case 504:
                // Request timeout
                break;
            default:
                break;
        }
    };

    return {
        handleStatusCode,
    };
}
