import { useMutation } from "@apollo/client";
import {vi} from "vitest";
// import '@testing-library/jest-dom';

// Mock Auth.currentAuthenticatedUser
vi.mock('aws-amplify', () => ({
    Auth: {
      currentAuthenticatedUser: vi.fn(),
    },
  }));
  
// Mock window.location.href
global.window = Object.create(window);
Object.defineProperty(window, 'location', {
value: {
    href: 'http://example.com',
},
});
  