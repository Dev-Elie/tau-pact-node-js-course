"use strict"

const { Matchers } = require("@pact-foundation/pact")
const { getClients, postClient} = require("../../../src/consumer")


describe("Clients Service", ()=>{
    const GET_EXPECTED_BODY = [
        {
            "firstName": "Lisa",
            "lastName": "Simpson",
            "age": 8,
            "id": 1
        },
        {
            "firstName": "Wonder",
            "lastName": "Woman",
            "age": 30,
            "id": 2
        },
        {
            "firstName": "Homer",
            "lastName": "Simpson",
            "age": 39,
            "id": 3
        }
    ]

    afterEach(()=>provider.verify())

    describe("getClients", ()=>{
        beforeEach(()=>{
            const interaction = {
                state: "there are clients",
                uponReceiving: "a request for clients",
                withRequest: {
                    method: "GET",
                    path: "/clients"
                },
                willRespondWith: {
                    status: 200,
                    body: GET_EXPECTED_BODY,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }                    
            }
            return provider.addInteraction(interaction) // add interaction to the provider
        }).
        
        test("returns clients", async ()=>{
            const clients = await getClients()
            expect(clients).toEqual(GET_EXPECTED_BODY)
            expect(clients.status).toEqual(200)
            expect(clients.headers).toEqual({
                "Content-Type": "application/json; charset=utf-8"
            })
        })
    })

})