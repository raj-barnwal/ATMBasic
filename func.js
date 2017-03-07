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
