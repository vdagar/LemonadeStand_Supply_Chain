# Lemonade Stand Supply Chain Example

In this project, we will create a DApp by adding functionality to your smart contract and deploy it on the local testnet. You will get to practice your knowledge of the basics of Solidity.

In this project, we created a smart contract and created a supply chain Dapp.

# What will I learn

This project will help me in understanding how to write a simple smart contract in solidity, compile the smart contract and deploy it the local blockchain created with the help of ganache-cli. I will also learn how to automate the test of the smart contract in using truffle, Mocha and Chai. Truffle inbuild uses Mocha for testing smart contract. It will also help in understanding the basics of supply chain management and its working on the Ethereum blockchain.

# Getting Started

## Prerequisites

- Truffle - For compling and deploying the smart contract on the blockchain.
- Ganache-cli - For creating a private local blockchain to deploy contract to.

## Running the tests
- To test on the on Developmen network run the command: `truffle test`
- To test on the on Rinkeby test network run the command: `truffle test --network rinkeby`

## Deployment
- To deploy on the development network run the command: `truffle migrate`
- To deploy on the Rinkeby public test network use the command: `truffle migrate --network rinkeby --reset --compile-all`

## Console Output

```
Compiling your contracts...
===========================
> Compiling ./contracts/lemonadeStand.sol
> Artifacts written to /home/virender/learning/blockchain/supplychain/lemonade/build/contracts
> Compiled successfully using:
   - solc: 0.5.0+commit.1d4f565a.Emscripten.clang


Starting migrations...
======================
> Network name:    'development'
> Network id:      1554350991919
> Block gas limit: 0x6691b7


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xa66edbdf73708de9c52062c422c4935f6f29710dba06adf9795694296be457e9
   > Blocks: 0            Seconds: 0
   > contract address:    0xF08F3aAb1e075bD8d0e06Cede02629355119f834
   > account:             0x0dF1a827583d56B6c85e638d1bea4A2b38B96903
   > balance:             97.1148744400000048
   > gas used:            284908
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00569816 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00569816 ETH


2_deploy_contracts.js
=====================

   Deploying 'lemonadeStand'
   -------------------------
   > transaction hash:    0xe82cab494a2578bbb4f6ae09b45be2e0367471113e276f3bd246ffc1c487a546
   > Blocks: 0            Seconds: 0
   > contract address:    0xdb98E8858e18efa3dE8E16CB06b94B4F2Ce6A2D9
   > account:             0x0dF1a827583d56B6c85e638d1bea4A2b38B96903
   > balance:             97.0901921200000048
   > gas used:            1192082
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.02384164 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.02384164 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.0295398 ETH
```

## Test Output

```
truffle test
Using network 'development'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: lemonadeStand
    Add new Item for Sale
      ✓ should be able to add a new item for the sale
    Fetch item for sale
      ✓ Should be able to fetch an item for sale with product Id (62ms)
    Buy Item
      ✓ Should be able to buy an item for sale (108ms)
    Ship Item
      ✓ Should be able to ship an sold item (160ms)


  4 passing (639ms)
```
