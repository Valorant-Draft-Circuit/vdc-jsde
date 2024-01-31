const { PrismaClient } = require(`@prisma/client`);
const fs = require(`fs`);

const prisma = new PrismaClient();

console.clear();

const players = [
    `Travestey#7227`
];
getAgentFrequencyByPlayers(players);

/** Given an array of players, this function will generate a json file of their agent frequencies
 * @param {Array[string]} players String Array of players IGNs + tags
 */
async function getAgentFrequencyByPlayers(players) {
    const output = {};
    for (let i = 0; i < players.length; i++) {
        const agentFrequency = {};
        const playerStats = (await prisma.playerStats.findMany({
            where: { Player: { Account: { riotID: players[i] } } },
            include: { Games: true }
        })).filter(s => s.Games.type.includes(`Season`));

        for (let j = 0; j < playerStats.length; j++) {
            const agent = playerStats[j].agent;
            if (!Object.keys(agentFrequency).includes(agent)) agentFrequency[agent] = 1
            else agentFrequency[agent] += 1
        }
        output[players[i]] = agentFrequency
    }
    fs.writeFileSync(`./bin/agentFrequency.json`, JSON.stringify(output, null, 4))
    return output
}