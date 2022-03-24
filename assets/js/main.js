// ################################################################################
// Get URL Parameters
// ################################################################################
// https://example.com/index?unixTime=1646312400&name=Dusk%20Til%20Yawn&description=HelloWorld&timezoneOriginal=Europe%2FLondon&timeOriginal=Thursday%2001%20Jan%202020%201%3A00%20AM

//all url parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//get event name from url parameter
var eventName = urlParams.get('name');
if (eventName == null){eventName = "Event Name"};

//get event description from url parameter
var eventDescription = urlParams.get('description');
if (eventDescription == null){eventDescription = "Event Description"};

//get event timezone from url parameter
var timezoneOriginal = urlParams.get('timezoneOriginal');
if (timezoneOriginal == null){timezoneOriginal = "Europe/London"};

//get local system timezone
var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

//get unix time from url parameter
const unixTime = urlParams.get('unixTime');

//get event time (human readable format) from url parameter
var timeOriginal = urlParams.get('timeOriginal');
if (timeOriginal== null){timeOriginal = "Thursday 01 Jan 1970 1:00 AM"};

// ################################################################################
// Populate Info
// ################################################################################
document.querySelector("#eventName").innerHTML = `${eventName}`;
document.querySelector("#eventDescription").innerHTML = `${eventDescription}`;
document.querySelector("#timezone").innerHTML = `Local: ${timezone}`;
document.querySelector("#timezoneOriginal").innerHTML = `Event: ${timezoneOriginal}`;    
document.querySelector("#eventTimeOriginal").innerHTML = `${timeOriginal}`;

// ################################################################################
// Convert Unix Time into human readable format
// ################################################################################
function displayTime(inputTime){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var d = new Date(inputTime * 1000),
        yyyy = d.getFullYear(),
        mm = monthNames[d.getMonth()],
        dd = ('0' + d.getDate()).slice(-2),
        ddd = dayNames[((Math.floor(inputTime/86400)+4)%7)],
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),
        ampm = 'AM',
        time;
    
        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }
    
    time = `${ddd} ${dd} ${mm} ${yyyy} ${h}:${min} ${ampm}`;
    return time;
}

time = displayTime(unixTime);
document.querySelector("#eventTime").innerHTML = `${time}`;

// ################################################################################
// Create Own Event
// ################################################################################
function customTime() {
    var customTimeNew = document.querySelector("#customTime").value;
    customName = encodeURIComponent(document.querySelector("#customName").value);
    customDescription = encodeURIComponent(document.querySelector("#customDescription").value);
    customUnixTime = encodeURIComponent(new Date(customTimeNew).getTime()/1000);
    customTimeNew = encodeURIComponent(displayTime(new Date(customTimeNew).getTime()/1000));
    document.getElementById("customURL").value = `https://eventtime.drunkrobot.co.uk/?unixTime=${customUnixTime}&name=${customName}&description=${customDescription}&timezoneOriginal=${timezone}&timeOriginal=${customTimeNew}`;
}

// ################################################################################
// Copy to Clipboard
// ################################################################################
function copy() {
    var copyText = document.querySelector("#customURL");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function(toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show())
}
