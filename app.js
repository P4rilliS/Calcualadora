//CONTANTES Y FUNCIONES PARA LA VISUALIZACION EN EL DOM
/**
  @ Constantes: NUMEROS, OPERADORES, TRIGONOMETRIA, TECLASPERMITIDAS
  @ Tipo: Arrays 
  @ Descripción: Son arrays que contienen el contenido de cada boton y de las teclas permitidas en el teclado fisico 
*/
const NUMEROS = [
  "7", "8", "9",
  "4", "5", "6",
  "1", "2", "3",
  "0", "."]

const OPERADORES = [
  "(", ")", "Xⁿ", "%",
    "X", "÷", "+", "-"]


const TRIGONOMETRIA = [
  "sen", "cos", "tan", "AC", "C"]

const TECLASPERMITIDAS = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","(", ")",
  "%", "Backspace","*", "/", "+", "-", "."]
  
  /**
    @ Constantes: operacion,numeros. operadores, trigonometria
    @ Tipo: Elementos de DOM 
    @ Descripción: Selecciona a elementos del DOM y le asigna una constante
  */
const operacion = document.querySelector("#operacion")
const resultado = document.querySelector("#resultado")
const numeros  = document.querySelector("#numeros")
const operadores = document.querySelector("#operadores")
const trigonometria = document.querySelector("#funcionesTrigonometricas")
const terminaEn = (caracter) => operacion.innerText.endsWith(caracter)

/**
  @ Funciones: ForEach, addEventListener
  @ Descripción:  itera en cada uno de los elementos de los arrays 
                  correspondientes para crear y mostrar elementos 
                  de tipo "button" en el DOM agregando clases en 
                  alguno de ellos. Tambien se usa "if" para cambiar 
                  ciertos símbolos operacionales y darle funcionalidad a ciertos botones
*/

NUMEROS.forEach(numero => {
  const boton = document.createElement("button")
  boton.innerText = numero
  numeros.appendChild(boton)
  if (numero === "0") {                          
    boton.classList.add("cero")                  
  }
  boton.addEventListener("click", () => {
    if (operacion.innerText === "" && numero === ".") {
      operacion.innerText = "0"
    } else if (
      terminaEn("+") && numero === "." ||
      terminaEn("-") && numero === "." ||
      terminaEn("*") && numero === "." ||
      terminaEn("/") && numero === "." ||
      terminaEn("%") && numero === "." ||
      terminaEn("(") && numero === ".") {
      operacion.innerText += "0"
    } else if (terminaEn(")") && numero === ".") {
      operacion.innerText += "*0"
    } else if (terminaEn(".") && numero === ".") {
      return
    }
    operacion.innerText += numero
    console.log(`texto: ${operacion.innerText}`)
    calcular()
  })})
  
OPERADORES.forEach(operador => {
  const boton = document.createElement("button")
  boton.innerText = operador
  operadores.appendChild(boton)
  boton.addEventListener("click", () => {
    
    if (operador === "Xⁿ") {
      if(
        operacion.innerText === "" || 
        terminaEn("(") || 
        terminaEn("+") || 
        terminaEn("-") || 
        terminaEn("*") || 
        terminaEn("/") || 
        terminaEn("%")) {
          return
        } else {
          operacion.innerText += "**("
        }
    } else if (operador === "%") {
      if (
        operacion.innerText === "" || 
        terminaEn("(") || 
        terminaEn("+") || 
        terminaEn("-") || 
        terminaEn("*") || 
        terminaEn("/") ||
        terminaEn("%")){ 
          return
        } else { 
          operacion.innerText += operador
        }    
    } else if (operador === ")") {
      if (operacion.innerText.includes("(")) {
        let parentesisAbiertos = (operacion.innerText.match(/\(/g) || []).length
        let parentesisCerrados = (operacion.innerText.match(/\)/g) || []).length
        if(
          terminaEn("(") ||
          terminaEn("+") ||
          terminaEn("-") ||
          terminaEn("*") ||
          terminaEn("/") ||
          terminaEn(".")) {
            return
          } else {
            if (parentesisAbiertos > parentesisCerrados) {
              console.log("hay mas parentesis abiertos")
              parentesisCerrados++
              operacion.innerText += operador
              console.log(`C: ${parentesisCerrados}\nA: ${parentesisAbiertos}`)
          }
        }}
    } else if (operador === "X") {
      if (
        operacion.innerText === "" ||
        terminaEn("(") ||
        terminaEn(".")) {
          return
        } else if (
          terminaEn("+") ||
          terminaEn("-") ||
          terminaEn("*") ||
          terminaEn("/")) {
            operacion.innerText = operacion.innerText.slice(0, -1)
            operacion.innerText += "*"
        }else {
          operacion.innerText += "*"
        }
    } else if (operador === "÷") {
      if (
        operacion.innerText === "" ||
        terminaEn("(") ||
        terminaEn(".")) {
          return
        } else if (
          terminaEn("+") ||
          terminaEn("-") ||
          terminaEn("*") ||
          terminaEn("/")) {
            operacion.innerText = operacion.innerText.slice(0, -1)
            operacion.innerText += "/"
        }else {
          operacion.innerText += "/"
        }
    } else if (operador === "+") {
      if (
        operacion.innerText === "" ||
        terminaEn("(") ||
        terminaEn(".")) {
          return
        } else if (
          terminaEn("+") ||
          terminaEn("-") ||
          terminaEn("*") ||
          terminaEn("/")) {
            operacion.innerText = operacion.innerText.slice(0, -1)
            operacion.innerText += "+"
        }else {
          operacion.innerText += "+"
        }
    } else if (operador === "-") {
      if (
        terminaEn("(") ||
        terminaEn(".")) {
          return
        } else if (
          terminaEn("+") ||
          terminaEn("-") ||
          terminaEn("*") ||
          terminaEn("/")) {
            operacion.innerText = operacion.innerText.slice(0, -1)
            operacion.innerText += "-"
        }else {
          operacion.innerText += "-"
        }
    } else if (operador === "(") {
      if (
        !isNaN(operacion.innerText[operacion.innerText.length -1]) || 
        terminaEn(")")){
          operacion.innerText += "*("
      } else {
        operacion.innerText += operador
      }
    }
    calcular()
    console.log(`texto: ${operacion.innerText}`)})}) 

TRIGONOMETRIA.forEach((funcion, index) => {
  const boton = document.createElement("button")
  boton.innerText = funcion
  trigonometria.appendChild(boton)
  if (TRIGONOMETRIA[index].includes("AC") || TRIGONOMETRIA[index].includes("C")) {
    boton.classList.add("colorRojo")
  }  
  boton.addEventListener("click", () => {
    if (funcion === "AC"){
      operacion.innerText = ""
      resultado.innerText = ""
    } else if (funcion === "C") {
      if(terminaEn("sen(") || terminaEn("cos(") || terminaEn("tan(")) {
        operacion.innerText = operacion.innerText.slice(0, -4)
      } else {
        operacion.innerText = operacion.innerText.slice(0, -1)
      }
    } else if (funcion === "sen" || funcion === "cos" || funcion === "tan") {
      operacion.innerText += `${funcion}(`
    }
    console.log(`texto: ${operacion.innerText}`)})})


document.addEventListener("keydown", (evento) => {
  if (TECLASPERMITIDAS.includes(evento.key)) {
    if(evento.key == "Backspace"){
      if(terminaEn("sen(") || terminaEn("cos(") || terminaEn("tan(")) {
        operacion.innerText = operacion.innerText.slice(0, -4)
      }else {
        operacion.innerText = operacion.innerText.slice(0, -1)
      }
    } else if (evento.key === "Enter") {
      evento.preventDefault() 
    }else {
      operacion.innerText += evento.key   
    }
    calcular()
    console.log(`texto: ${operacion.innerText}`)}})



// CONSTANTES, VARIABLES Y FUNCIONES PARA LA LOGICA DE LA CALCULADORA

// function calcular () {
//   resultado.innerText = eval(operacion.innerText)
// }

function calcular() {
    let expresion = operacion.innerText
        .replace(/sen\(/g, "Math.sin((Math.PI/180)*") // 🔥 Convierte "sen(" a "Math.sin("
        .replace(/cos\(/g, "Math.cos((Math.PI/180)*")  // 🔥 Convierte "cos(" a "Math.cos("
        .replace(/tan\(/g, "Math.tan((Math.PI/180)*"); // 🔥 Convierte "tan(" a "Math.tan("
    
    try {
        resultado.innerText = eval(expresion);
    } catch (error) {
        resultado.innerText = "Error"; // ❌ Evita expresiones inválidas
    }
}
