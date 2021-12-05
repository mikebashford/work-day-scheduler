// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist
var avaialableTimeSlots = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];
var currentDate = document.querySelector('#currentDay');
var timeBlocks = document.querySelector('.container');
var startTime = 9;

var getCurrentTime = () =>
{
  return moment().format('HH');
}

var showCurrentDate = () =>
{
  var setDate = document.createElement('p');
  $(setDate).addClass("lead");
  setDate.innerHTML = moment().format('dddd, MMM Do');
  return currentDate.append(setDate);
}

var createTimeBlocks = () =>
{
  for(i = 0; i < avaialableTimeSlots.length; i++)
  {
    var blockDivider = document.createElement('div');
    var timeSection = document.createElement('div');
    var textSection = document.createElement('textarea');
    var saveButton = document.createElement('button');
    $(blockDivider).addClass('row time-block');
    blockDivider.setAttribute('id', parseInt([i]) + parseInt(startTime));
    $(timeSection).addClass('hour col-sm-1');
    $(textSection).addClass('description col-sm-10');
    $(saveButton).addClass('btn saveBtn col-sm-1');
    timeSection.innerHTML = avaialableTimeSlots[i];
    textSection.innerHTML = "";
    saveButton.innerHTML = "Save";
    blockDivider.append(timeSection, textSection, saveButton);
    timeBlocks.append(blockDivider);
  }
  return timeBlocks;
}

var compareTimes = () =>
{
  var currentTime = parseInt(getCurrentTime());

  $('.time-block').each(function()
  {
    var getBlockHour = parseInt($(this).attr('id'));

    if( getBlockHour > currentTime )
    {
  
      $(this).addClass('future');
      return;
    }
    else if( getBlockHour === currentTime )
    {
      $(this).addClass('present');
      return;
    }
    else
    {
      $(this).addClass('past');
      return;
    }
  })
}

var saveButton = document.querySelector('.saveBtn');

$(saveButton).on('click', function()
{
  var inputText = $(this).value();
  var currentTime = $(this).attr('id');

  localStorage.setItem(inputText, currentTime);
})

showCurrentDate();
createTimeBlocks();
compareTimes();

