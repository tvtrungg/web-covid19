function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }

    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    var dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
    return dateTime;
}
setInterval(function () {
    currentTime = getDateTime();
    document.getElementById("content-date").innerHTML = currentTime;
}, 1000);


// Get the HTML canvas by its id 
myChart1_bar = document.getElementById("myChart1_bar");
var months = ["F0", "F1", "F2", "F3", "F4"]; //Stays on the X-axis 
array = $('#data').val().split(',');
new Chart(myChart1_bar, {
    type: 'bar', //Declare the chart type 
    data: {
        labels: months, //X-axis data 
        datasets: [{
            label: "tình trạng",
            data: array, //Y-axis data 
            backgroundColor: '#c0d2ff', //Color of the dots 
            borderColor: 'white', //Line color 
            fill: false, //Fills the curve under the line with the babckground color. It's true by default 
        }]
    },
    options: {
        responsive: true,
    }
});


myChart1_pie = document.getElementById("myChart1_pie");
var months = ["F0", "F1", "F2", "F3", "F4"]; //Stays on the X-axis 
array = $('#data').val().split(',');
new Chart(myChart1_pie, {
    type: 'pie', //Declare the chart type 
    data: {
        labels: months, //X-axis data 
        datasets: [{
            label: "tình trạng",
            data: array, //Y-axis data 
            backgroundColor: '#ffd7d7', //Color of the dots 
            borderColor: 'white', //Line color 
            fill: false, //Fills the curve under the line with the babckground color. It's true by default 
        }]
    },
    //Specify custom options: 
    
        options: {
            responsive: true,
        }
});


myChart2_bar = document.getElementById("myChart2_bar");
var label = ["F0", "F1", "F2", "F3", "F4"]; //Stays on the X-axis 
array1 = $('#data1').val().split(',');
new Chart(myChart2_bar, {
    type: 'bar', //Declare the chart type 
    data: {
        labels: label, //X-axis data 
        datasets: [{
            label: "tình trạng",
            data: array1, //Y-axis data 
            backgroundColor: '#c0d2ff', //Color of the dots 
            borderColor: 'white', //Line color 
            fill: false, //Fills the curve under the line with the babckground color. It's true by default 
        }]
    },
    options: {
        responsive: true,
    }
});


myChart2_pie = document.getElementById("myChart2_pie");
var label = ["F0", "F1", "F2", "F3", "F4"]; //Stays on the X-axis 
array1 = $('#data1').val().split(',');
new Chart(myChart2_pie, {
    type: 'pie', //Declare the chart type 
    data: {
        labels: label, //X-axis data 
        datasets: [{
            label: "tình trạng",
            data: array1, //Y-axis data 
            backgroundColor: '#ffd7d7', //Color of the dots 
            borderColor: 'white', //Line color 
            fill: false, //Fills the curve under the line with the babckground color. It's true by default 
        }]
    },
    //Specify custom options: 
    
        options: {
            responsive: true,
        }
});



myChart3_bar = document.getElementById("myChart3_bar");
var label = ["F0", "F1", "F2", "F3", "F4"]; //Stays on the X-axis 
array2 = $('#data2').val().split(',');
new Chart(myChart3_bar, {
    type: 'bar', //Declare the chart type 
    data: {
        labels: label, //X-axis data 
        datasets: [{
            label: "tình trạng",
            data: array2, //Y-axis data 
            backgroundColor: '#c0d2ff', //Color of the dots 
            borderColor: 'white', //Line color 
            fill: false, //Fills the curve under the line with the babckground color. It's true by default 
        }]
    },
    options: {
        responsive: true,
    }
});

myChart3_pie = document.getElementById("myChart3_pie");
var label = ["F0", "F1", "F2", "F3", "F4"]; //Stays on the X-axis 
array2 = $('#data2').val().split(',');
new Chart(myChart3_pie, {
    type: 'pie', //Declare the chart type 
    data: {
        labels: label, //X-axis data 
        datasets: [{
            label: "tình trạng",
            data: array2, //Y-axis data 
            backgroundColor: '#ffd7d7', //Color of the dots 
            borderColor: 'white', //Line color 
            fill: false, //Fills the curve under the line with the babckground color. It's true by default 
        }]
    },
    //Specify custom options: 
    
        options: {
            responsive: true,
        }
});


