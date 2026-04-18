import path from 'path'
import { Verifier } from '@pact-foundation/pact'
import { server, importData } from '../../../src/provider'
require('dotenv').config();

const SERVER_URL = 'http://localhost:8081'

server.listen(8081, () => {
    importData()
    console.log(`Clients Service listening on ${SERVER_URL}`)
})

describe("Clients Service Verfification", () => {
    it("validates the expectations of Client Service", () => {
        let opts = {
            provider: "Clients Serice",
            logLevel: "DEBUG",
            providerBaseUrl: SERVER_URL,
            pactUrls: [`${process.env.BROKER_URL}/pacts/provider/ClientsService/consumer/FrontEnd/latest`],
            consumerVersionTags: ["dev"],
            providerVersionTags: ["dev"],
            publishVerificationResult: true,
            providerVersion: "1.0.1"
        }

        return new Verifier(opts).verifyProvider().then(output => {
            console.log("Pact Verification COmplete")
            console.log(output)
        })
    })
})