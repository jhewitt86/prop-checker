'use strict';

exports.check = function(req, res) {

  // Extract the request, prepare a response container, and reserve an error variable
  var request = req.body.payload,
      response = {
        response: []
      },
      addressFields = ['unitNumber','buildingNumber','street','suburb','state','postcode'],
      error = false;

  // Check the request is present
  if(request){
    // Filter request to workflow = completed
    var result = request.filter(function(item){
      return item.workflow == "completed";
    });

    // Loop through items in the request payload
    for(var item of result){
      // Set up the item to be returned
      var returnItem = {
            type: item.type,
            workflow: item.workflow,
            address: ''
          };

      for(var i = 0; i < addressFields.length; i++){
        if(item.address[addressFields[i]]){
          returnItem.address = returnItem.address + " " + item.address[addressFields[i]];
        }
      }
      // Push the item into the response array
      response.response.push(returnItem);
    }
    // If there are no items to return, send back an error object
    if(response.response.length<1){
      response = {"error": "There were no matches"};
    }
  }else{
    // If an error was encountered, set the error var to true
    error = true;
  }

  if(error){
    // Request payload missing, return an error object
    res.statusMessage = "There was a problem processing the request. Please check formatting.";
    res.status(400).end();
  }else{
    // The response checks out, send it
    res.json(response);
  }
};

exports.deny_request = function(req, res) {
  res.json({"error":"Please use type POST and include payload."});
};
