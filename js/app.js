//Problem: Client needs a way to record employee information
//Solution: Create an application that recordes employees along with their salary

// Collects employee's information(firstName, lastName, employeeID, jobTitle, employeeYearlySalary)
// Calculate all of the employee's salaries and report back what the monthly cost is.


// Append everything on the screen. Check for non-numerical characters. Bro out

var counter = 0;

$(document).ready(function(){

  $('.employee-removal').on('click', function(){
    $(this).parent().remove();
  });

  $('#employeeInformation').on("submit", function(event){
    // Prevents default behavior of the browser
    event.preventDefault();

    var employees = {};


      //Do Nothing

      $.each($('#employeeInformation').serializeArray(), function(i, field){
        employees[field.name] = field.value;
      });

      // Not sure if it should be double or single qoutes
      $('#employeeInformation').find('input[type=text]').val('');

      if(employees.firstName == "" || employees.lastName == "" || employees.employeeID == "" || employees.jobTitle == "" || employees.currentSalary == 0){
        alert("Please Enter Applicable Values");
      } else {
        employeeArray.push(employees);
        console.log(employeeArray);

        totalSalaryCalculation(employeeArray[counter].currentSalary);
        appendDOM(employeeArray[counter]);
      }
  });


});

var employeeArray =[];

//Writing to the DOM
function appendDOM(object){

  console.log(object);

    $('.employee-nodes').append('<div class="employee-info"></div>');
    var $el = $('.employee-nodes').children().last();

      $el.append('<h2>' + object.firstName + ' ' + object.lastName + '</h2>');
      $el.append('<p>Employee ID: ' + object.employeeID + '</p>');
      $el.append('<p>Position: ' + object.jobTitle + '</p>');
      $el.append('<p>Current Salary: $' + object.currentSalary + '</p>');
      $el.append('<button class="employee-removal">Removify</button>');

      counter++;


}

//Input: Takes in employees' salary information
//Output: Returns monthly cost of salaries
function totalSalaryCalculation(number){
  console.log("Test: " + number);
  if(number == 0 || number == "" || number === undefined || number == NaN){
    // Do nothing
  } else {
    console.log("Success");
    var allEmployeeSalaries = 0;
    for(var i = 0; i < employeeArray.length; i++){
      var employee = employeeArray[i];

      //Need to check for non-numerical characters
      //What happens if you get a negative number?
      allEmployeeSalaries += parseInt(number);
    }
    allEmployeeSalaries = convertToMonthly(allEmployeeSalaries);
    $('.totalSalaryCost').text('Total Salary Cost Per Month: $' + allEmployeeSalaries);
    return allEmployeeSalaries;
  }

}

//Input: Takes in salary of employees
//Output: Returns the monthly cost to pay employees
function convertToMonthly(value){
  Math.round(value /= 12);
  console.log(value);
  return value;
}
