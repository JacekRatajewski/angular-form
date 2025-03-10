// src/mocks/node.js
import { setupWorker } from 'msw/browser';
import handlers from './handlers/index';

export const worker = (url: string) => setupWorker(...handlers(url));
