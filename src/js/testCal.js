
var calendars = {};

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

    //set these variables to string
    var fYear = String(fillYear);
    var fMonth = String(fillMonth);
    var fDay = String(fillDay);
    var sYear = String(startYear);
    var sMonth = String(startMonth);
    var sDay = String(startDay);
    var eYear = String(endYear);
    var eMonth = String(endMonth);
    var eDay = String(endDay);

    //format event string for CLNDR use
     var fullFill = (fYear+"-"+fMonth+"-"+fDay);
     var fullStart = (sYear+"-"+sMonth+"-"+sDay);
     var fullEnd = (eYear+"-"+eMonth+"-"+eDay);

     //create string for event
     var calFill = String(fullFill);
     var calStart= String(fullStart);
     var calEnd = String(fullEnd);


    // Set up the events array
    var eventArray = [
        {
            title: 'Prescription Filled',
            date: calFill,
        }, {
            title: 'Prescription Started',
            date: calStart,
        }, {
            title: 'Prescription End',
            date: calEnd,
        }
    ];

    calendars.clndr1 = $('.cal1').clndr({
        events: eventArray,
        clickEvents: {
            click: function (target) {
                console.log('Cal-1 clicked: ', target);
            },
            today: function () {
                console.log('Cal-1 today');
            },
            nextMonth: function () {
                console.log('Cal-1 next month');
            },
            previousMonth: function () {
                console.log('Cal-1 previous month');
            },
            onMonthChange: function () {
                console.log('Cal-1 month changed');
            },
            nextYear: function () {
                console.log('Cal-1 next year');
            },
            previousYear: function () {
                console.log('Cal-1 previous year');
            },
            onYearChange: function () {
                console.log('Cal-1 year changed');
            },
            nextInterval: function () {
                console.log('Cal-1 next interval');
            },
            previousInterval: function () {
                console.log('Cal-1 previous interval');
            },
            onIntervalChange: function () {
                console.log('Cal-1 interval changed');
            }
        },
        showAdjacentMonths: true,
        adjacentDaysChangeMonth: false
    });

});
    


$("#test-Input").submit(function(e){
    e.preventDefault();
  });