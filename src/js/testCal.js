// Call this from the developer console and you can control both instances
var calendars = {};




$("#validateButton").click(function() {

    //get global values and clone as moment
    var inFill = moment(dateFill);
    var inStart = moment(start);
    var inEnd = moment(endDate);

    //set up date values
    var calFill=  inFill.format('YYYY-MM-DD');
    var calStart= inStart.format('YYYY-MM-DD'); 
    var calEnd= inEnd.format('YYYY-MM-DD');

    // Set up the events array
    var eventsArray = [
        {
            title: 'Prescription Filled',
            date: String(calFill)
        }, {
            title: 'Prescription Started',
            date: String(calStart)
        }, {
            title: 'Prescription End',
            date: String(calEnd)
        }
    ];

    calendars.clndr1 = $('.cal1').clndr({
        events: eventsArray,
        showAdjacentMonths: true,
        adjacentDaysChangeMonth: false
    });

});
    


$("#test-Input").submit(function(e){
    e.preventDefault();
  });