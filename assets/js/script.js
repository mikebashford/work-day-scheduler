//Array that holds the values for our time blocks
var avaialableTimeSlots = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];
//This value represents the time we start at
var startTime = 9;

//Grabs the current time in 24H format
var getCurrentTime = () =>
{
  return moment().format('HH');
}

//Grabs the current date to display in the header of the page
var showCurrentDate = () =>
{
  var setDate = document.createElement('p');
  $(setDate).addClass("lead");
  setDate.innerHTML = moment().format('dddd, MMM Do');
  return $('#currentDay').append(setDate);
}

//Dynamically creates all of the elements we need and gives the buttons listeners
var createTimeBlocks = () =>
{
  showCurrentDate();
  //Loop through the array to determine how many elements to create
  for(i = 0; i < avaialableTimeSlots.length; i++)
  {
    var blockDivider = document.createElement('div');
    var timeSection = document.createElement('div');
    var textSection = document.createElement('textarea');
    var saveButton = document.createElement('button');
    $(blockDivider).addClass('row time-block');
    //Give a unique id so we can grab this value later to check against the current time
    blockDivider.setAttribute('id', parseInt([i]) + parseInt(startTime));
    $(timeSection).addClass('hour col-sm-1');
    $(textSection).addClass('description col-sm-10');
    $(saveButton).addClass('btn saveBtn col-sm-1');
    timeSection.innerHTML = avaialableTimeSlots[i];
    textSection.innerHTML = "";
    saveButton.innerHTML = "Save";
    //append all the elements to this div element
    blockDivider.append(timeSection, textSection, saveButton);
    //append the div the parent div container
    $('.container').append(blockDivider);
  }
  //Adds the click function to each button and allows us to save to localStorage
  $('.btn').on('click', function()
  {
    var time = $(this).siblings('.hour').text();
    var text = $(this).siblings('.description').val();

    localStorage.setItem(time, text);
  });
}

//compares the current time to the time fields and determines which color to display in the text fields
var compareTimes = () =>
{
  //Grab current local time
  var currentTime = parseInt(getCurrentTime());

  //Iterate through every element with the time block class
  $('.time-block').each(function()
  {
    //Grab the block hour by it's id
    var getBlockHour = parseInt($(this).attr('id'));

    //Test the block hour vs our local time and set the text area to the proper color
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

//Loads our stored values back into the textarea when we reload the page to make it persistent
var loadSavedItems = () =>
{
  //Iterate through all elements with the hour class and grab the text from the current hour
  $('.hour').each(function()
  {
    var getCurrentHour = $(this).text();
    var getTextValue = localStorage.getItem(getCurrentHour);
    //If the hour is not blank, fill in the text
    if( getCurrentHour != null )
    {
      $(this).siblings('.description').val(getTextValue);
    }
  })
}

createTimeBlocks();
compareTimes();
loadSavedItems();


