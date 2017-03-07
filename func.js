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
}

var atm = new Atm();
//console.log(atm);

//Add money to Atm
function addMoney(noof2000, noof500, noof100, total_money){
  atm.amount += total_money;
  atm.avlNotes["2000"] += noof2000;
  atm.avlNotes["500"] += noof500;
  atm.avlNotes["100"] += noof100;
}
//addMoney(1,10,5,7500);

//Get values from user
function addNotes()
{
	var noof2000=parseInt(document.getElementById('no2000').value);
	var noof500=parseInt(document.getElementById('no500').value);
	var noof100=parseInt(document.getElementById('no100').value);
  //if(noof2000 < 0 || noof500 < 0 || noof100 < 0){
    //alert("Please enter a valid value!!!!");
    //return;
  //}
	//var total_notes_added=noof2000+noof500+noof100;
	var total_money=(noof2000*2000 + noof500*500 + noof100*100);
  if(!total_money){
    alert("Please add something!!")
    return;
  }
  var btn=document.getElementById('addNote');
  btn.disabled=true;

  addMoney(noof2000, noof500, noof100, total_money);

	alert("Total Money Added : " + total_money + "\nNumber of 2000 notes : " + noof2000 + "\n" + "Number of 500 notes : " + noof500+ "\nNumber of 100 notes : " + noof100);
}


//Validates that the amount can be withdrawl or not.
function validate(amountTransacted){

  if(amountTransacted % 100 == 0 && amountTransacted <= atm.amount){
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

//console.log(validate(5100));
