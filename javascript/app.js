// Initialize Firebase
var config = {
    apiKey: "AIzaSyADFEeOOQAzTROLhaaQmmFVG6aYenUtTo0",
    authDomain: "my-project-5bbd5.firebaseapp.com",
    databaseURL: "https://my-project-5bbd5.firebaseio.com",
    projectId: "my-project-5bbd5",
    storageBucket: "my-project-5bbd5.appspot.com",
    messagingSenderId: "684866593409"
  };
  firebase.initializeApp(config);



  var database = firebase.database();

  $("#input-submit").on("click", function(event) {
    event.preventDefault();
    
   // Grabs user input
   var name = $("#train-name").val().trim();
   var destination= $("#destination").val().trim();
   var time =$("#time").val().trim();
   var frequency = $("#frequency").val().trim();
 
   // Creates local "temporary" object for holding train data
   var data = {
     name: name,
     destination: destination,
     time: time,
     frequency: frequency,
   };
 
   // Uploads train data to the database
   database.ref().push(data);
 
   // Logs everything to console
   console.log(data.name);
   console.log(data.destination);
   console.log(data.time);
   console.log(data.frequency);
 
   // Alert
   alert("train successfully added");
 
   // Clears all of the text-boxes
   $("#train-name").val("");
   $("#destination").val("");
   $("#time").val("");
   $("#frequency").val("");

 });

 // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;
  
    // train Info
    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);
  
    // Prettify the train start
    var empStartPretty = moment.unix(time).format("00:00");
  
    // Calculate the time between the train arrival
    var trainTimes = moment().diff(moment(time, "X"), "time");
    console.log(trainTimes);
  
    // Calculate the train arrival time
    var arrivalTime = trainTimes * frequency;
    console.log(arrivalTime);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><tr>" + name + "</td><td>" + destination + "</td><td>" +
    empStartPretty + "</td><td>" + trainTimes + "</td><td>" + frequency + "</td><td>" + arrivalTime + "</td></tr>");
  });