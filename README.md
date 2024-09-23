# Full-Stack Javascript Developer Task - Web3  Integration

# Table of Contents

[1. How to Run](#1-how-to-run)

[2. Contract and Solidity](#2-contract-and-solidity)

[3. Requirements](#3-requirements)

[4. Development Assumptions and Approach](#4-development-assumptions-and-approach)

&nbsp;&nbsp;[4.1 Assumptions](#41-assumptions)

&nbsp;&nbsp;[4.2 Approach](#42-approach)

[5. DApp Overview](#5-dapp-overview)

&nbsp;&nbsp;[5.1 Assumptions](#51-assumptions)

&nbsp;&nbsp;[5.2 Overview](#52-overview)

[6. Architecture](#6-architecture)

&nbsp;&nbsp;[6.1 Monorepo](#61-monorepo)

&nbsp;&nbsp;[6.2 C4 Model](#62-c4-model)

&nbsp;&nbsp;&nbsp;&nbsp;[6.2.1 C1 System Context](#621-c1-system-context)

&nbsp;&nbsp;&nbsp;&nbsp;[6.2.2 C2 Container](#622-c2-container)

&nbsp;&nbsp;&nbsp;&nbsp;[6.2.3 Back-End](#623-backend)

&nbsp;&nbsp;&nbsp;&nbsp;[6.2.4 Front-End](#624-frontend)

[7. Planning](#7-planning)

[8. Git Messages](#8-git-messages)

[9. TEchnologies Used](#9-technologies-used)



# Announcement

Please note that this project took me 5 to 6 days in total. You can see the first commit was 2 weeks ago but I took some time to research and I was working on another project in parallel plus I had some personal setbacks which forced me to shift my focus away at some times

**That being said please consider that I gave this project high priority and attention. I invested time to ensure that my skills were fully represented before sumitting and that I am happy with the resulted application**

## 1. How to Run

## 2. Contract and Solidity

*After confirming with Araceli Martinez that the link provided for the smart contract in the requirement documents is not working, I used an industry standard ERC-721 contract from Oppenzeppelin*

As stated by Araceli Martinez my role is to have a full undestanding of the Web3 and its ecosystem without being an expert in contract creation and solidity.

## 3. Requirements

This is the original [Fullstack_js_-_Web3_Integration](./docs/planning/documents/Fullstack_js_-_Web3_Integration.pdf) requirements document.

## 4. Development Assumptions and Approach

### 4.1 Assumptions

I assumed that I'm developing a MVP as a foundation for a full-scale application.

I also assumed that I have the flexibility to showcase my skills and demonstrate my ability to build from the ground up. I've chosen to implement certain functionalities independently, rather than relying solely on external libraries.

Finally I assumed that I should stick with the libraries mentioned in the requirement document. For ex not using Nuxt on the frontend or Nest js on the backend


### 4.2 Approach

To showcase my full-stack development skills, I've chosen to create a foundational application that is adaptable to future business requirements but also designed for long maintainability and scalability.

This involved implementing well-established and personal favorite software architectures and design principles on both the backend and frontend.

That being said I left some TODOs and Work do be done in non-functional areas like the ui design and style

## 5. DApp Overview

### 5.1 Assumptions

The project requirements document states that **users should be able to mint new digital assets**. 
But allowing anyone to mint new NFT needs some considerations while writing the contract and can significantly devalue the token. 
For that reason I took the assumption that **users will need to request (through the ui) from the owner of the smart contract to mint them a new Elieum** and link it to a digital asset. The owner can decided the addresses allowed to mint, based on some condition which i will decide later (but keep simple).

### 5.2 Overview

**Elieum (ELI)** is a new **ERC-721** compliant token (NFT) created using an ERC-721 compliant contract in [packages/nft/contracts/token.sol](./packages/nft/contracts/token.sol)

**Users** are able to connect their ethereum wallet, **display a gallery of the digital assets** owned by the connected wallet, **transfer digital assets** to other addresses and **mint new tokens**

Tokens are stored on the blockchain, but the **metadata of the digital asset and the digital asset itself are both stored on ipfs**. 

The **DApp** consists of the following:

- **Ethereum Blockchain and the EVM**

- **Back-end** application responsible for receiving minting requests and providing helper apis for the front-end for example to store metadata files in ipfs. Additionally it is where I will store some sensitive keys to avoid leaking them to the client thus compromising security.
<br>**Sensitive keys** for now will be stored as environment variables in `.env` file and included in `.gitignore`. But on production a secrets management service like AWS Secrets Manager or Azure Key Vault should be used to securely store the keys and access them at the back-end application starting phase.

- **Front-end** application reponsible for allowing the users to view their asset gallery, trasfering assets to other addresses and sending minting requests to the Back-end.
<br>I will keep the user close to the blockchain and I won't store data on the backend unless necessary.
<br>So for querying the smart contract and tranfering tokens the client app will directly use `ether.js`
<br>It will use the backend only for requesting the owner to mint a new token for a user after he uploads the asset and metadata through a form
<br>**The UI is responsive, user-friendly** and tailored only for web for now. Initial considerations for SEO are taken into account but SEO is left for later

## 6. Architecture

### 6.1 Monorepo

For the sake of simplicity and because it is convenient, I structured the project as a yarn monorepo consisting of the following workspaces

-  packages/nft
-  packages/dtos

-  packages/domain
-  backend/application
-  backend/api

-  frontend/api

Everything in `packages` is shared.

`packages/domain` is part of the backend but i shared it because i was planning to experiment with running some domain logic on the UI before sending a request to the client

### 6.2 C4 Model

As can be found on the website of the author of this model ([Simon Brown](https://simonbrown.je/)): *The [C4 model](https://c4model.com/) was created as a way to help software development teams describe and communicate software architecture, both during up-front design sessions and when retrospectively documenting an existing codebase* <br>

I will only draw the C1 and C2 level. This is actually a recommendation from the C4 Model author as C3 and C4 are meant only for complex scenarios<br>

*Note: The [IcePanel](https://app.icepanel.io/) platform was used to draw all C4 model levels*.

#### 6.2.1 C1 System Context

![C1 System Context](./docs/c4-model/c1-system-context.png)

#### 6.2.2 C2 Container

![C1 Container](./docs/c4-model/c2-container.png)

### 6.2.3 Back-End

[Back-End Architecture](./server/README.MD)

### 6.2.4 Front-End

[Front-End Architecture](./client/README.md)


## 7 Planning

Like the typical tickets in Clickup of Azure Boards, I will add files for each ticket in [the planning folders](./docs/planning/) with a simple description of the task without time estimations. This is for the sake of simplicity

## 8 Git Messages

I will enforce consistent commit message conventions using the following packages: `husky` and `commitlint`

## 9. Technologies Used

This is a list of the technologies used with a brief description

- **Blockchain**: a decentralized and distributed ledger system that records transactions batched in blocks. These blocks are verified by a network of nodes and added  to a public chain, creating a transparent, immutable and secure records
- **Etheruem Blockchain**: a decentralized blockchain with smart contract functionality, **ether** is its native cryptocurrency, and unlike Bitcoin that uses the proof of work consensus mechanism, Ethereum uses proof of stake
- **EVM**: Ethereum Virtual machine is a decentralized virtual machine that operates on the Ethereum blockchain, and it responsible for executing smart contracts and updating the state of the chain

- **Solidity**: a high level programming language to create smart contracts. It is compiled into opcode then bytecode which is then deployed on the Ethereum network as transaction. Once deployed we can interact with it by sending transactions to its address and the EVM handles executing that smart contract

- **HardHat**: an Ethereum development environment that can compile contracts and run them on a development network.

- **Remixd**: for compiling, deploying and testing the contract

- **Chai**: a javascript testing library that we can use to assert act verify (BDD/TDD assertion). Used in the [nft](./packages/nft/) project to write test cases for the token contract

- **husky**: a js library that allows us to insert hooks into the git lifecycle

- **commitlint**: a js library used with husky's hooks to enforce commit message conventions based on specific rules. The main types used in this project are `chore`, `docs`, `feat`

- **yarn** package manager

- **Ether.js**: a js library used to interact with the etheruem blockchain and its ecosystem.

- **Metamask**: a cryptocurrency wallet that can be installed as a browser extension or app. It allows users to connect to their ethereum wallet and interact with the Ethereum blockchain

- **Pinara**: a decentralized storage platform that utilizes the IPFS to store and distribute data.

-  **Zod**: a js schema validation library

- **Vue js**
