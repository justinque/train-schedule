var firebaseConfig = {
    apiKey: "AIzaSyA4RV2pjce75yRYCP_Wmkp1prCWndD5V2k",
    authDomain: "train-1c9d8.firebaseapp.com",
    databaseURL: "https://train-1c9d8.firebaseio.com",
    projectId: "train-1c9d8",
    storageBucket: "",
    messagingSenderId: "742517743533",
    appId: "1:742517743533:web:9538747b069e2a95"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // Initial Values
  var name = "";
  var destination = "";
  var frequency = 0;
  var firstTime = "";
  var nextTrainArrival = "";
  var minutesAway = "";
  
  // Capture Button Click
  $("#submit-btn").on("click", function (event) {
  
    event.preventDefault();
  
  
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    firstTime = $("#firstTime-input").val().trim();
    var nextTrain = myFunction(firstTime, frequency);
    nextTrainArrival = nextTrain;
    minutesAway = minutesAway;
  
    console.log(name);
    console.log(destination);
    console.log(frequency);
    console.log(firstTime);
  
  
  
  
  
    // Code for the push
    database.ref().push({
      name: name,
      destination: destination,
      frequency: frequency,
      firstTime: firstTime,
      nextTrainArrival: nextTrain,
      minutesAway: minutesAway,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
  
  
    });
  
  
  
    // clear inputs
    $('input').val("");
  
  
  });
  
  
  //----
  
  function myFunction(tt, fr){
      
    var firstTimeConverted = moment(tt, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
  
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
  
    // Time apart (remainder)
    var tRemainder = diffTime % fr;
    console.log(tRemainder);
  
    // Minute Until Train
    var tMinutesTillTrain = fr - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    minutesAway = tMinutesTillTrain;
  
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    return (moment(nextTrain).format("hh:mm"));
  
  }
  myFunction();
  
  
  // function when the child is added
  database.ref().on("child_added", function (childSnap) {
  
  
    console.log(childSnap.val().name);
    console.log(childSnap.val().destination);
    console.log(childSnap.val().frequency);
    console.log(childSnap.val().firstTime);
    console.log(childSnap.val().minutesAway);
    console.log(childSnap.val().nextTrainArrival);
  
  
  
  
    // variables for the database snapshots
    firebaseName = childSnap.val().name;
    firebaseDestination = childSnap.val().destination;
    firebaseFrequency = childSnap.val().frequency;
    firebaseFirstTime = childSnap.val().firstTime;
    firebaseMinutesAway = childSnap.val().minutesAway;
    firebaseNextTrain = childSnap.val().nextTrainArrival;
  
  
    var tr = $("<tr>");
  
    var tdName = $("<td>").text(firebaseName);
    var tdDestination = $("<td>").text(firebaseDestination);
    var tdFrequency = $("<td>").text(firebaseFrequency);
    var tdMinAway = $("<td>").text(firebaseMinutesAway);
    var tdNextTrain = $("<td>").text(firebaseNextTrain);
  
  
    // var tdFirstTime = $("<td>").text(firebaseFirstTime);
    // dont need a td for the first time
  
    // just gonna append them to the divs I have
  
    tr.append(tdName).append(tdDestination).append(tdFrequency).append(tdNextTrain).append(tdMinAway);
  
    $(".trains-tbody").append(tr);
  
  
  
  });