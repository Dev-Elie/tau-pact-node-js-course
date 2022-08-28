// Pact provider setup on the consumer side.
// Consumer will use this setup to create the provider mock and subsequently create the contract

const path = require("path")
const Pact = require("@pact-foundation/pact")

global.port = 8081
global.provider = new Pact({
    port: global.port,
    log: path.resolve(process.cwd, "__tests__/contract/logs", "pact-logs.log"),
    dir: path.resolve(process.cwd, "__tests__/contract/pacts"),
    spec: 2,
    logLevel: "INFO",
    pactfileWriteMode: "overwrite",
    consumer: "Frontend",
    provider:"ClientsService"

})