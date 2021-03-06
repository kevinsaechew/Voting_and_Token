// get instance of smart contract
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"user","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"voterDetails","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"bytes32"},{"name":"votesInTokens","type":"uint256"}],"name":"downvoteForUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allUsers","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"bytes32"},{"name":"toAddress","type":"address"},{"name":"votesInTokens","type":"uint256"}],"name":"voteForUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"transferTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voterInfo","outputs":[{"name":"voterAddress","type":"address"},{"name":"tokensBought","type":"uint256"},{"name":"tokensOwned","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"bytes32"}],"name":"indexOfUser","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"tokens","type":"uint256"},{"name":"pricePerToken","type":"uint256"},{"name":"userNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
Voting = web3.eth.contract(abi);
contractInstance = Voting.at('0x1cff61b8259f05f4bbf7aa4f769321e5fa70b22d'); // Change to actual contract address

// a dictionary of users
let users = {}

// current token price
let tokenPrice = null;


window.voteForUser = function(user) {
  let userName = $("#user").val();
  let voteTokens = $("#vote-tokens").val();
  $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
  $("#user").val("");
  $("#vote-tokens").val("");

  /* Voting.deployed() returns an instance of the contract. Every call
   * in Truffle returns a promise which is why we have used then()
   * everywhere we have a transaction call
   */
    contractInstance.voteForUser(userName, web3.eth.accounts[1], voteTokens, {gas: 240000, from: web3.eth.accounts[0]});//.then(function() {
      let div_id = users[userName];
      result = contractInstance.totalVotesFor.call(userName); 
        $("#" + div_id).html(result.toString());
        $("#msg").html("");
      return result
}

window.downvoteForUser = function(user) {
  let userName = $("#user").val();
  let voteTokens = $("#vote-tokens").val();
  $("#msg").html("Vote has been submitted: Insufficient tokens needed to vote")
  $("#user").val("");
  $("#vote-tokens").val("");

    contractInstance.downvoteForUser(userName, web3.eth.accounts[1], voteTokens, {gas: 140000, from: web3.eth.accounts[0]});//.then(function() {
      let div_id = users[userName];
      result = contractInstance.totalVotesFor.call(userName);
        $("#" + div_id).html(result.toString());
        $("#msg").html("");
      return result

}

window.voteForUser2 = function(user) {
  let userName = $("#user").val();
  let voteTokens = $("#vote-tokens").val();
  $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
  $("#user").val("");
  $("#vote-tokens").val("");

  /* Voting.deployed() returns an instance of the contract. Every call
   * in Truffle returns a promise which is why we have used then()
   * everywhere we have a transaction call
   */
    contractInstance.voteForUser(userName, web3.eth.accounts[0], voteTokens, {gas: 140000, from: web3.eth.accounts[1]});//.then(function() {
      let div_id = users[userName];
      result = contractInstance.totalVotesFor.call(userName); 
        $("#" + div_id).html(result.toString());
        $("#msg").html("");
      return result
}

window.downvoteForUser2 = function(user) {
  let userName = $("#user").val();
  let voteTokens = $("#vote-tokens").val();
  $("#msg").html("Vote has been submitted: Insufficient tokens needed to vote")
  $("#user").val("");
  $("#vote-tokens").val("");

    contractInstance.downvoteForUser(userName, web3.eth.accounts[0], voteTokens, {gas: 140000, from: web3.eth.accounts[1]});//.then(function() {
      let div_id = users[userName];
      result = contractInstance.totalVotesFor.call(userName);
        $("#" + div_id).html(result.toString());
        $("#msg").html("");
      return result

}

// New function for voting based on selected Node
// Takes tokens from first account
// This function would also call MapView's function
window.voteForCandidateNode = function(candidate) {
  let candidateName = $("#candidate").val();
  let voteTokens = $("#vote-tokens").val();
  $("#msg").html("Vote has been submitted.");
  $("#candidate").val("");
  $("#vote-tokens").val("");

  // let account = user.account
  // let candidateName = user.owner instead of getting owner from text field 

    contractInstance.voteForCandidate(candidateName, account, voteTokens, {gas: 140000, from: web3.eth.accounts[0]});
      let div_id = candidates[candidateName];
      result = contractInstance.totalVotesFor.call(candidateName); 
        $("#" + div_id).html(result.toString());
        $("#msg").html("");
      return result
}

/* The user enters the total no. of tokens to buy. We calculate the total cost and send it in
 * the request. We have to send the value in Wei. So, we use the toWei helper method to convert
 * from Ether to Wei.
 */

window.buyTokens = function() {
  let tokensToBuy = $("#buy").val();
  let price = tokensToBuy * tokenPrice;
  $("#buy-msg").html("Purchase order has been submitted. Please wait.");
    contractInstance.buy({value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0]});
      $("#buy-msg").html("");
      web3.eth.getBalance(contractInstance.address, function(error, result) {
        $("#contract-balance").html(web3.fromWei(result.toString()) + " Ether");
      });

  populateTokenData();
}

window.lookupVoterInfo = function() {
  let address = $("#voter-info").val();
    voterDets = contractInstance.voterDetails.call(address);
      $("#tokens-bought").html("Total Tokens bought: " + voterDets[0].toString());
      let votesPerUser = voterDets[1];
      $("#votes-cast").empty();
      $("#votes-cast").append("Votes cast per user: <br>");
      let allUsers = Object.keys(users);
      for(let i=0; i < allUsers.length; i++) {
        $("#votes-cast").append(allUsers[i] + ": " + votesPerUser[i] + "<br>");
      }
      $("#tokens-owned").html("Total Tokens owned: " + voterDets[2].toString());

}

/* Instead of hardcoding the users hash, we now fetch the user list from
 * the blockchain and populate the array. Once we fetch the users, we setup the
 * table in the UI with all the users and the votes they have received.
 */
function populateUsers() {
    userArray = contractInstance.allUsers.call()
      for(let i=0; i < userArray.length; i++) {
        /* We store the user names as bytes32 on the blockchain. We use the
         * handy toUtf8 method to convert from bytes32 to string
         */
        users[web3.toUtf8(userArray[i])] = "user-" + i;
      }
      setupUserRows();
      populateUserVotes();
      populateTokenData();

}

/* Fetches the number of votes the users have from their upvoted nodes
 */
function populateUserVotes() {
  let userNames = Object.keys(users);
  for (var i = 0; i < userNames.length; i++) {
    let name = userNames[i];
  let val = contractInstance.totalVotesFor.call(name).toString() //Reads from network
  $("#" + users[name]).html(val); // Gets DOM object for user and updates HTML on page

  }
}

/* Creates the UI for the rows of users and the number of upvotes/tokens they have
 */
function setupUserRows() {
  Object.keys(users).forEach(function (user) {
    $("#user-rows").append("<tr><td>" + user + "</td><td id='" + users[user] + "'></td></tr>");
  });
}

/* Fetch the total tokens, tokens available for sale and the price of
 * each token and display in the UI
 */
function populateTokenData() {
    let totalTokens = contractInstance.totalTokens();
      $("#tokens-total").html(totalTokens.toString());
    let totalSold = contractInstance.tokensSold.call();
      $("#tokens-sold").html(totalSold.toString());
    let tPrice = contractInstance.tokenPrice();
      tokenPrice = parseFloat(web3.fromWei(tPrice.toString()));
      $("#token-cost").html(tokenPrice + " Ether");
    web3.eth.getBalance(contractInstance.address, function(error, result) {
      $("#contract-balance").html(web3.fromWei(result.toString()) + " Ether");
    });
}

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  populateUsers();

});
