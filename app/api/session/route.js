export async function GET(req) {
    const cookie = req.headers.get('cookie');
  
    if (cookie) {
      const sessionMatch = cookie.match(/session=([^;]*)/);
      if (sessionMatch) {
        const userEmail = sessionMatch[1];
        return new Response(JSON.stringify({ user: userEmail }), { status: 200 });
      }
    }
  
    return new Response(JSON.stringify({ message: 'Not authenticated' }), {
      status: 401,
    });
  }
  