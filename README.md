# VDC - JavaScript Development Environment
A barebones Javascript Development Enviornment for the Valorant Draft Circuit.

## Getting Started
To begin development, there's a couple steps you'll first need to take.

### Setting up your PC to Code, run Javascript and use Version Control
1. Install [Visual Studio Code](https://code.visualstudio.com/download)
2. If you don't have `Node.js` installed already, you can get the [Node.js installers here](https://nodejs.org/en/download).
3. Install [Github Desktop](https://desktop.github.com/) or [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) if you prefer only using the command line (Github Desktop will automatically install git)
4. Clone this repo.

### Setting up the Development Environment
Rename the [`.env-example`](./.env-example) file to `.env` and in the file, change the `DATABASE_URL` to reflect the database URL with your credentials.

Then, run the following commands in the terminal window for the repo- you can open/close it using `CTRL` + `~`
| Step | Command | Notes |
| -- | -- | -- |
| Install all the required node modules | `npm install` |  |
| Add the prisma files | `git submodule add -f https://github.com/Valorant-Draft-Circuit/vdc-prisma-submodule prisma` | Will create the `./prisma` folder in your root directory |
| Pull & generate the database | `npm run generate` | Will likely ask to "install the following packages: prisma@X.X.X". This is normal, should only happen once. |
| Install TypeScript | `npm install -D typescript` | This is required to compile Typescript to Javascript |
| Compile the TypeScript files | `npm run compile` | Will create a bunch of `*.js` files in `./prisma/` and `./enums/` |

---

And you're set! After running all these commands, you should be ready to begin developing!

To see an example, I've included a script that can take an array of players and return their agent frequency! Check it out using `npm run dev0` and you'll be able to see it's output in [`./bin/AgentFrequency.json`](./bin/agentFrequency.json)

## Writing your first script
### Creating the file
Let's say we want to generate a report on the subs we have in VDC. First, let's create a new file in `./src/` and call it `vdcSubs.js`.

### Adding  common require statements
In that new file, let's copy the following lines of code. There's a high chance every script with use the `PrismaClient` if you do custom database calls, and to write to a file, the `fs` module is necessary. You can of coourse import additional modules like `@napi-rs/canvas` if you are working on generating images but for this example, we'll stick with what we have below.

```js
const { PrismaClient } = require(`@prisma/client`);
const fs = require(`fs`);

const prisma = new PrismaClient();

console.clear();
```
> *Note: You don't "need" the `console.clear();` here, but for run to run cleanliness, I'd recommend it.*


### Anonymous Functions
Javascript has something it calls "Anonymous Functions", which are nameless functions. Generally these aren't going to be used in code or any production atmosphere, but since we don't have a way to `await` for code without it being wrapped within an `async` function, we'll add an Anonymous [Asynchronous Function Declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) here.

```js
(async () => {
    // code goes here
})();
```
When you add this below, you'll still be able to use variables scoped outside the block, but variables defined within this cannot be used outside this block. For more info, I'd reccomend doing some reading on [Variable Scoping](https://www.w3schools.com/js/js_scope.asp).

### Using the Prisma Wrapper Library
I've spent a lot of time creating the Prisma Wrapper Library to make it easier to get information from the database in a way that makes sense, without having to learn syntax for prisma. Ler's use one of those below:

Within the function we created above (in the code goes here section), let's put in the following lines
```js
const subs = await Player.getAllSubs();
fs.writeFileSync(`./bin/subs.json`, JSON.stringify(subs, null, 4))
```
You can see how the `async` declararion comes in handy here- we need to `AWAIT` for the data to get back to us from the database, and THEN we can write that info to a file.


### Putting it all together
If you've done everything correctly, your file should look something like this:
```js
const { PrismaClient } = require(`@prisma/client`);
const fs = require(`fs`);

const prisma = new PrismaClient();

console.clear();

(async () => {
    const subs = await Player.getAllSubs();
    fs.writeFileSync(`./bin/subs.json`, JSON.stringify(subs, null, 4))
})();
```

### Running the code
To create your own script that automatically reruns when you save, create a new line under `"scripts"` in [`package.json`](./package.json) name it whatever you want, and then add the following command: `nodemon ./PATH_TO_FILE.js --no-warnings --ignore bin/`

in our example, the `"scripts"` [`package.json`](./package.json) file, should include an entry something like this:
```json
"subs": "nodemon ./src/subs.js --no-warnings --ignore bin/",
```

Congratulations, you should be done now! This should run and create a new file in `./bin/` called `subs.json` with every sub that VDC has!

Good luck on your projects! Happy Coding!