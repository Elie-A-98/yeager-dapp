# Full-Stack Javascript Developer Task - Web3  Integration

# Table of Contents

[1. Introduction](#1-introduction)

&nbsp;&nbsp;[1.1 Purpose of this Repository](#11-purpose-of-this-repository)

&nbsp;&nbsp;[1.2 Out of scope](#12-out-of-scope)

[2. DApp Overview](#2-dapp-overview)

[3. Architecture](#3-architecture)

&nbsp;&nbsp;[3.0 C4 Model](#30-c4-model)

&nbsp;&nbsp;[3.0.1 C1 System Context](#301-c1-system-context)

&nbsp;&nbsp;[3.0.2 C2 Container](#302-c2-container)

&nbsp;&nbsp;[3.1 Back-End](#31-back-end)

&nbsp;&nbsp;[3.2 Front-End](#32-front-end)

[4. Project Structure and Conventions](#4-project-structure-and-conventions)

&nbsp;&nbsp;[4.1 Planning](#41-planning)

&nbsp;&nbsp;[4.2 Monorepo](#42-monorepo)

&nbsp;&nbsp;[4.3 Branching Strategy](#43-branching-strategy)

&nbsp;&nbsp;[4.4 Git messages](#44-git-messages)

&nbsp;&nbsp;[4.5 Documentation](#45-documentation)

[5. How to Run](#5-how-to-run)

[6. Technologies Used](#6-technologies-used)

[7. Assumptions and Decisions](#7-assumptions-and-decisions)


## 1. Introduction

### 1.1 Purpose of this Repository

This repository aims to deliver a solution that aligns with the project requirements outlined in the [Fullstack_js_-_Web3_Integration](./docs/planning/documents/Fullstack_js_-_Web3_Integration.pdf) document I received on September 10, 2024.

This is a list of the main goals of this repository:

- Implementing all the specified project requirements
- Effective utilization of the designated technologies.
- Demonstration of my knowledge of Web3
- Demonstration of my ability to build a full-stack Web3 application that is both maintainable and scalable.
- Share the decisions and assumptions I made as well as the challenges faced during development.

### 1.2 Out of scope

This is a list of subjects which aree out of scope for this repository:

- Showing proficiency with solidity
- Showing advanced blockchain contract implementation capabilities
- Demonstration of the capability of scaling smart contracts and using production ready tools like Alchemy

## 2. DApp Overview

I developed a DApp (Decentrazlized Application) that enables users to interact with digital assets on the **Ethereum blockchain**.

**Elieum (ELI)** is a new **ERC-721** compliant token (NFT) created using an ERC-721 compliant contract in [packages/nft/contracts/token.sol](./packages/nft/contracts/token.sol)

*After confirming with Araceli Martinez that the link provided for the smart contract in the requirement documents is not working, I used an industry standard ERC-721 contract from Oppenzeppelin*

**Users** are able to connect their ethereum wallet, **display a gallery of the digital assets** owned by the connected wallet and **transfer digital assets** to other addresses.

Additionally as mentioned in the project requirements document, **users should be able to mint new digital assets**. But allowing anyone to mint new NFT needs some considerations and can significantly devalue the token. 
For that reason I took the assumption that **users will need to request from the owner of the smart contract to mint them a new Elieum** and link it to a digital asset. The owner can decided the addresses allowed to mint, based on some condition which i will decide later (but keep simple).

Tokens are stored on the blockchain, but the **metadata of the digital asset and the digital asset itself are both stored on ipfs**. 

The **DApp** consists of the following:

- **Ethereum Blockchain**

- **EVM (Ethereum virtual machine)**

- **Back-end** application responsible for receiving minting requests and providing helper apis for the front-end for example to store metadata files in ipfs. Additionally it is where I will store some sensitive keys to avoid leaking them to the client thus compromising security.
<br>**Sensitive keys** for now will be stored as environment variables in `.env` file and included in `.gitignore`. But on production a secrets management service like AWS Secrets Manager or Azure Key Vault should be used to securely store the keys and access them at the back-end application starting phase.

- **Front-end** application reponsible for allowing the users to view their asset gallery, trasfering assets to other addresses and sending minting requests to the Back-end.
<br>I will keep the user close to the blockchain and I won't store data on the backend unless necessary.
<br>So for querying the smart contract and tranfering tokens the client app will directly use `ether.js`
<br>It will use the backend only for requesting the owner to mint a new token for a user after he uploads the asset and metadata through a form
<br>**The UI is responsive, user-friendly, SEO friendly** and tailored only for web for now. While SEO may not be as critical for a DApp as it is for a traditional website, optimizing our SEO will help increase the visibility of the app within the Web3 community

## 3. Architecture

### 3.0 C4 Model

[C4 model](https://c4model.com/) is a lean graphical notation technique for modelling the architecture of software systems. <br>

As can be found on the website of the author of this model ([Simon Brown](https://simonbrown.je/)): *The C4 model was created as a way to help software development teams describe and communicate software architecture, both during up-front design sessions and when retrospectively documenting an existing codebase* <br>

I will only draw the C1 and C2 level. This is actually a recommendation from the C4 Model author as C3 and C4 are meant only for complex scenarios<br>

*Note: The [IcePanel](https://app.icepanel.io/) platform was used to draw all C4 model levels*.

#### 3.0.1 C1 System Context

![C1 System Context](./docs/c4-model/c1-system-context.png)

#### 3.0.2 C2 Container

![C1 Container](./docs/c4-model/c2-container.png)

### 3.1 Back-End

[Back-End Architecture](./server/README.MD)

### 3.2 Front-End

[Front-End Architecture](./client/README.md)

## 4. Project structure and Conventions

### 4.1 Planning

Like the typical tickets in Clickup of Azure Boards, I will add files for each ticket in [the planning folders](./docs/planning/) with a simple description of the task without time estimations. This is for the sake of simplicity

### 4.2 Monorepo

For the sake of simplicity and because it is convenient, I used yarn workspaces to structure the project as a single monorepo.

There are 3 workspaces:
- Client
- Server
- Packages/*: contains code that can be shared and that doesn't belong to any other workspace. For ex the contracts Abis, types and some utility functions

### 4.3 Branching Startegy

I will have 2 environments: dev and production (main).
For the sake of simplicity, I will use feature branching

### 4.4 Git Messages

I will enforce consistent commit message conventions using the following packages: `husky` and `commitlint`

## 5. How to Run

## 6. Technologies Used

This is a list of the technologies used with a brief description

- **Blockchain**: a decentralized and distributed ledger system that records transactions batched in blocks. These blocks are verified by a network of nodes and added  to a public chain, creating a transparent, immutable and secure records
- **Etheruem Blockchain**: a decentralized blockchain with smart contract functionality, **ether** is its native cryptocurrency, and unlike Bitcoin that uses the proof of work consensus mechanism, Ethereum uses proof of stake
- **EVM**: Ethereum Virtual machine is a decentralized virtual machine that operates on the Ethereum blockchain, and it responsible for executing smart contracts and updating the state of the chain

- **Solidity**: a high level programming language to create smart contracts. It is compiled into opcode then bytecode which is then deployed on the Ethereum network as transaction. Once deployed we can interact with it by sending transactions to its address and the EVM handles executing that smart contract

- **HardHat**: an Ethereum development environment that can compile contracts and run them on a development network.

- **Chai**: a javascript testing library that we can use to assert act verify (BDD/TDD assertion). Used in the [nft](./packages/nft/) project to write test cases for the token contract

- **husky**: a js library that allows us to insert hooks into the git lifecycle

- **commitlint**: a js library used with husky's hooks to enforce commit message conventions based on specific rules. The main types used in this project are `chore`, `docs`, `feat`

- **yarn** package manager

- **Ether.js**: a js library used to interact with the etheruem blockchain and its ecosystem.

- **Metamask**: a cryptocurrency wallet that can be installed as a browser extension or app. It allows users to connect to their ethereum wallet and interact with the Ethereum blockchain


## 7. Assumptions and Decisions

