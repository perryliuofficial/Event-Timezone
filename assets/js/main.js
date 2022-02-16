// ################################################################################
// Bootstrap 5 Toast
// ################################################################################
document.getElementById("basicToastBtn").onclick = function() {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function(toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show())
  }

// ################################################################################
// Get URL Parameters
// ################################################################################
// https://example.com/index?unixTime=1646312400&name=Dusk%20Til%20Yawn&description=HelloWorld
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const unixTime = urlParams.get('unixTime');
const eventName = urlParams.get('name');
const eventDescription = urlParams.get('description');

// ################################################################################
// Update Name
// ################################################################################
const changeEventName = document.querySelector("#eventName");
changeEventName.innerHTML = `${eventName}`;

// ################################################################################
// Update Description
// ################################################################################
const changeEventDescription = document.querySelector("#eventDescription");
changeEventDescription.innerHTML = `${eventDescription}`;

// ################################################################################
// Update Time
// ################################################################################
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var d = new Date(unixTime * 1000),
    yyyy = d.getFullYear(),
    mm = monthNames[d.getMonth()],
    dd = ('0' + d.getDate()).slice(-2),
    ddd = dayNames[((Math.floor(unixTime/86400)+4)%7)],
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
const listItem = document.querySelector("#eventTime");
listItem.innerHTML = `${time}`;

// ################################################################################
// Create Own Event
// ################################################################################
function customTime() {
    var x = document.getElementById("customTime").value;
    x = new Date(x);
    x = x.getTime()/1000
    const changeEventName = document.querySelector("#customURL");
    changeEventName.innerHTML = `${x}`;
    console.log(x);
}

// ################################################################################
// Copy to Clipboard
// ################################################################################
function copy() {
    var copyText = document.getElementById("customURL");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(copyText.value);
}