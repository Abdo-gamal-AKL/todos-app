const input = document.querySelector("input");

window.addEventListener("load", () => {
    input.focus();
});

let form = document.querySelector("form");
let ulElement = document.querySelector("ul");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    createLi(input);
    updateLS();
});

let lisArr = [];

function createLi(input) {
    let li = document.createElement("li");

    value = input.value;

    let text = document.createTextNode(value);

    li.appendChild(text);

    lisArr.push(li);

    updateLS();

    li.addEventListener("click", () => {
        li.classList.toggle("line");

        updateLS();
    });

    li.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        li.remove();

        updateLS();
    });

    if (input.value === "" || input.valu === " ") {
        return;
    } else {
        lisArr.forEach((li) => {
            ulElement.appendChild(li);

            input.value = "";
        });
    }
}

function updateLS() {
    let lis = document.querySelectorAll("li");

    let todos = [];

    lis.forEach((li) => {
        todos.push({
            text: li.innerHTML,
            class: li.classList.contains("line"),
        });
    });
    localStorage.setItem("todo", JSON.stringify(todos));
}

getFromLS();

function ss() {
    let LSElements = JSON.parse(localStorage.getItem("todo"));

    return LSElements ? LSElements : [];
}

function getFromLS() {
    let LSElements = ss();

    LSElements.forEach((ele) => {
        // console.log(ele);
        let li = document.createElement("li");

        let text = document.createTextNode(ele.text);

        li.appendChild(text);

        ulElement.appendChild(li);

        updateLS();
        li.addEventListener("click", () => {
            li.classList.toggle("line");
            updateLS();
        });

        li.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            li.remove();
            updateLS();
        });
        if (ele.class) {
            li.classList.add("line");
        }
    });
}
