var dates=[];
dates.push(new Date("2011/06/24"))
dates.push(new Date("2011/06/26"))
dates.push(new Date("2011/06/27"))
dates.push(new Date("2011/06/28"))
var maxDate = new Date(Math.max.apply(null,dates));
var minDate = new Date(Math.min.apply(null,dates));

console.log(maxDate);
console.log(minDate);