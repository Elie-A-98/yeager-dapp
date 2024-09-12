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

This project was initiated at the request of Araceli Martinez as part of the recruitment process to assess my skills.

This repository aims to deliver a solution that aligns with the project requirements outlined in the [Fullstack_js_-_Web3_Integration](./docs/planning/documents/Fullstack_js_-_Web3_Integration.pdf) document I received on September 10, 2024.

Being an assessment project, I will try without over-complicating the solution, to impress the reviewer to maximize the chance of my application being accepted. 

I will set the list below as the main goals of this repository:

- Implementing all the specified project requirements
- Effective utilization of the designated technologies.
- Demonstration of my knowledge of Web3
- Demonstration of my ability to build a full-stack Web3 application that is both maintainable and scalable.
- Share the decisions and assumptions I made.
- Document the time invested and any challenges encountered during the development process.

### 1.2 Out of scope

This is a list of subjects which aree out of scope for this repository:

- Showing proficiency with solidity
- Showing advanced blockchain contract implementation capabilities
- Demonstration of the capability of scaling smart contracts and using production ready tools like Alchemy

## 2. DApp Overview

I developed a DApp (Decentrazlized Application) that enables users to interact with digital assets on the **Ethereum blockchain**.

**ElieNFT** is a new **ERC-721** compliant token (NFT) created using an ERC-721 compliant contract, that when deployed to the network only its owner can mint new ElieNFT tokens.

*After confirming with Araceli Martinez that the link provided for the smart contract in the requirement documents is not working, I used an industry standard ERC-721 contract from Oppenzeppelin*

**Exchange** is a smart contract that users can interact with to transfer NFTs

**Users** are able to connect their ethereum wallet (tested with metamask only so far), **display a gallery of the digital assets** owned by the connected wallet and **transfer digital assets** to other users.

Additionally as mentioned in the project requirements document, **users should be able to mint new digital assets**. But allowing anyone to mint new ElieNFT needs some consideration because it will devalue the token. For that reason users will need to request from the owner of the smart contract to mint them a new ElieNFT and link it to a digital asset. The incentive behind minting new tokens is out of scope of this project but for simplicity minting new token will require a certain wei to be transfered from the users account to the smart contract owner's account.

Tokens are stored on the blockchain, but storing big binaries such as images and metadata on the blockchain is expensive and slow. For that reason the **metadata of the digital asset and the digital asset itself are both stored on ipfs**. 

The **DApp** consist of a front end and a back-end.

The **back-end** is created for the owner to accept minting requests and provide helper apis for the front-end for example to store metadata files in ipfs. Additionally it is necessary for storing some sensitive keys to not compromise security.

The **front-end** interface where the users interact with the application is built with Vue Js 
The UI is responsive, user-friendly, SEO friendly and tailored only for web for now. While SEO may not be as critical for a DApp as it is for a traditional website, optimizing our SEO will help increase the visibility of the app within the Web3 community

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

## 7. Assumptions and Decisions

