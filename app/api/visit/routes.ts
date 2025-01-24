import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const lastVisit = cookieStore.get('lastVisit')?.value;

  console.log('lastVisit', lastVisit);

  return new Response('Hello!', {
    status: 200,
  });
}
