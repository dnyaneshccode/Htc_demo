To Run the server command.

npm run server

# REGISTER API

Endpoints:-
Register ---> http://127.0.0.1:3000/api/user/register/
Method---> POST
Body Parameters--->

{
"first_name":"test",
"email":"test@gmail.com",
"last_name":"test",
"password":"Pass@123",
"cpassword":"Pass@123"
}

# LOGIN API

Login---> http://localhost:3000/api/user/login/
Method---> POST
Body Parameters--->

{
"email":"test@gmail.com",
"password":"Pass@123"
}

# LOGOUT API

Logout--->http://localhost:3000/api/user/logout/
Method---> POST
Body Parameters--->

Pass the token in headers. Authorization ---> Bearer Token

# GENERATE NEW ACCESS TOKEN WITH REFRESH TOKEN

Generate New Access token:-http://localhost:3000/api/user/generateNewAccessToken/

Method---> POST
Body Parameters--->

{
"email":"tessjseesssssstsxyxzshzz@gmail.com",
"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDlkMzQ2Njk5YzQ1NWU5MGQ4NTE2MmIiLCJuYW1lIjoieHh4Iiwicm9sZSI6MSwiaWF0IjoxNjg4Mjc3ODA3LCJleHAiOjE2ODgzNjQyMDd9.LGLmnLnoNM9fNcIifhsq0Owb82nAQ4IxA2KktEiVdVk"
}
