// Call this from the developer console and you can control both instances
var calendars = {};
var theCalendarInstance = $('#myCalendar').clndr();



$("#validateButton").click(function() {

    //get global values and clone as moment
    var inFill = moment(dateFill);
    var inStart = moment(start);
    var inEnd = moment(endDate);

    //get month,date, and year of each event
    var fillMonth = inFill.format("MM");
    var fillDay = inFill.format("DD");
    var fillYear = inFill.format("YYYY");
    var startMonth = inStart.format("MM");
    var startDay = inStart.format("DD");
    var startYear = inStart.format("YYYY");
    var endMonth = inEnd.format("MM");
    var endDay = inEnd.format("DD");
    var endYear = inEnd.format("YYYY");

    //create string variable for CLNDR to use
    var calFill = " ";
    var calStart = " ";
    var calEnd = " ";

    //format event string for CLNDR use
     fullFill = (fillYear+"-"+fillMonth+"-"+fillDay);
     fullStart = (startYear+"-"+startMonth+"-"+startDay);
     fullEnd = (endYear+"-"+endMonth+"-"+endDay);

     //create string for event
     var calFill = String(fullFill);
     var calStart= String(fulStart);
     var calEnd = String(fullEnd);


    // Set up the events array
    var eventsArray = [
        {
            title: 'Prescription Filled',
            date: calFill
        }, {
            title: 'Prescription Started',
            date: String(calStart).
        }, {
            title: 'Prescription End',
            date: String(calEnd)
        }
    ];



});
    


$("#test-Input").submit(function(e){
    e.preventDefault();
  });