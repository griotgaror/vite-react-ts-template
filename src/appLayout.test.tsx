import React from 'react';
import { describe, expect, it } from 'vitest';
import { customRenderer } from './__tests__/customRenderer';

import AppLayout from '@/appLayout';

describe('AppLayout Test', () => {
    it('should render the app layout', async () => {
        const { getByTestId } = customRenderer({
            element: <AppLayout />,
        });

        expect(getByTestId('appLayout')).toBeInTheDocument();
    });
});
