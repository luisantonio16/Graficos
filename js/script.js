"user strict";

const agregar = document.getElementById("agregar");
const graficar = document.getElementById("graficar");
const tipo = document.getElementById("tipo");
let parametros = document.querySelector(".parametros");
let x = parametros.querySelectorAll(".row .col-5")[0];
let y = parametros.querySelectorAll(".row .col-5")[1];
let b = parametros.querySelector(".row .col-2");
let btnBorrar = b.querySelectorAll(".btn-danger");

const color = document.getElementById("color");
const width = document.getElementById("width");
const height = document.getElementById("height");
const titulo = document.getElementById("titulo");
const xLabel = document.getElementById("xLabel");
const yLabel = document.getElementById("yLabel");

agregar.addEventListener("click", e => {
    e.preventDefault();
    //agregar elemento correspondiente de x y y sin borrar el contenido de los inputs anteriores
    x.appendChild(document.createElement("input"));
    x.lastElementChild.setAttribute("type", "text");
    x.lastElementChild.setAttribute("placeholder", "Ingrese parámetro de X");

    y.appendChild(document.createElement("input"));
    y.lastElementChild.setAttribute("type", "text");
    y.lastElementChild.setAttribute("placeholder", "Ingrese valor de Y");

    b.appendChild(document.createElement("button"));
    b.lastElementChild.setAttribute("type", "button");
    b.lastElementChild.setAttribute("class", "btn btn-danger");
    b.lastElementChild.innerHTML = "X";

    refresh();
});

const refresh = () => {
    parametros = document.querySelector(".parametros");
    x = parametros.querySelectorAll(".row .col-5")[0];
    y = parametros.querySelectorAll(".row .col-5")[1];
    b = parametros.querySelector(".row .col-2");
    btnBorrar = b.querySelectorAll(".btn-danger");

    btnBorrar.forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            if(confirm("¿Estás seguro de querer borrar?")){
                //borrar elemento correspondiente de x, y y b
                x.removeChild(x.lastElementChild.previousElementSibling);
                y.removeChild(y.lastElementChild.previousElementSibling);
                b.removeChild(b.lastElementChild.previousElementSibling);
            }
        });
    });
};

graficar.addEventListener("click", e => {
    e.preventDefault();
    let datosX = [], datosY = [];
    for(let i = 0; i < x.childElementCount; i++){
        datosX.push(x.children[i].value);
        datosY.push(y.children[i].value);
    }

    let layout = {
        autosize: false,
        width: 1000,
        height: 800,
        title: titulo.value,
        xaxis: {
            title: xLabel.value
        },
        yaxis: {
            title: yLabel.value
        }
    };

    if(tipo.value == "bar" || tipo.value == "scatter" || tipo.value == "line"){
        let datos = [{
            x: datosX,
            y: datosY,
            type: tipo.value,
            marker: {
                color: color.value
            }
        }];

        Plotly.newPlot("grafica", datos, layout);
    }
    else if(tipo.value == "pie"){
        let datos = [{
            values: datosY,
            labels: datosX,
            type: tipo.value,
            marker: {
                colors: color.value
            }
        }];

        Plotly.newPlot("grafica", datos, layout);
    }
    else if(tipo.value == "histogram"){
        let datos = [{
            x: datosX,
            type: tipo.value,
            marker: {
                color: color.value
            }
        }];

        Plotly.newPlot("grafica", datos, layout);
    }
    else if(tipo.value == "box"){
        let datos = [{
            y: datosY,
            type: tipo.value,
            marker: {
                color: color.value
            }
        }];

        Plotly.newPlot("grafica", datos, layout);
    }
    else if(tipo.value == "bubble"){
        let datos = [{
            x: datosX,
            y: datosY,
            mode: "markers",
            marker: {
                color: color.value
            }
        }];

        Plotly.newPlot("grafica", datos, layout);
    }
});

refresh();