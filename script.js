ask();
function ask() {
    var age = prompt("Сколько вам лет?");
    if (!confirm("Вы уверены, что вам " + age + "?")) {
      ask();
    }
 }
document.getElementById("name").style = "text-decoration:line-through";


var lastNameP = document.getElementById('lastname');
var changeButton = document.getElementById('change');

changeButton.addEventListener('click', function() {
    var newName = document.getElementById('newLastname').value;
    lastNameP.textContent = newName;
});

const bgButton = document.getElementById('random');

const colors = ["white", "lightgreen", "pink", "orange", "gold", "violet"];

bgButton.onclick = function() {
    var randomIndex = Math.floor(Math.random() * colors.length);
    document.body.style.backgroundColor = colors[randomIndex];
};