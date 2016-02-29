//Problem: Client needs a way to record employee information
//Solution: Create an application that recordes employees along with their salary

// Collects employee's information(firstName, lastName, employeeID, jobTitle, employeeYearlySalary)
// Calculate all of the employee's salaries and report back what the monthly cost is.


// Append everything on the screen. Check for non-numerical characters. Bro out

var counter = 0;

$(document).ready(function(){
  $('#employeeInformation').on("submit", function(event){
    // Prevents default behavior of the browser
    event.preventDefault();
    var employees = {};
      $.each($('#employeeInformation').serializeArray(), function(i, field){
        employees[field.name] = field.value;
      });

      employees.currentSalary = removeNonNumeric(employees.currentSalary);
      // Not sure if it should be double or single qoutes
      $('#employeeInformation').find('input[type=text]').val('');

      //Checks to see if fields are empty
      if(employees.firstName == "" || employees.lastName == "" || employees.employeeID == "" || employees.jobTitle == "" || employees.currentSalary == 0){
        alert("Please Enter Applicable Values");
      } else {
        employeeArray.push(employees);

        totalSalaryCalculation(employeeArray[counter].currentSalary);
        appendDOM(employeeArray[counter]);
      }
  });

  // Removes employee node and information
  $('.employee-nodes').on('click', '.employee-removal', removify);

});

var employeeArray =[];

//Input: Takes in object created by user
//Output: Writes items to the DOM
function appendDOM(object){

    $('.employee-nodes').append('<div class="employee-info"></div>');
    var $el = $('.employee-nodes').children().last();

      $el.append('<h2>' + object.firstName + ' ' + object.lastName + '</h2>');
      $el.append('<p>Employee ID: ' + object.employeeID + '</p>');
      $el.append('<p>Position: ' + object.jobTitle + '</p>');
      $el.append('<p>Current Salary: $' + object.currentSalary + '</p>');
      $el.append('<button class="employee-removal" data-empID="' + object.employeeID + '">Removify</button>');
      counter++;

}

//Removes clicked item and parent from DOM
//Recalculates combined employee total costs
function removify(){

  //console.log(employeeArray);

  for(var j = 0; j < employeeArray.length; j++){
    if(employeeArray[j].employeeID == $(this).data('empid')){
        employeeArray.splice(j, 1);
        //console.log(employeeArray[j].employeeID);
    }
    //console.log(employeeArray);
    //console.log($(this).data('data'));
    totalSalaryCalculation();
  }
  $(this).parent().remove();
  counter--;
}

//Input: Takes in employees' salary information
//Output: Returns monthly cost of salaries
function totalSalaryCalculation(number){
  if(number == 0 || number == "" || number === undefined || number == NaN){
    // Do nothing
  } else {
    var allEmployeeSalaries = 0;
    for(var i = 0; i < employeeArray.length; i++){
      var employee = employeeArray[i];
      allEmployeeSalaries += parseInt(number);
    }
    allEmployeeSalaries = Math.round(convertToMonthly(allEmployeeSalaries));
    $('.totalSalaryCost').text('Total Salary Cost Per Month: $' + allEmployeeSalaries);
    return allEmployeeSalaries;
  }
}

//Input: Takes in salary of employees
//Output: Returns the monthly cost to pay employees
function convertToMonthly(value){
  Math.round(value /= 12);
  return value;
}

//Input: Takes in user entered salary
//Ouput: Removes non numerical characters and returns a string of numbers
function removeNonNumeric(str){
	var numericString = str.replace(/[^0-9]/g, '');
	return numericString;
}
