import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { afterEach, beforeAll, vi } from 'vitest';

const IntersectionObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
}));

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

beforeAll(() => {
    // Mock root container to dom tree
    const rootElementMock = document.createElement('div');
    rootElementMock.setAttribute('id', 'app');
    document.body.append(rootElementMock);
});

afterEach(() => {
    // if vitest --ui then show the rendert DOM tree
    process.env.IS_VITEST_UI === 'true' && screen.debug();

    // Clean all mocks after each test
    vi.restoreAllMocks();
});
