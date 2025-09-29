export default function ({ route, redirect }) {
  // If user is on a non-home route with a hash anchor, redirect to home with the same hash.
  // This makes URLs like /projects/slug#resume go to /#resume so the anchor exists.
  if (route && route.hash && route.path !== '/') {
    return redirect('/' + route.hash)
  }
}


