function initializeAvailableNotes(noteTypes){
  var avlNotes = {};
  for (var i in noteTypes) {
    avlNotes[noteTypes[i]] = 0;
  }
  return avlNotes;
}

function Atm(){
  //Total amount in ATM
  this.amount = 0;
  //Type of currency that ATM can process
  this.noteTypes = [2000, 500, 100];
  //Object in which key denotes type of Note and value denotes Number of notes
  this.avlNotes = initializeAvailableNotes(this.noteTypes);
  //Max Limit user can withdrawal
  this.maxLimit = 100;
}

var atm = new Atm();
//console.log(atm);


//Transaction class
function Transaction(){
  this.db_cr = 0;
  this.amount;
  this._2000;
  this._500;
  this._100;
  this.leftAmount;
}

//Add money to Atm
function addMoney(noof2000, noof500, noof100, total_money, maxLimit){
  atm.amount += total_money;
  atm.avlNotes["2000"] += noof2000;
  atm.avlNotes["500"] += noof500;
  atm.avlNotes["100"] += noof100;
  atm.maxLimit = maxLimit;
}
//addMoney(1,10,5,7500);


//This function is called when Add Money button is clicked.
function addNotes()
{
  console.log("inside");
  var noof2000 = parseInt(document.getElementById('no2000').value);
  var noof500 = parseInt(document.getElementById('no500').value);
  var noof100 = parseInt(document.getElementById('no100').value);
  var maxLimit = parseInt(document.getElementById('maxLimit').value);


  if(noof2000 < 0 || noof500 < 0 || noof100 < 0){
    $("#ErrorBank").text("Please Enter Positive number of Notes");
    return;
  }

  var total_money=(noof2000*2000 + noof500*500 + noof100*100);
  if(!total_money){
    $("#ErrorBank").text("Please Add Notes in the ATM");
    return;
  }

  addMoney(noof2000, noof500, noof100, total_money, maxLimit);

  var btn=document.getElementById('addNote');
  btn.disabled=true;

  var transaction = new Transaction();
  transaction.amount = atm.amount;
  transaction._2000 = atm.avlNotes["2000"];
  transaction._500 = atm.avlNotes["500"];
  transaction._100 = atm.avlNotes["100"];
  transaction.leftAmount = atm.amount;

  alert("Total Money Added : " + total_money + "\nNumber of 2000 notes : " + noof2000 + "\n" + "Number of 500 notes : " + noof500+ "\nNumber of 100 notes : " + noof100);

  $(".tablebody").append('<tr class="green">'+ '<td>'+ transaction.amount +'</td>'+ '<td>'+ transaction._2000 +'</td>'+ '<td>'+ transaction._500 +'</td>'+'<td>'+transaction._100+'</td>'+'<td>'+transaction.leftAmount+'</td>'+'</tr>');

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

  if(amountTransacted % 100 == 0){
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

  return false;
}

//console.log(validate(7100));



//This array contains all the transactions.
var stats = [];

//Update value in ATM
function withdrawMoney(noof2000, noof500, noof100, moneyWithdrawn){
  atm.amount -= moneyWithdrawn;
  atm.avlNotes["2000"] -= noof2000;
  atm.avlNotes["500"] -= noof500;
  atm.avlNotes["100"] -= noof100;
}

//This function called when withdrawal button is clicked.
function withdrawal(){
  var withdrawalAmount = parseInt(document.getElementById('wd').value);
  if(withdrawalAmount <= 0){
    alert("Please Enter a valid amount!!!");
    return;
  }
  //console.log(withdrawalAmount);
  var result = validate(withdrawalAmount);
  if(result == 1){
    alert("Balance not available!");
    return;
  }
  if(result == 2){
    alert("Maximum Limit Exceeded");
    return;
  }
  if(result){
    withdrawMoney(result["2000"], result["500"], result["100"], withdrawalAmount);

    var transaction = new Transaction();
    transaction.amount = withdrawalAmount;
    transaction._2000 = atm.avlNotes["2000"];
    transaction._500 = atm.avlNotes["500"];
    transaction._100 = atm.avlNotes["100"];
    transaction.leftAmount = atm.amount;

    $(".tablebody").append('<tr class="red">'+ '<td>'+ transaction.amount +'</td>'+ '<td>'+ transaction._2000 +'</td>'+ '<td>'+ transaction._500 +'</td>'+'<td>'+transaction._100+'</td>'+'<td>'+transaction.leftAmount+'</td>'+'</tr>');

    $("#curAmount").text(atm.amount);
  }
  else{
    alert("Invalid withdrawal amount!!!!!")
  }
}
