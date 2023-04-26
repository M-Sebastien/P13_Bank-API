# Issues

## Dashboard.jsx

### Issue #1 - FIXED

After implementing protected routes in `<BrowserRouter>`, navigating to the `<Dashboard />` leads to a blank page.

#### Description

How can this `Dashboard` component should be reached?
-> From the Login component after successful sign in (navigate)
-> By accessing /dashboard if the user token and user profile are not undefined in the Redux store. Otherwise the user is redirected to ../login (it works)
-> By clicking on the profile button in the navbar after successful sign in

What is not working with this component?
-> After logging in, the user is redirected to /dashboard but the page is empty. The document only contains the .root div which is from the HTML document.

Why is the page empty?

**Test:** replaced dashboard component by a simple functional component that returns "Hello"
**Result:** the component is not injected in the HTML page

Possible reason: the issue is not related to the dashboard component itself.
**To do :** break down the steps between resume session / login and navigation to dashboard.

Actually the problem came from the implementation of the Private Route itself
[React Router 6: Private Routes (alias Protected Routes)](https://www.robinwieruch.de/react-conditional-hooks/) :question:
[Private route in react router v6](https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5) :ok_hand:

### Issue #2 - IN PROGRESS

Refreshing the page on /dashboard navigates to /login.

### Description

After loggin in, after landing on the `<Dashboard />`, if the user refreshes the page, he is redirected to `/login` path / `<Login />` page.

Expected behavior: the user should stay on the `<Dashboard />`

However the `<Nav />` components does not lose the login status of the user and its button (go to dashboard / sign out) are fully functional.

What triggers the `/login` redirection?
-> The `<ProtectedRoute>` component in App.jsx since we removed the conditional `<Navigate/>` that was in the `<Dashboard />`

Under which condition(s) the redirection can occur?
-> When `useAuth()` returns ***false***, because either the **token** or the **profile** are ***undefined***.

Where are the token and profile values stored?

-> Token: in the Redux store and in the localStorage (handled by App.jsx)
-> Profile: in the Redux store only (handled by App.jsx)

In case the page is refreshed the Redux store is cleared.

Possible reason of the issue: the profile is lost when the page is refreshed.
In case the token has been saved in localStorage, the profile should be fetched again by the `<App />` and stored in the Redux store.

How are the profile fetch and dispatch handled in the `<App />` component ?

They are handled by an async function `resumeSession()` which is called in a `useEffect()` hook with no dependency array.
I expect this function to be called each time the app launches for the first time or the page is refreshed.
Is it really called each time the page is refreshed? Not sure.


### Issue #3 - IN PROGRESS

Manually navigating to the `<Dashboard />` by adding /dashboard in the url leads to an error.