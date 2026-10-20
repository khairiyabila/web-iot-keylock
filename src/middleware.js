export function onRequest(context, next) {
  const { url, cookies, redirect } = context;

  const sessionToken = cookies.get('session_token'); // Replace with your variable name
  const isLoggedIn = !!sessionToken; // true if it exists, false if it doesn't

  if (url.pathname.startsWith('/login') || url.pathname.startsWith('/_astro')) {
    // If they are ALREADY logged in, don't let them see the login page; send to dashboard
    if (isLoggedIn && url.pathname === '/login') {
      return redirect('/dashboard');
    }
    return next();
  }

  // 3. IF NOT LOGGED IN: Force redirect absolutely everything to /login
  if (!isLoggedIn) {
    return redirect('/login');
  }

  // 4. IF LOGGED IN: Redirect the root page "/" to "/dashboard"
  if (isLoggedIn && url.pathname === '/') {
    return redirect('/dashboard');
  }

  // 5. Allow access to all other pages (like /settings, /profile) since they are logged in
  return next();
}
