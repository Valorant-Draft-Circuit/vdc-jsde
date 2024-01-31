# VDC - JavaScript Development Environment
A barebones Javascript Development Enviornment for the Valorant Draft Circuit.

## Getting Started
To begin development, there's a couple steps you'll first need to take.

### Setting up your PC to Code, run Javascript and use Version Control
1. Install [Visual Studio Code](https://code.visualstudio.com/download)
2. If you don't have `Node.js` installed already, you can get the [Node.js installers here](https://nodejs.org/en/download).
3. Install [Github Desktop](https://desktop.github.com/) or [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) if you prefer only using the command line (Github Desktop will automatically install git)

### Setting up the Development Environment
Rename the [`.env-example`](./.env-example) file to `.env` and in the file, change the `DATABASE_URL` to reflect the database URL with your credentials.

Then, run the following commands
| Step | Command | Notes |
| -- | -- | -- |
| Install all the required node modules | `npm install` |  |
| Add the prisma files | `git submodule add https://github.com/Unieveth/vdc-prisma-submodule prisma` | Will create the `./prisma` folder in your root directory |
| Pull & generate the database | `npm run generate` | Will likely ask to "install the following packages: prisma@X.X.X". This is normal, should only happen once. |
| Compile the TypeScript files | `npm run compile` | Will create a bunch of `*.js` files in `./prisma/` and `./enums/` |

---

And you're set! After running all these commands, you should be ready to begin developing!

To see an example, I've included a script that can take an array of players and return their agent frequency! Check it out using `npm run dev0` and you'll be able to see it's output in [`./bin/AgentFrequency.json`](./bin/agentFrequency.json)

To create your own script that automatically reruns when you save, create a new line under `"scripts"` in [`package.json`](./package.json), name it whatever you want, and then add the following command: `nodemon ./PATH_TO_FILE.js --no-warnings --ignore bin/`

In the [`package.json`](./package.json) file, it should look something like this:
```js
    "dev1": "nodemon ./src/script.js --no-warnings --ignore bin/",
```

