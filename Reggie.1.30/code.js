function currentTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    var format = hours + ":" + minutes;
    if (hours > 11) {
        format = format + " PM";
    } else {
        format = format + " AM";
    }
    return format;
}