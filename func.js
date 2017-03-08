//This function initialize the avlNotes object with 0 value.
function initializeAvailableNotes(noteTypes){
  var avlNotes = {};
  for (var i in noteTypes) {
    avlNotes[noteTypes[i]] = 0;
  }
  return avlNotes;
}

//ATM class
function Atm(){
  //Total amount in ATM
  this.amount = 0;
  //Type of currency that ATM can process
  this.noteTypes = [2000, 500, 100, 50];
  //Object in which key denotes type of Note and value denotes Number of notes
  this.avlNotes = initializeAvailableNotes(this.noteTypes);
  //Max Limit user can withdrawal
  this.maxLimit = 50;
}

//atm object
var atm = new Atm();


//Transaction class
function Transaction(){
  this.db_cr = 0;
  this.amount;
  this._2000;
  this._500;
  this._100;
  this._50;
  this.leftAmount;
}


//This array contains all the transactions.
var stats = [];


//Add money to Atm
function addMoney(noof2000, noof500, noof100, noof50, total_money, maxLimit){
  atm.amount += total_money;
  atm.avlNotes["2000"] += noof2000;
  atm.avlNotes["500"] += noof500;
  atm.avlNotes["100"] += noof100;
  atm.avlNotes["50"] += noof50;
  atm.maxLimit = maxLimit;
}


//This function is called when Add Money button is clicked.
function addNotes()
{
  //Parse values from input fields.
  var noof2000 = parseInt(document.getElementById('no2000').value);
  var noof500 = parseInt(document.getElementById('no500').value);
  var noof100 = parseInt(document.getElementById('no100').value);
  var noof50 = parseInt(document.getElementById('no50').value);
  var maxLimit = parseInt(document.getElementById('maxLimit').value);

  if(noof2000 == 0 && noof500 == 0 && noof100 == 0 && noof50 ==0){
      $("#Error").text("Please Enter some notes");
      return;
  }
  if(noof2000 < 0 || noof500 < 0 || noof100 < 0 || noof50 < 0){
    $("#Error").text("Please Enter Positive number of Notes");
    return;
  }

  if(maxLimit<50)
  {
    $("#Error").text("Please Enter Maximum Limit (Minimum 50)");
    return;
  }

  //Calculate total money added to ATM in this transaction.
  var total_money=(noof2000*2000 + noof500*500 + noof100*100 + noof50*50);
  //Check if nothing is added.
  if(!total_money){
    $("#Error").text("Please Add Notes in the ATM");
    return;
  }

  //Update values in ATM
  addMoney(noof2000, noof500, noof100, noof50, total_money, maxLimit);

  //Disable Add money button
  var btn=document.getElementById('addNote');
  btn.disabled=true;
  $('#addNote').css("background","grey");

  //Making transaction object for this transaction.
  var transaction = new Transaction();
  transaction.amount = total_money;
  transaction._2000 = noof2000;
  transaction._500 = noof500;
  transaction._100 = noof100;
  transaction._50 = noof50;
  transaction.leftAmount = atm.amount;
  transaction.db_cr = 1;

  //Add the transaction to stats array
  stats.push(transaction);

  //Append row in table
  $(".tablebody").append(
    '<tr class="green">' +
    '<td>'+transaction.amount+'</td>' +
    '<td>'+transaction._2000+'</td>' +
    '<td>'+transaction._500+'</td>' +
    '<td>'+transaction._100+'</td>' +
    '<td>'+transaction._50+'</td>' +
    '<td>'+transaction.leftAmount+'</td>' +
    '</tr>');

  //Update current amount
  $("#curAmount").text(atm.amount);
}


//Validates that the amount can be withdrawal or not.
function validate(amountTransacted){

  if(amountTransacted > atm.amount){
    return 1;
  }

  if(amountTransacted > atm.maxLimit){
    return 2;
  }

  if(amountTransacted % 50 == 0){
    var noteTypes = atm.noteTypes;
    var avlNotes = atm.avlNotes;

    //Key is type of Note and value is required Number of Notes of that type.
    var reqNotes = {}
    for (var i in noteTypes) {

      noteType = noteTypes[i];

      reqNotes[noteType] = Math.floor(amountTransacted/noteType);
      if(avlNotes[noteType] >= reqNotes[noteType]){
        amountTransacted %= noteType;
      }
      else {
        reqNotes[noteType] = avlNotes[noteType];
        amountTransacted -= noteType*avlNotes[noteType];
      }

    }

    if(amountTransacted == 0){
      return reqNotes;
    }

  }

  return 0;
}


//Withdraw money from ATM
function withdrawMoney(noof2000, noof500, noof100, noof50, moneyWithdrawn){
  atm.amount -= moneyWithdrawn;
  atm.avlNotes["2000"] -= noof2000;
  atm.avlNotes["500"] -= noof500;
  atm.avlNotes["100"] -= noof100;
  atm.avlNotes["50"] -= noof50;
}

//This function called when withdrawal button is clicked.
function withdrawal(){

  //Getting the amount entered by user.
  var withdrawalAmount = parseInt(document.getElementById('wd').value);

  //Check if -ve amount is entered by user.
  if(withdrawalAmount <= 0){
    $('#Error').html("***Please enter some amount***");
    return;
  }

  //Check if entered amount can be withdrawn.
  var result = validate(withdrawalAmount);
  if(result == 1){
    $('#Error').html("***Insufficient balance***");
    return;
  }
  if(result == 2){
    $('#Error').html("***Limit Exceeded***");
    return;
  }

  //'if' block will execute if amount can be withdrawn.
  if(result){
    //Getting number of notes required from the result object and updating value to ATM.
    withdrawMoney(result["2000"], result["500"], result["100"], result["50"], withdrawalAmount);

    //Making transaction object for this transaction.
    var transaction = new Transaction();
    transaction.amount = withdrawalAmount;
    transaction._2000 = atm.avlNotes["2000"];
    transaction._500 = atm.avlNotes["500"];
    transaction._100 = atm.avlNotes["100"];
    transaction._50 = atm.avlNotes["50"];
    transaction.leftAmount = atm.amount;

    //Adding transaction object to stats array
    stats.push(transaction);

    //Adding row to transaction table
    $(".tablebody").append('<tr class="red">'+ '<td>'+ transaction.amount +'</td>'+ '<td>'+ transaction._2000 +'</td>'+ '<td>'+ transaction._500 +'</td>'+'<td>'+transaction._100+'</td>'+'<td>'+transaction._50+'</td>'+'<td>'+transaction.leftAmount+'</td>'+'</tr>');

    //Updating current amount
    $("#curAmount").text(atm.amount);
  }

  //If amount cannot be withdrawn.
  else{
    $('#Error').html("***Oops! Currency Not Available***");
  }

  //console.log(stats);
}
