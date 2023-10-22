
# No Border Jobs

A plataform to find jobs global and remote jobs

Running in production [here](https://www.nobordersjobs.com/)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (all in .env.example)

Note: It cannot be .env.local, the file should be .env (or prisma will not read it properly)

- `NEXTAUTH_URL`: The URL of your project (in product that will need to change to current project address)

- `NEXTAUTH_SECRET`= A random string used in Next Auth encryptation (I think so)

- Google variabes: The providers used in next-auth (feel free to add another provides).. .the explanation to get those values is on [next-auth documentation](https://next-auth.js.org/providers/google)

- Postgrees Variables: Check [here](https://vercel.com/docs/storage/vercel-postgres/using-an-orm#prisma) how to get this values... but here are a printscreen with the righ place
<img width="707" alt="Screenshot 2023-10-21 at 10 24 23 PM" src="https://github.com/PedroMarianoAlmeida/nobordersjobs/assets/59484474/71894f47-4b60-4721-a707-1226e2e4a8b2">

## Run Locally

- Clone the project

- Install dependencies

```bash
  npm install
```

- Push database and generate Prisma Client

```bash
  npx prisma db push
```

- Start the project

```bash
  npm run dev
```


## Tech Stack

**Client:** NextJS (13), TypeScript, React, TailwindCSS

**Server:** Postgrees, Prisma

