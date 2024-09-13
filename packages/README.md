# Packages

These are packages that can be used by the `client` or the `server` packages.

## Considerations to take while writing code

In the future if the application grows, the code will increase in size and complexity.
<br>Aim to write tree-shakable code that enabled the bundler to do code splitting and tree shaking
<br>For now the only bundler I plan to use is Vite in the `client` workspace

## Domain package

If this was a real project I wouldn't have created this layer because it's a simple project, but pretending that this is an application that should scale I added this layer.

This would represent the domain layer in a traditional clean architecture. It doesn't have any dependency and can be solely tested.

It contains the classes that will be used to pass apply validation on the minting request (that only allowed users can mint) plus the unit tests

Again this is a simple project, but I will later use logical CQRS to seperate the reading flow from the writing flow. 
<br>All writes (not reads/queries) to the back-end system will execute (like requesting to mint) should be validated by the domain layer first before storing data in storage (the blockchain in our case)


### Why is the domain shared ?

There is not a specific reason for now to have the domain shared, instead it can be part of the server workspace.

I did this because I plan to experiment with visualizing the domain layer on the ui (will submitted with this project because it is clearly out of scope)


## Brief explanation of the remaining packages

- **nft**: contains concerns for writing, deploying and testing the smart contract
