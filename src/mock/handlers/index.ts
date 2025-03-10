import signInHandlers from './sign-in';

const handlers = (url: string) => [
  ...signInHandlers(url),
];

export default handlers;