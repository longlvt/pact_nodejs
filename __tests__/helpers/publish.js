const publisher = require('@pact-foundation/pact-node')
const path = require('path')
require('dotenv').config();

let opts = {
    pactFilesOrDirs: [path.resolve(process.cwd(), "__tests__/contract/pacts")],
    pactBroker: process.env.BROKER_URL,
    consumerVersion: "1.0.0",
    providerVersion: "1.0.0",
    tags: "dev"
}

publisher.publishPacts(opts)
