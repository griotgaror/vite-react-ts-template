import React from 'react';
import { ThemeProvider } from 'styled-components';

import useReactContext from '@/hooks/useReactContext';
import { ContextProviderProps } from '@/types/global.types';

import useUpdateStates from '@/hooks/useUpdateStates';
import { GlobalStyle } from '@/styles/globalStyle';
import { generateStyleConfig } from '@/styles/styleConfig';
import { ThemesVariants } from '@/styles/themes';
import { User } from '@/types/user.types';

export interface AppDataStates {
    userData: User | null;
    theme: ThemesVariants | null;
}

export const initalValues: AppDataStates = {
    userData: null,
    theme: null,
};

interface AppDataCntxProps extends AppDataStates {
    updateAppDataStates: (states: Partial<AppDataStates>) => void;
}

const AppDataCntx = React.createContext<AppDataCntxProps | null>(null);

interface AppDataProviderProps extends ContextProviderProps {}

export const AppDataProvider = function ({ children }: AppDataProviderProps) {
    const [appDataStates, setAppDataStates] = React.useState<AppDataStates>(initalValues);
    const { updateStates } = useUpdateStates(setAppDataStates);

    const contextValues: AppDataCntxProps = {
        ...appDataStates,
        updateAppDataStates: updateStates,
    };

    const { theme } = appDataStates;
    const styleConfig = generateStyleConfig(theme);

    return (
        <AppDataCntx.Provider value={contextValues}>
            <ThemeProvider theme={styleConfig}>
                <GlobalStyle />
                {children}
            </ThemeProvider>
        </AppDataCntx.Provider>
    );
};

export function useAppDataContext(): AppDataCntxProps {
    return useReactContext<AppDataCntxProps>({
        context: AppDataCntx,
        providerName: 'AppDataProvider',
    });
}
