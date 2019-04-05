const lemonadeStand = artifacts.require("lemonadeStand");
const truffleAssert = require('truffle-assertions');
const assert = require("chai").assert;

contract('lemonadeStand', accounts => {
    const name = "Phone";
    const price = 200;

    let defaultAccount = accounts[0];
    let account1 = accounts[1];
    let account2 = accounts[2];

    beforeEach(async function() {
        this.contract = await lemonadeStand.new({from: defaultAccount});
    })

    afterEach(async function() {
        await this.contract.kill({from: defaultAccount});
    });

    describe("Add new Item for Sale", () => {
        it("should be able to add a new item for the sale", async function() {         
            let tx = await this.contract.addItem(name, price, {from: defaultAccount});

            truffleAssert.eventEmitted(tx, 'ForSale', (ev) => {
                productId = ev.skuCount;
                return ev.skuCount == 1;
            });
        });
    });

    describe("Fetch item for sale", () => {
        it("Should be able to fetch an item for sale with product Id", async function(){
            let productId;
            let tx = await this.contract.addItem(name, price, {from: defaultAccount});

            truffleAssert.eventEmitted(tx, 'ForSale', (ev) => {
                productId = ev.skuCount;
                return ev.skuCount == 1;
            });

            tx = await this.contract.fetchItem(productId, {from: defaultAccount});
            assert.equal(tx.name, name);
            assert.equal(tx.price, price);
            assert.equal(tx.stateIs, "For Sale");
            assert.equal(tx.seller, defaultAccount);
            assert.equal(tx.buyer, 0x0);
        });
    });

    describe("Buy Item", () => {
        it("Should be able to buy an item for sale", async function() {
            let productId;
            let productPrice;
            let tx = await this.contract.addItem(name, price, {from: defaultAccount});

            truffleAssert.eventEmitted(tx, 'ForSale', (ev) => {
                productId = ev.skuCount.toString();
                return ev.skuCount == 1;
            });

            tx = await this.contract.fetchItem(productId, {from: defaultAccount});
            assert.equal(tx.name, name);
            assert.equal(tx.price, price);
            assert.equal(tx.stateIs, "For Sale");
            assert.equal(tx.seller, defaultAccount);
            assert.equal(tx.buyer, 0x0);

            productPrice = tx.price;

            tx = await this.contract.buyItem(productId, {from: account1, value: productPrice});

            truffleAssert.eventEmitted(tx, "Sold", (ev) => {
                let skuid = ev.sku.toString();
                return skuid == productId;
            });

            tx = await this.contract.fetchItem(productId, {from: defaultAccount});
            assert.equal(tx.stateIs, "Sold");
            assert.equal(tx.buyer, account1);

        });
    });

    describe("Ship Item", () => {
        it("Should be able to ship an sold item", async function() {
            let productId;
            let productPrice;
            let tx = await this.contract.addItem(name, price, {from: defaultAccount});

            truffleAssert.eventEmitted(tx, 'ForSale', (ev) => {
                productId = ev.skuCount.toString();
                return ev.skuCount == 1;
            });

            tx = await this.contract.fetchItem(productId, {from: defaultAccount});
            assert.equal(tx.name, name);
            assert.equal(tx.price, price);
            assert.equal(tx.stateIs, "For Sale");
            assert.equal(tx.seller, defaultAccount);
            assert.equal(tx.buyer, 0x0);

            productPrice = tx.price;

            tx = await this.contract.buyItem(productId, {from: account1, value: productPrice});

            truffleAssert.eventEmitted(tx, "Sold", (ev) => {
                let skuid = ev.sku.toString();
                return skuid == productId;
            });

            tx = await this.contract.fetchItem(productId, {from: defaultAccount});
            assert.equal(tx.stateIs, "Sold");
            assert.equal(tx.buyer, account1);

            tx = await this.contract.shipItem(productId);

            truffleAssert.eventEmitted(tx, "Shipped", (ev) => {
                let skuid = ev.sku;
                return skuid == productId;
            });

            tx = await this.contract.fetchItem(productId, {from: defaultAccount});
            assert.equal(tx.stateIs, "Shipped");
        });
    });
});