import { HttpResponse, http } from 'msw';
function generateRandomString(length: number): string {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const signInHandlers = (url: string) => {
  return [
    http.post(`${url}/sign-in`, async ({ request }) => {
      return HttpResponse.json({ token: generateRandomString(15) });
    }),
  ];
};

export default signInHandlers;
