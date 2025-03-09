# Members Only
## How does authentication work?
We're gonna be using local authentication strategy provided by the Passport middleware and Potgresql DB to store the usernames and passwords.

Here's a general flow of how we'll authenticate the users:

1. User creates their profile with sign up, the information in this form is validated and sanitized and stored in the database; we store password after `hashing` it with bcrypt as a safety mechanism in case our DB is compromised.

2. When user tries to login, we take their credentials by the login form, `validate` and `sanitize` the data.

3. We check for the user in the database and compare the hashed password with the one in the database. If they don't match, simply redirect to a login error or similar page. If they do, move on to the next step.

4. We'll be creating a session for the user. Essentially, send the user a `cookie` - a piece of data that the user will send us back in the subsequent requests for us to verify that the user is authenticated. We'll have to specify what information we have to store in this cookie, so that if an authenticated user logs in, we can check who the user is and show him the resources accordingly. Use the `serializeUser` method of the passport middleware to specify what part of the data is to be sent to the cookie, and the `deserializeUser` that extracts the user info for that particular user.

The session will (ideally) be stored in a database during production for scalability and persistence, but for development purposes, we initially store it in the server's RAM.