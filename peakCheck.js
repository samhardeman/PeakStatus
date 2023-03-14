const { DateTime } = require('luxon');

//Is weekday?
function isWeekday(now) {
  if(now.weekday < 6){
    return true;
  } else {
    return false;
  }
}

//Is summer?
function isSummer(now) {
  if(now.month > 4 && now.month < 9){
    return true;
  } else {
    return false;
  }
}

//Is peak (summer)?
function isPeakTimeSummer(now) {
  if(now.hour >= 15 && now.hour < 19) {
    return true;
  } else {
    return false;
  }
}

//Is peak (winter)?
function isPeakTimeWinter(now) {
  if((now.hour >= 6 && now.hour < 9) || (now.hour >= 18 && now.hour < 21)) {
    return true;
  } else {
    return false;
  }
}

function isPeak() {
  //Define Date to Know
  var now = DateTime.local().setZone('America/Phoenix');

  if (!isWeekday(now)) {
    return 'Off Peak';
  } else {
    if (isSummer(now)) {
      if (isPeakTimeSummer(now)) {
        return 'On Peak';
      } else {
        return 'Off Peak';
      }
    } else {
      if (isPeakTimeWinter(now)) {
        return 'On Peak';
      } else {
        return 'Off Peak';
      }
    }
  }
}

exports.peakStatus = function () {
  return isPeak();
}; 