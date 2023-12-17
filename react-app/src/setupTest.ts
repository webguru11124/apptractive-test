import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock Auth.currentAuthenticatedUser
vi.mock('aws-amplify', () => ({
  Auth: {
    currentAuthenticatedUser: vi.fn(() => ({ sub: 'jack' })),
  },
}));

// Mock window.location.href
global.window = Object.create(window);
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://example.com',
  },
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: vi.fn((key) => key),
    i18n: {
      changeLanguage: vi.fn(),
    },
  }),
}));

// Mock external hooks and services

vi.mock('notistack', () => ({
  useSnackbar: vi.fn(() => ({
    enqueueSnackbar: vi.fn(() => {}),
  })),
}));
