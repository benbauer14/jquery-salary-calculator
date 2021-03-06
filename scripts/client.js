$(document).ready(readyNow)

let employees = []

function readyNow(){ 

    $('#addEmployeeButton').on('click', addEmployee) // add employee when submit button is pressed
    $('#employeeTable').on('click', '.deleteEmployeeButton', deleteRow) //when table is clicked and the child is '.deleteEmployeeButton execute deleteRow
  } 

  function addEmployee (){
        //clear warning
        $('#warning').text("")
        //check for empty inputs if so flash the empty box at the user
        if($('#firstNameIn').val() === ""){
          $('#firstNameIn').fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150)
          $('#warning').text("Please enter a first name!")
          return null
        }
        if($('#lastNameIn').val() === ""){
          $('#lastNameIn').fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150)
          $('#warning').text("Please enter a last name!")
          return null
        }
        if($('#IDIn').val() === ""){
          $('#IDIn').fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150)
          $('#warning').text("Please enter an ID!")
          return null
        }
        if($('#titleIn').val() === ""){
          $('#titleIn').fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150)
          $('#warning').text("Please enter a title!")
          return null
        }
        if($('#salaryIn').val() === ""){
          $('#salaryIn').fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150)
          $('#warning').text("Please enter a salary!")
          return null
        }
        //check for empty inputs
        //flash input if empty
        //check if duplicate entry
        //combine all inputs into a single string
        let newEntry = $('#firstNameIn').val() + $('#lastNameIn').val() + $('#IDIn').val() + $('#titleIn').val() + $('#salaryIn').val()
        //loop through array and combine each index into a single string
        for( let i = 0; i < employees.length; i++){
          let combinedIndex = employees[i].firstName + employees[i].lastName + employees[i].ID + employees[i].title+ employees[i].salary
          if(combinedIndex === newEntry){
            //provide warning that employee exists
            $('#warning').text("Employee already exists!")
            //if input matches an existing Employee return ""
            return null;
          }
        }


    //add employee to Employees to array and create the delete button
    employees.push({
        firstName: $('#firstNameIn').val(),
        lastName: $('#lastNameIn').val(),
        ID: $('#IDIn').val(),
        title: $('#titleIn').val(),
        salary: Number($('#salaryIn').val()).toFixed(2)
    })
    $('#employeeTable').empty() //empty employee table
    $('#employeeTable').append(`<tr><th>First Name</th><th>Last Name</th><th>ID</th><th>Title</th><th>Annual Salary</th><th>Action</th></tr>`)
    for(let i = 0; i < employees.length; i++){
        $('#employeeTable').append(`<tr><td>${employees[i].firstName}</td><td>${employees[i].lastName}</td><td>${employees[i].ID}</td><td>${employees[i].title}</td><td>$${numberWithCommas(employees[i].salary)}</td><td><button class="deleteEmployeeButton">Delete</button></td></tr>`)
    }
    //add blank row
    $('#employeeTable').append(`<tr><td colspan="16" height="20px"></td></tr>`)
    $('#firstNameIn').val("")
    $('#lastNameIn').val("")
    $('#IDIn').val(""),
    $('#titleIn').val(""),
    $('#salaryIn').val("")
    monthlyCost()
  }

  function deleteRow(){
      //clear warning
      $('#warning').text("")
      for(let i = 0; i < employees.length; i++){
          //using a loop combine all text from object values into a single string with the word delete appended to the end
          let combinedText = employees[i].firstName + employees[i].lastName + employees[i].ID + employees[i].title+ employees[i].salary+"Delete"

          //compare the created string to the parent parent text 
          if(combinedText = $(this).parent().parent().text()){
            //if they match remove the index from the table
              employees.splice(i, 1)
            //remove row from table
            $(this).parent().parent().empty()
          }

          //run monthlyCost
          monthlyCost()
      }

  }

  function monthlyCost(){
      let total = 0
      for(let i = 0; i < employees.length; i++){
          total += Number(employees[i].salary)/12
      }
      $("#monthlyCost").text(numberWithCommas(total.toFixed(2)))
      if(total > 20000){
        $("#totalMonthly").css({"background-color" : "red"})
      }else{
        $("#totalMonthly").css({"background-color" : "white"})
      }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}