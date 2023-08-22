var inputs = document.querySelectorAll("input");
var deleteBtn = []

var webSites = [];



if (localStorage.getItem("AllWeb") != null) {
    webSites = JSON.parse(localStorage.getItem("AllWeb"))

    display();

}

document.querySelector("#subBtn").addEventListener("click", function () {
    if (validtion() == true && validtionUrl() == true) {
        var webSite = {
            Name: inputs[0].value,
            Url: inputs[1].value
        }
        webSites.push(webSite);

        console.log(webSites)

        localStorage.setItem("AllWeb", JSON.stringify(webSites))
        document.querySelector('.alert1').classList.add('d-none')
        document.querySelector('.alert2').classList.add('d-none')



        display()
        clear()

    }
    else if (validtion() == true && validtionUrl() == false) {
        document.querySelector('.alert2').classList.remove('d-none')
        document.querySelector('.alert1').classList.add('d-none')

    }
    else if (validtion() == false && validtionUrl() == true) {
        document.querySelector('.alert1').classList.remove('d-none')
        document.querySelector('.alert2').classList.add('d-none')

    }
    else {
        document.querySelector('.alert1').classList.remove('d-none')
        document.querySelector('.alert2').classList.remove('d-none')

    }



});

function clear() {
    inputs[0].value = "";
    inputs[1].value = "";
}

function display() {
    var webSiteDisplay = "";
    for (var i = 0; i < webSites.length; i++) {

        webSiteDisplay += `<div  class=" p-4 d-flex justify-content-between bg-secondary bg-gradient m-4 bg-opacity-25" >
        <h3> ${webSites[i].Name} </h3>
        <div >
            <a class=" px-3 btn btn-primary text-decoration-none text-white" href="${webSites[i].Url}" target="_blank" >Visit</a>
            <button indx="${i}"  class="mx-5 btndelete btn btn-danger">Delete</button>
        </div>
    </div>`
    }
    document.querySelector("#Sec").innerHTML = webSiteDisplay;
    deleteBtn = Array.from(document.querySelectorAll(".btndelete"));
    localStorage.setItem("AllWeb", JSON.stringify(webSites))

    for (var i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", function (e) {
            var indx = e.target.getAttribute("indx")
            deleteBook(indx)
        })
    }
}
function deleteBook(index) {

    webSites.splice(index, 1)
    display()

}

function validtion() {
    var regex = /^\w+$/
    return regex.test(inputs[0].value)
}
function validtionUrl() {
    var regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    return regex.test(inputs[1].value)
}