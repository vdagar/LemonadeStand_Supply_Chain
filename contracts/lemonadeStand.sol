pragma solidity ^0.5.0;

contract lemonadeStand {
	address payable owner;
	uint skuCount;
	uint shipCount;

	enum State {ForSale, Sold, Shipped}

	struct Item {
		string name;
		uint sku;
		uint price;
		State state;
		address payable seller;
		address payable buyer;
	}

	mapping(uint => Item) items;

	event ForSale(uint skuCount);
	event Sold(uint sku);
	event Shipped(uint sku);

	modifier onlyOwner() {
		require(msg.sender == owner, "This function can only be called by the owner");
		_;
	}

	modifier verifyCaller(address _address) {
		require(msg.sender == _address, "Invalid call to the function");
		_;
	}

	modifier paidEnough(uint _price) {
		require(msg.value >= _price, "Not paid enough price.");
		_;
	}

	modifier forSale(uint _sku) {
		require(items[_sku].state == State.ForSale, "This item is not for sale");
		_;
	}

	modifier sold(uint _sku) {
		require(items[_sku].state == State.Sold, "This item is sold");
		_;
	}

	constructor() public {
		owner = msg.sender;
		skuCount = 0;
	}

	function addItem(string memory _name, uint _price) public onlyOwner {
		skuCount = skuCount + 1;

		emit ForSale(skuCount);
		items[skuCount] = Item(_name, skuCount, _price, State.ForSale, msg.sender, address(0));
	}

	function buyItem(uint _sku) public payable forSale(_sku) paidEnough(items[_sku].price) {
		uint change = msg.value - items[_sku].price;
		items[_sku].buyer = msg.sender;
		items[_sku].state = State.Sold;
		items[_sku].seller.transfer(items[_sku].price);
		items[_sku].buyer.transfer(change);
		emit Sold(_sku);
	}

	function fetchItem(uint _sku) public view returns (string memory name,
						uint sku, uint price, string memory stateIs, address seller, address buyer) {
		uint state;
		name = items[_sku].name;
		sku = items[_sku].sku;
		price = items[_sku].price;
		state = uint(items[_sku].state);

		if( state == 0) {
			stateIs = "For Sale";
		}

		if( state == 1) {
			stateIs = "Sold";
		}

		if (state == 2) {
			stateIs = "Shipped";
		}

		seller = items[_sku].seller;
		buyer = items[_sku].buyer;
	}

	function shipItem(uint _sku) public onlyOwner sold(_sku) returns(uint shipId) {
		shipCount = shipCount + 1;
		shipId = shipCount;
		items[_sku].state = State.Shipped;
		emit Shipped(_sku);
	}

	function kill() external onlyOwner {
        require(msg.sender == owner, "Only the owner can kill this contract");
        selfdestruct(owner);
    }
}
