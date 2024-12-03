export async function POST() {
    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      'session=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict'
    );
  
    return new Response(JSON.stringify({ message: 'Logged out' }), {
      status: 200,
      headers,
    });
  }
  