function addNotes()
{
    var noof2000=parseInt(document.getElementById('no2000').value);
    var noof500=parseInt(document.getElementById('no500').value);
    var noof100=parseInt(document.getElementById('no100').value);
    var total_notes_added=noof2000+noof500+noof100;
    var total_money=(noof2000*2000+noof500*500+noof100*100);

    alert("Total notes Added :" + total_notes_added + "\nTotal Money Added : " + total_money + "\nNumber of 2000 notes : " + noof2000 + "\n" + "Number of 500 notes : " + noof500+ "\n" + "Number of 100 notes : " + noof100);
}


/*
$(document).ready(function(){
    ('#addNote').click(function () {
        $('.currencyReport').append('<table><tr><td>+$("#no2000").val()</td></tr>')
    });


})*/
