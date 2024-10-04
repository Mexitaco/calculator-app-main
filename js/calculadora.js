/**
 * función para cambiar tema
 */

var light = document.getElementById("on");
var normal = document.getElementById("na");
var dark = document.getElementById("off");

function setTheme(theme) {
  const html = document.querySelector("html");
  html.setAttribute("data-theme", theme);
}

normal.addEventListener("click", function () {
  setTheme("normal");
});

light.addEventListener("click", function () {
  setTheme("light");
});

dark.addEventListener("click", function () {
  setTheme("dark");
});

/**
 * añadir valores de los botones a screen
 */

var screen = document.getElementById("screen"); //div de la pantalla
var valores = []; //arreglo para los datos de la opereción
var flag = null;
let botones = document.querySelectorAll(".btn");
botones.forEach((item, index) => {
  keyboard();
  item.addEventListener("click", (e) => {
    const nombres = e.target.dataset["valor"];
    if (flag == true) {
      let kk = valores[valores.length - 1];
      console.log(kk);
      valores = [];
      valores.push(kk.toString());

      // console.log(valores[3]);
    }
    valores.push(nombres);
    console.log(valores);

    screen.innerHTML = valores.join("");
    flag = false;
    keyboard();
  });
});

/**
 * funciones para acciones de operaciones
 */

var like = document.getElementById("like");
like.addEventListener("click", function () {
  const resultado = calcular(valores.join(""));
  if (valores.length < 1) {
    flag = false;
    valores = [];
    return alert("Ingrese valores");
  } else {
    flag = true;
  }

  if (isNaN(parseFloat(resultado))) {
    screen.innerHTML = "";
    valores = [];
    flag = false;
    return alert(resultado);
  }

  if (resultado != NaN && resultado != undefined && resultado != null) {
    screen.innerHTML = resultado;
    valores.push(resultado);
  }
});

var punto = document.getElementById("punto");
punto.addEventListener("click", function () {
  if (/[0-9]/.test(valores[valores.length - 1])) {
    valores[valores.length] = ".";
    screen.innerHTML = valores.join("");
  } else {
    valores[valores.length] = "0.";
    screen.innerHTML = valores.join("");
  }
});

var del = document.getElementById("del");
del.addEventListener("click", function () {
  valores.pop();
  screen.innerHTML = valores.join("");
});

var res = document.getElementById("res");
res.addEventListener("click", function () {
  screen.innerHTML = "";
  valores = [];
});

/**
 * realización de la operación
 */

const evaluar = (expr) => {
  var formato = "";
  var tipo = "";
  var flag_kk = false;
  var flag_menor = 2;
  if (
    expr.includes("+") &&
    (!expr.includes("-") || !expr.includes("*") || !expr.includes("/"))
  ) {
    formato = /((?:\d+)?\d+(?:\.\d+)?)\+(\d+(?:\.\d+)?)/;
    tipo = "+";
  }

  if (expr.includes("-")) {
    formato = /((?:\-\d+)?\d+(?:\.\d+)?)\-(\d+(?:\.\d+)?)/;
    tipo = "-";
  }

  /*     if (/((?:\-\d+)?\d+(?:\.\d+)?)\-(\d+(?:\.\d+)?)/.test(expr)) {
      formato = /((?:\-\d+)?\d+(?:\.\d+)?)\-(\d+(?:\.\d+)?)/;
      tipo = "+";
      console.log(expr);
    } */

  if (expr.includes("-") && expr.includes("+")) {
    formato = /-?\d+\s*[\+\-*/]\s*-?\d+/;
    tipo = "-+";
    console.log("menor y mas");
  }

  if (
    /((?:\-\d+)?\d+(?:\.\d+)?)\-(\d+(?:\.\d+)?)/.test(expr) &&
    !expr.includes("+")
  ) {
    formato = /((?:\-\d+)?\d+(?:\.\d+)?)\+(\d+(?:\.\d+)?)/;
    tipo = "--";
  }

  if (expr.includes("*")) {
    formato = /((?:\-\d+)?\d+(?:\.\d+)?)\*(\d+(?:\.\d+)?)/;
    tipo = "*";
  }

  if (expr.includes("/")) {
    formato = /((?:\-\d+)?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)/;
    tipo = "/";
  }
  try {
    /*  if (
      expr.includes("-") &&
      (expr.includes("+") ||
        expr.includes("*") ||
        expr.includes("/") ||
        expr.includes("-"))
    ) {
      flag_menor = true;
      let arg = expr.split("");
      arg.shift();
      expr = arg.join("");
    } else {
      console.log("tmre");
      
      flag_menor = false;
    } */

    if (isNaN(Number(expr))) {
      var operar = null;
      if (formato.test(expr)) {
        operar = expr.replace(formato, (operador, a, b) => {
          //  if (tipo == "+" && flag_menor == true) {
          //    console.log("wrf");
          //    return Number(-a) + Number(b);
          //  }
          if (tipo == "+") {
            flag_menor = false;
            return Number(a) + Number(b);
          }

          if (tipo == "-+") {
            console.log(operador);

            console.log(Number(a));
            console.log(Number(b));
            console.log(Number(a) + Number(b));
            flag_kk = true;
            return Number(a) + Number(b);
          }

          if (tipo == "-") {
            flag_menor = false;

            console.log(a);
            console.log(b);
            return Number(a) - Number(b);
          }

          if (tipo == "--") {
            flag_menor = false;

            console.log(a);
            console.log(b);
            return Number(-a) + Number(-b);
          }

          //  if (tipo == "*" && flag_menor == true) {
          //    return Number(-a) * Number(b);
          //  }

          if (tipo == "*") {
            flag_menor = false;
            return Number(a) * Number(b);
          }

          //  if (tipo == "/" && flag_menor == true) {
          //    return Number(-a) / Number(b);
          //  }

          if (tipo == "/") {
            flag_menor = false;
            return Number(a) / Number(b);
          }
        });
      }
      console.log(operar);

      return Number(evaluar(operar));
    }
    console.log(expr);

    return Number(expr);
  } catch (error) {
    alert("Operación inválida");
    valores = [];
    screen.innerHTML = "";
    console.log(error);
    flag = false;
    return false;
  }
};

function calcular(expresion) {
  // Expresión regular para identificar la operación
  //const regex = /(-?\d+)\s*([\+\-*/])\s*(-?\d+)/;
  const regex =
    /((?:\-?\d+)?\d+(?:\.\d+)?)\s*([\+\-*/])\s*((?:\-?\d+)?\d+(?:\.\d+)?)/;
  //formato = /((?:\-?\d+)?\d+(?:\.\d+)?)\s*([\+\-*/])\s*(-?\d+)(\d+(?:\.\d+)?)/;
  const match = expresion.match(regex);
  if (!match) {
    return "Expresión no válida";
  }

  const num1 = parseFloat(match[1]);
  const operador = match[2];
  const num2 = parseFloat(match[3]);

  switch (operador) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 !== 0 ? num1 / num2 : "No se puede dividir entre cero";
    default:
      return "Operador no válido";
  }
}

function onKeyDown(event) {
  const key = event.key || event.which;
  // console.log("Presionada: " + key);

  if (key == "Enter") {
    document.getElementById("like").click();
  }

  if (key == "Backspace") {
    document.getElementById("del").click();
  }

  if (key == "Delete") {
    document.getElementById("res").click();
  }

  if (key == "+") {
    document.getElementById("val-+").click();
  }

  if (key == "-") {
    document.getElementById("val--").click();
  }

  if (key == "*") {
    document.getElementById("val-x").click();
  }

  if (key == "/") {
    document.getElementById("val-/").click();
  }

  if (key == ".") {
    document.getElementById("punto").click();
  }
  if (key == "1") {
    document.getElementById("val-1").click();
  }
  if (key == "2") {
    document.getElementById("val-2").click();
  }
  if (key == "3") {
    document.getElementById("val-3").click();
  }
  if (key == "4") {
    document.getElementById("val-4").click();
  }
  if (key == "5") {
    document.getElementById("val-5").click();
  }

  if (key == "6") {
    document.getElementById("val-6").click();
  }

  if (key == "7") {
    document.getElementById("val-7").click();
  }

  if (key == "8") {
    document.getElementById("val-8").click();
  }

  if (key == "9") {
    document.getElementById("val-9").click();
  }

  if (key == "0") {
    document.getElementById("val-0").click();
  }
}

var body = document.getElementById("body");
body.addEventListener("click", function () {
  keyboard();
});

function keyboard() {
  document.getElementById("keyboard").focus();
}
