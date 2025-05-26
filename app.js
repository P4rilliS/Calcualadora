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
      operacion.innerText.endsWith("+") && numero === "." ||
      operacion.innerText.endsWith("-") && numero === "." ||
      operacion.innerText.endsWith("*") && numero === "." ||
      operacion.innerText.endsWith("/") && numero === "." ||
      operacion.innerText.endsWith("%") && numero === "." ||
      operacion.innerText.endsWith("(") && numero === ".") {
      operacion.innerText += "0"
    } else if (operacion.innerText.endsWith(")") && numero === ".") {
      operacion.innerText += "*0"
    } else if (operacion.innerText.endsWith(".") && numero === ".") {
      return
    }
    operacion.innerText += numero
    console.log(`texto: ${operacion.innerText}`)
  })})
  
OPERADORES.forEach(operador => {
  const boton = document.createElement("button")
  boton.innerText = operador
  operadores.appendChild(boton)
  boton.addEventListener("click", () => {
    
    if (operador === "Xⁿ") {
      if(
        operacion.innerText === "" || 
        operacion.innerText.endsWith("(") || 
        operacion.innerText.endsWith("+") || 
        operacion.innerText.endsWith("-") || 
        operacion.innerText.endsWith("*") || 
        operacion.innerText.endsWith("/") || 
        operacion.innerText.endsWith("%")) {
          return
      } else {
        operacion.innerText += "^("
      }
    } else if (operador === "X") {      
      operacion.innerText += "*"
    } else if (operador === "÷") {
      operacion.innerText += "/"
    } else if (operador === "%") {
      if (operacion.innerText === "" || 
          operacion.innerText.endsWith("(") || 
          operacion.innerText.endsWith("+") || 
          operacion.innerText.endsWith("-") || 
          operacion.innerText.endsWith("*") || 
          operacion.innerText.endsWith("/") ||
          operacion.innerText.endsWith("%")) {
        return
      } else {
        operacion.innerText += operador
      }
    } else {
      operacion.innerText += operador
    }
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
      if(operacion.innerText.endsWith("sen(") || operacion.innerText.endsWith("cos(") || operacion.innerText.endsWith("tan(")) {
        operacion.innerText = operacion.innerText.slice(0, -4)
      } else {
        operacion.innerText = operacion.innerText.slice(0, -1)
      }
    } else {
      operacion.innerText += `${funcion}(`
    }
    console.log(`texto: ${operacion.innerText}`)})})


document.addEventListener("keydown", (evento) => {
  if (TECLASPERMITIDAS.includes(evento.key)) {
    if(evento.key == "Backspace"){
      if(operacion.innerText.endsWith("sen(") || operacion.innerText.endsWith("cos(") || operacion.innerText.endsWith("tan(")) {
        operacion.innerText = operacion.innerText.slice(0, -4)
      }else {
        operacion.innerText = operacion.innerText.slice(0, -1)
      }
    } else if (evento.key === "Enter") {
      evento.preventDefault() 
    }else {
      operacion.innerText += evento.key   
    }
    console.log(`texto: ${operacion.innerText}`)}})



// CONSTANTES, VARIABLES Y FUNCIONES PARA LA LOGICA DE LA CALCULADORA
