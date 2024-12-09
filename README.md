## NextJS

### Prerequisites

Node version 20.x

### Cloning the repository

    git clone https://github.com/anilsoylu/next15-auth-shadcn.git

### Install packages

    npm i

### Setup .env file

    NEXT_PUBLIC_SERVER_URL=
    DATABASE_URL=

    #npx auth secret
    AUTH_SECRET=
    AUTH_URL=

    NEXT_PUBLIC_ADMIN_USERNAME=
    NEXT_PUBLIC_ADMIN_PASSWORD=

### Setup Drizzle

    npx db:generate
    npx db:push
    npx db:seed

### Start the app

    npm run dev

### Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| ------- | ---------------------------------------- |
| `dev`   | Starts a development instance of the app |
|         |
