## Supabase Auth

POC for reset password user flow.

## Setup

- `npm install`
- `npm run start`

### Endpoints

- `/reset-password?email=<email to reset for>`

This endpoint will send an email to the request email with a link to reset password and redirection to the current server

- `/verify-account`

This endpoint will receive the session info which is then handled by client side js. See file `reset-password.html`

- `/check-password?email=<email>&password=<new password>`

This endpoint is used to check if the user password was resetted successfully or not. Default password `asdfasdf`, see file `reset-password.html`

- Email bucket url `http://127.0.0.1:54324`
