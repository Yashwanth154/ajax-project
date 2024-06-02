window.onload = function(){
    var userPlus = document.getElementById("addUser");
    var addModal = document.getElementById("modalAddUser");
    userPlus.addEventListener("click", () => {
        addModal.classList.add("show");
        addModal.style.display = "block";
    });
    window.addEventListener("click", (event)=> {
        if (event.target == addModal) {
          addModal.style.display = "none";
        }
    });
    fetchingData();
};
//this function is used to add user to the table
function addUser() {
    var myname = document.getElementById("inputName").value;
    var myage = document.getElementById("inputAge").value;
    var mystate = document.getElementById("inputState").value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://65f94a34df15145246110bf1.mockapi.io/data/userdata/", true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify({ name: myname, age: myage, state: mystate }));
    var addModal = document.getElementById("modalAddUser");
    addModal.style.display = "none";
    alert("User added successfully");
    fetchingData();
}
//this function is used to fetch data from the server i.e mockapi
function fetchingData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            displayUsers(data);
        }
    };
    xhttp.open("GET", "https://65f94a34df15145246110bf1.mockapi.io/data/userdata", true);
    xhttp.send();
}
//this function is used to display the data in the table
function displayUsers(users) {
    var tabledata = document.getElementById("table");
    // tabledata.innerHTML = "";
    users.forEach(function(user) {
        var row = table.insertRow();
        row.id = "user" + user.id;
        var c1 = row.insertCell(0);
        var c2 = row.insertCell(1);
        var c3 = row.insertCell(2);
        var c4 = row.insertCell(3);
        c1.textContent = user.name;
        c2.textContent = user.age;
        c3.textContent = user.state;
        c4.innerHTML = `<button class="edit" onclick="editUser(${user.id});" type="button"><i class="fa-solid fa-pen-clip"></i></button><button class="deleteB" onclick="deleteUser(${user.id});" type="button"><i class="fa-solid fa-trash-can"></i></button>`;
    });
}
//this function is used to edit the user data
function editUser(userId) {
    var uRow = document.getElementById("user" + userId);
    var myName = uRow.cells[0];
    var myAge = uRow.cells[1];
    var myState = uRow.cells[2];
    var currentState = myState.textContent; 
    myName.innerHTML = '<input type="text" value="' + myName.textContent + '">';
    myAge.innerHTML = '<input type="number" value="' + myAge.textContent + '">';
    myState.innerHTML = `<select>
                                <option>${currentState}</option>
                                <option>Andaman and Nicobar Islands</option>
                                <option>Andhra Pradesh</option>
                                <option>Arunachal Pradesh</option>
                                <option>Assam</option>
                                <option>Bihar</option>
                                <option>Chandigarh</option>
                                <option>Chhattisgarh</option>
                                <option>Dadra and Nagar Haveli and Daman & Diu</option>
                                <option>Delhi</option>
                                <option>Goa</option>
                                <option>Gujarat</option>
                                <option>Haryana</option>
                                <option>Himachal Pradesh</option>
                                <option>Jammu & Kashimr</option>
                                <option>Jharkand</option>
                                <option>Karnataka</option>
                                <option>Kerala</option>
                                <option>Ladakh</option>
                                <option>Lakshadweep</option>
                                <option>Madhya Pradesh</option>
                                <option>Maharashtra</option>
                                <option>Manipur</option>
                                <option>Meghalaya</option>
                                <option>Mizoram</option>
                                <option>Nagaland</option>
                                <option>Odisha</option>
                                <option>Puducherry</option>
                                <option>Punjab</option>
                                <option>Rajasthan</option>
                                <option>Sikkim</option>
                                <option>Tamil Nadu</option>
                                <option>Telanagana</option>
                                <option>Tripura</option>
                                <option>Uttar Pradesh</option>
                                <option>Uttarakhand</option>
                                <option>West Bengal</option>
                            </select>`;
    var editButton = uRow.querySelector(".edit");
    editButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    editButton.onclick = function() {
        var newName = myName.querySelector("input").value;
        var newAge = myAge.querySelector("input").value;
        var newState = myState.querySelector("select").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    myName.innerHTML = newName;
                    myAge.innerHTML = newAge;
                    myState.innerHTML = newState;
                    editButton.innerHTML = '<i class="fa-solid fa-pen-clip"></i>';
                    editButton.onclick = function() {
                        editUser(userId);
                    };
                //i have written the if else statment to tackle the unhandled error's
                } else {
                    console.error("Failed to update user on the server");
                }
            }
        };
        xhttp.open("PUT", "https://65f94a34df15145246110bf1.mockapi.io/data/userdata/" + userId, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.send(JSON.stringify({ name: newName, age: newAge, state: newState }));
    };
}
//this function is used to delete the user data
function deleteUser(userId) {
    var modal = document.getElementById("deleteModal");
    var userDeleted = document.getElementById("userDeleted");
    userDeleted.textContent = userId;
    modal.style.display = "block";
    var cancelDelete = document.querySelectorAll(".deleteCancel");
    cancelDelete.forEach(function(btn) {
        btn.addEventListener("click", function() {
            modal.style.display = "none";
        });
    });
    var confirmDelete = document.querySelector(".confirmDelete");
    confirmDelete.addEventListener("click", function() {
        modal.style.display = "none";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    //i have written the if else statment to tackle the unhandled error's
                    var rowToRemove = document.getElementById("user" + userId);
                    if (rowToRemove) {
                        rowToRemove.remove();
                    } else {
                        console.error("User row not found for deletion");
                    }
                } else {
                    console.error("Failed to delete user from the server");
                }
            }
        };
        xhttp.open("DELETE", "https://65f94a34df15145246110bf1.mockapi.io/data/userdata/" + userId, true);
        xhttp.send();
        alert("User deleted successfully");
    });
}
