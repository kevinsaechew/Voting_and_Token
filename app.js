
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"voterDetails","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"},{"name":"votesInTokens","type":"uint256"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"},{"name":"votesInTokens","type":"uint256"}],"name":"downvoteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allCandidates","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"transferTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voterInfo","outputs":[{"name":"voterAddress","type":"address"},{"name":"tokensBought","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"indexOfCandidate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"tokens","type":"uint256"},{"name":"pricePerToken","type":"uint256"},{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

Voting = web3.eth.contract(abi);

contractInstance = Voting.at('0x30753e4a8aad7f8597332e813735def5dd395028'); // Change to actual contract address

let candidates = {} // Used to be hard-coded

let tokenPrice = null;

window.voteForCandidate = function(candidate) {
  let candidateName = $("#candidate").val();
  let voteTokens = $("#vote-tokens").val();
  $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
  $("#candidate").val("");
  $("#vote-tokens").val("");

    contractInstance.voteForCandidate(candidateName, voteTokens, {gas: 140000, from: web3.eth.accounts[0]});//.then(function() {
      let div_id = candidates[candidateName];
      result = contractInstance.totalVotesFor.call(candidateName);
        $("#" + div_id).html(result.toString());
        $("#msg").html("");
      return result

}

window.downvoteForCandidate = function(candidate) {
  let candidateName = $("#candidate").val();
  let voteTokens = $("#vote-tokens").val();
  $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
  $("#candidate").val("");
  $("#vote-tokens").val("");

    contractInstance.downvoteForCandidate(candidateName, voteTokens, {gas: 140000, from: web3.eth.accounts[0]});//.then(function() {
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
      let votesPerCandidate = voterDets[1];
      $("#votes-cast").empty();
      $("#votes-cast").append("Votes cast per candidate: <br>");
      let allCandidates = Object.keys(candidates);
      for(let i=0; i < allCandidates.length; i++) {
        $("#votes-cast").append(allCandidates[i] + ": " + votesPerCandidate[i] + "<br>");
      }

}

/* Instead of hardcoding the candidates hash, we now fetch the candidate list from
 * the blockchain and populate the array. Once we fetch the candidates, we setup the
 * table in the UI with all the candidates and the votes they have received.
 */
function populateCandidates() {
    candidateArray = contractInstance.allCandidates.call()
      for(let i=0; i < candidateArray.length; i++) {
        /* We store the candidate names as bytes32 on the blockchain. We use the
         * handy toUtf8 method to convert from bytes32 to string
         */
        candidates[web3.toUtf8(candidateArray[i])] = "candidate-" + i;
      }
      setupCandidateRows();
      populateCandidateVotes();
      populateTokenData();

}

function populateCandidateVotes() {
  let candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
  let val = contractInstance.totalVotesFor.call(name).toString() //Reads from network
  $("#" + candidates[name]).html(val); // Gets DOM object for candidate and updates HTML on page

  }
}

function setupCandidateRows() {
  Object.keys(candidates).forEach(function (candidate) {
    $("#candidate-rows").append("<tr><td>" + candidate + "</td><td id='" + candidates[candidate] + "'></td></tr>");
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
  populateCandidates();

});
