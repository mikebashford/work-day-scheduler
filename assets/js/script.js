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
  $('.btn').on('click', function()
  {
    var time = $(this).siblings('.hour').text();
    var text = $(this).siblings('.description').val();

    localStorage.setItem(time, text);
  });
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
  });
}

var loadSavedItems = () =>
{
  $('.hour').each(function()
  {
    var getCurrentHour = $(this).text();
    var getTextValue = localStorage.getItem(getCurrentHour);
    console.log(getTextValue);
    if( getCurrentHour != null )
    {
      $(this).siblings('.description').val(getTextValue);
    }
  })
}

showCurrentDate();
createTimeBlocks();
compareTimes();
loadSavedItems();


