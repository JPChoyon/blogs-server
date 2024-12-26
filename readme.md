# This is Blogs server.

# if you want to run in this locally then please follow the procedure

## Step 1

First open terminal clone the link git repo.

```
https://github.com/JPChoyon/blogs-server.git
```

## Step 2

Now open folder in vs code.

## Step 3

Now run this command in terminal.

```cmd
yarn install
```

## Step 4

create .env file in #root and pase the data in that file

```
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://mongooes-test:pLhg1FY9cGXVy0S0@cluster1.fycfdwn.mongodb.net/blogs?retryWrites=true&w=majority&
BYCRIPT_SALT_ROUNDS=12
SECRET_KEY=57112035a2ba4960e62d3de7652c83844408ca8e883dc8a76adf2307d297f54be83339ef8ac9c3753c24914e7a2fbf4b78c5a1d5c5f849451aad1b4102769607
```

## Step 5

For run the server

```
yarn dev
```

### **Project Implementation Technology:**

- `typescript`, `node js` , `express js`, `mongoose` etc
- Using `zod` for validation data.
- Implement CRUD operations.
- Using Mongoose for schema definition and data operations.

## Examples

### User routes

- Create user : `localhost:5000/api/auth/register`
  method: `post`
- Log in user and get access token : `localhost:5000/api/auth/login`
  method: `post`

### Blogs routes

- Create Blogs : `localhost:5000/api/blogs`
  method: `post`
- Get all blogs : `localhost:5000/api/blogs`
  method: `get`
- Delete A Blogs : `localhost:5000/api/blogs/:blogsId`
  method: `delete`
- Update A order data : `localhost:5000/api/blogs/:blogsId`
  method: `patch`

# This blogs all routes are secure with access token you can access the routes with access token .

### Admin Routes

- Block a user : `localhost:5000/api/admin/user/:userId/Block`
  method: `patch`
- Delete a Blogs : `localhost:5000/api/admin/blogs/:id`
  method: `delete`

# This admins all routes are secure with access token you can access the routes with access token .
