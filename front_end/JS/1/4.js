var date = new Date();
var oneDay = 24*60*60*1000;
var secondDate = new Date(new Date().getFullYear(),11,31);

console.log(Math.round(Math.abs((date.getTime() - secondDate.getTime())/oneDay)));