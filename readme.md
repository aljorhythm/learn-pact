
# Requisites

- https://github.com/casey/just
- https://pnpm.io/
- https://formulae.brew.sh/formula/docker
- https://formulae.brew.sh/formula/docker-compose
- if required https://github.com/abiosoft/colima

# Demo

Consumer: Person
Provider: Food

## Broker: Start broker

`(cd broker && just restart)`

## Broker: Open web ui with no contracts

`(cd broker && just browser)`

## Provider: verify and fail

[provider/provider/person.test.js](provider/provider/person.test.js)

`(cd provider && just verify)`

## Consumer: test

[consumer/contracts/food.test.js](consumer/contracts/food.test.js)

`(cd consumer && just test)`

### See pacts

[consumer/pact/pacts](consumer/pact/pacts)

## Consumer: publish contract

`(cd consumer && just publish-contracts)`

### Open web ui see updated contract

`(cd broker && just browser)`

## Provider: verify

`(cd provider && just verify)`
