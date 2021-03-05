$(document).ready(readyNow)

let employees = []

function readyNow(){ 

    $('#addEmployeeButton').on('click', addEmployee) // add employee when submit button is pressed
    $('#employeeTable').on('click', '.deleteEmployeeButton', deleteRow) //when table is clicked and the child is '.deleteEmployeeButton execute deleteRow
  } 

  function addEmployee (){
    //add employee to Employees to array with delete button
    employees.push({
        firstName: $('#firstNameIn').val(),
        lastName: $('#lastNameIn').val(),
        ID: $('#IDIn').val(),
        title: $('#titleIn').val(),
        salary: $('#salaryIn').val()
    })
    $('#employeeTable').empty() //empty employee table
    $('#employeeTable').append(`<tr><td>First Name</td><td>Last Name</td><td>ID</td><td>Title</td><td>Annual Salary</td><td>Action</td></tr>`)
    for(let i = 0; i < employees.length; i++){
        $('#employeeTable').append(`<tr><td>${employees[i].firstName}</td><td>${employees[i].lastName}</td><td>${employees[i].ID}</td><td>${employees[i].title}</td><td>${employees[i].salary}</td><td><button class="deleteEmployeeButton">Delete</button></td></tr>`)
    }
    $('#firstNameIn').val("")
    $('#lastNameIn').val("")
    $('#IDIn').val(""),
    $('#titleIn').val(""),
    $('#salaryIn').val("")
    monthlyCost()
  }

  function deleteRow(){
      $(this).parent().parent().empty()
  }

  function monthlyCost(){
      let total = 0
      for(let i = 0; i < employees.length; i++){
          total += Number(employees[i].salary)
      }
      $("#monthlyCost").text(total)
      if(total > 20000){
        $("#totalMonthly").css({"background-color" : "red"})
      }else{
        $("#totalMonthly").css({"background-color" : "white"})
      }
  }