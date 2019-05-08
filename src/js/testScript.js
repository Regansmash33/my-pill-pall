

      //used to calculate results
      function submitData() {

        //get input data
         
        var dName = document.getElementById("rxterms").value;
        var dStrength = document.getElementById("drug_strengths").value;
        var maxedFill = document.getElementById("amountFilled").value;
        var numTaken = document.getElementById("takenAmount").value;
        var perDay = document.getElementById("timesPerDay").value;
        var fillDate = document.getElementById("dateFilled").value;
        var startDate = document.getElementById("dateStart").value;
        var pCode = document.getElementById("rxcui").value;

         //disable validate and submit form button
         document.getElementById("submitButton").disabled=true;
         document.getElementById("validateButton").disabled=true;
         document.getElementById("clearButton").disabled=true;

     
         //calculate amount of pills taken per day
         var pillsTakenPerDay = numTaken * perDay;
  
         //calculate duration between start date and today
         var now = moment().startOf('day'); //today date
         var start = moment(startDate, 'YYYY-MM-DD'); //start date
         var daysBetween = moment.duration(now.diff(start)).as('days');
  
         //calculate remaining pills and days worth of medication
         var remainingPills = maxedFill - (pillsTakenPerDay * daysBetween);
         var daysRemain = Math.round(remainingPills/pillsTakenPerDay);

         //calculate date you will run out of medication
         var endDay = now.clone().add(daysRemain, 'd');
         var endDate= endDay.format('YYYY-MM-DD');


         //get date values to prepare output
         var dateFill = moment(fillDate).format('YYYY-MM-DD');
         var dateStart= moment(startDate);
         var dateEnd= moment(endDate);

         
         //save the filling date, staring date, and ending date to session storage
         var starter = moment(startDate);
         var ender = moment(endDate);
         var filler = moment(fillDate);

         var endingString = ender.toString();
         var startingString = starter.toString();
         var fillingString = filler.toString();
         
         console.log(endingString);
         //store strings to session date
         sessionStorage.setItem("fillStore", fillingString);
         sessionStorage.setItem("startStore", startingString);
         sessionStorage.setItem("endStore", endingString);

         //format dates from YYYY-MM-DD format to Month name, day of month, year format

         var outFillDate= moment(dateFill).format("LL");
         var outEndDate = moment(dateEnd).format("LL");
         var outStartDate = moment(dateStart).format("LL");

  
         //create text strings for output information
         var outDrugInfo= "Drug Name: " + dName + " Strength: " + dStrength ; 
         var outInstructions= "Prescription Instructions: Take " + numTaken + " pill(s) " + perDay + " time(s) per day. \n" + "For a total of " + pillsTakenPerDay + " pill(s) taken daily.";
         var outDates = "Your prescription was filled on " + outFillDate + " and was started on " + outStartDate+".";
         var outCount = "You currently have " + remainingPills + " pills remaining out of the " + maxedFill + " pills that was filled for your prescription.";
         var outDays= "Therefore, you have approximately " + daysRemain + " days worth of medication remaining before you run out of medication on " + outEndDate +".";
         var rxcuiURL="https://mor.nlm.nih.gov/RxNav/search?searchBy=RXCUI&searchTerm="+pCode;
         
        
         //display outputs
         document.getElementById('output').hidden = false;
         document.getElementById("outDrug").innerHTML = outDrugInfo;
         document.getElementById("outInfo").innerHTML = outInstructions;
         document.getElementById("outDate").innerHTML = outDates;
         document.getElementById("outCounter").innerHTML = outCount;
         document.getElementById("outRemain").innerHTML = outDays;


         //set rxcui code for the more info url link of the selected pill
         document.querySelector("#the-link").setAttribute('href', rxcuiURL);

         
       }
       

//used for date input validation
var mN = moment().startOf('day');

//validate form data
function formChecker() {

    //run validation checks for each input field and set flags 
    var goodName = validDrugName(); //flag for name of drug
    var goodStrength = validDrugStrength(); //flag for med strength 
    var goodFilled = validFillCount(); //flag for filled amount 
    var goodTakenPer = validTakenPer(); //flag for pills taken per 
    var goodTimesPer = validPerDay(); //flag for pills taken per day
    var goodFillDate = validFillDate(); //flag for fill date
    var goodStart = validStartDate(); //flag for start date
    var goodCode = validCode(); //flag for rxcui code
    var goodDates = validDateDuration(); //flag for date duration
    var goodNumFilled= validFillNumber(); //flag to check that fill count is greater then zero
    var goodNumberTimes = validNumTimes(); //flag to check if number inputted for times taken per day is greater then zero
    var goodNumTaken = validNumTaken(); //flag to check if number entered for amount taken per is greater then zero
    

    if (goodName === true && goodStrength === true && goodFilled === true && goodTakenPer === true && goodTimesPer === true && goodFillDate === true && goodStart === true && goodCode === true && goodDates === true && goodNumFilled === true && goodNumberTimes === true && goodNumTaken === true) {
        document.getElementById("submitButton").disabled=false;
        document.getElementById("submitButton").hidden=false;
        alert("Form Successfully Validated. \n" + "Submit button can now be used, please click on it to get your results.");

    } 
    else {
        alert("Form is invalid, fix any errors in your input to proceed");
    }

}
//validate drug name input
function validDrugName() {
    var nameDrug = document.getElementById("rxterms").value;
    if (nameDrug.length == 0) {
        //name is empty
        document.getElementById("nameError").innerText ="Drug name field is empty";
        goodName = false;
    } else {
        goodName = true;
    }
    return goodName;
}

//validate drug strength input
function validDrugStrength() {
    var medStrength = document.getElementById("drug_strengths").value;
    if (medStrength.length == 0) {
        //med strength is empty
        document.getElementById("strengthError").innerText ="Field for medication strength is empty";
        goodStrength = false;
    } else {
        goodStrength = true;
    }
    return goodStrength;
}

//validate drug code
function validCode() {
    var pillCode = document.getElementById("rxcui").value;
    //check to see if code is empty
    if (pillCode.length == 0) {
        document.getElementById("nameError").innerText ="Please select a valid drug name from the list";
        document.getElementById("strengthError").innerText ="Please select a valid drug strength from the list";
        goodCode = false;
    } else {
        goodCode = true;
    }
    return goodCode
}
//validate fill count
function validFillCount() {
    var pillsFilled = document.getElementById("amountFilled").value;

    if (pillsFilled.length == 0) {
        //field is empty
        document.getElementById("maxError").innerText ="Quantity filled field is empty";
        goodFilled = false;

    } else {
        goodFilled = true;
       
    }
    return goodFilled;
}

//validate taken per 
function validTakenPer() {
    var perCount = document.getElementById("takenAmount").value;
    if (perCount.length == 0) {
        //field is empty
        document.getElementById("takenError").innerText ="Per count field is empty";
        goodTakenPer = false;
    } 
    else
    {
        goodTakenPer = true;
    }
    return goodTakenPer;
}

//validate times per day
function validPerDay() {
    var eachDay = document.getElementById("timesPerDay").value;
    if (isNaN(eachDay)) {
        //field is empty
        document.getElementById("perError").innerText ="Per day field is empty";
        goodTimesPer = false;
    } 
    else {
        goodTimesPer = true;
    }
    return goodTimesPer;
}
//validate fill date
function validFillDate() {
    var fillingDay = document.getElementById("dateFilled").value;
    var fD = moment(fillingDay, 'YYYY-MM-DD');

    //check if imputed fill date is in the valid format of YYYY-MM-DD
    if (fD === null || !fD.isValid()) {
        document.getElementById("fillError").innerText ="Please input a fill date";
        goodFillDate = false;
    } else {
        goodFillDate = true;
    }
    return goodFillDate;
}
//validate start date
function validStartDate() {

    var startingDay = document.getElementById("dateStart").value;
    var sD = moment(startingDay, "YYYY-MM-DD");
    //check if imputed fill date is in the valid format of YYYY-MM-DD
    if (sD === null || !sD.isValid()) {
        document.getElementById("startError").innerText = "Please input a start date";
        goodStart = false;
    } else {
        goodFillDate = true;
    }
    return goodFillDate;
}

//validate that start date is equal to or after fill date
function validDateDuration(goodDates) {
    var fillingDate = document.getElementById("dateFilled").value;
    var fDate = moment(fillingDate, 'YYYY-MM-DD');
    var startingDate = document.getElementById("dateStart").value;
    var sDate = moment(startingDate, 'YYYY-MM-DD');
    if (moment(sDate).isBefore(fDate, "days")) {
        //start date is before fill date
        document.getElementById("fillError").innerText = "Fill date cannot be after start date";
        document.getElementById("startError").innerText = "Start date cannot be before fill date";
         goodDates = false;
    } else {
         goodDates = true;
    }
    return goodDates;
}

//validate that number entered for amount of drugs filled is greater then zero
function validFillNumber(){

    var filledNumber = document.getElementById("amountFilled").value;
    if (filledNumber < 1){
        document.getElementById("maxError").innerText = "Please enter a number greater then zero";
        goodNumFilled = false;
    }
    else{
        goodNumFilled = true;
    }
    return goodNumFilled;

}

//validate that number entered for times per day is greater then zero
function validNumTimes(){
    var numPerDay = document.getElementById("timesPerDay").value;
    if(numPerDay < 1){
        document.getElementById("perError").innerText = "Please input a number greater then zero";
        goodNumberTimes = false;
    }
    else{
        goodNumberTimes = true;
    }
    return goodNumberTimes;
}

//validate that the number taken for amount taken per is greater then zero
function validNumTaken(){
    var takenNumber = document.getElementById("takenAmount").value;
    if(takenNumber < 1){
        document.getElementById("takenError").innerText = "Please input a number with a value greater then zero";
        goodNumTaken = false;
    }
    else{
        goodNumTaken = true;
    }
    return goodNumTaken;
}