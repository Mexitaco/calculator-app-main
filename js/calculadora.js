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
  });
});

/**
 * funciones para acciones de operaciones
 */

var like = document.getElementById("like");
like.addEventListener("click", function () {
  var resultado = evaluar(valores.join(""));
  if (valores.length < 1) {
    flag = false;
    console.log("ptm");
    
  } else {
    flag = true;
  }


  if (resultado != false) {
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
  var formato;
  var tipo;
  try {
    if (expr.includes("+")) {
      formato = /((?:\-\d+)?\d+(?:\.\d+)?)\+(\d+(?:\.\d+)?)/;
      tipo = "+";
    }

    if (expr.includes("-")) {
      formato = /((?:\-\d+)?\d+(?:\.\d+)?)\-(\d+(?:\.\d+)?)/;
      tipo = "-";
    }

    if (expr.includes("*")) {
      formato = /((?:\-\d+)?\d+(?:\.\d+)?)\*(\d+(?:\.\d+)?)/;
      tipo = "*";
    }

    if (expr.includes("/")) {
      formato = /((?:\-\d+)?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)/;
      tipo = "/";
    }

    if (isNaN(Number(expr))) {
      var operar;
      if (formato.test(expr)) {
        operar = expr.replace(formato, (operador, a, b) => {
          if (tipo == "+") {
            return Number(a) + Number(b);
          }

          if (tipo == "-") {
            return Number(a) - Number(b);
          }

          if (tipo == "*") {
            return Number(a) * Number(b);
          }

          if (tipo == "/") {
            return Number(a) / Number(b);
          }
        });
      }

      return evaluar(operar);
    }

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
