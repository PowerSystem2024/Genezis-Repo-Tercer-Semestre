
mifuncion1();
mifuncion2();

function mifuncion1(){
    console.log('Función 1');
}

function mifuncion2(){
    console.log('Función 2');
}

//Funcion de tipo callback
let imprimir = function imprimir( mensaje ){
    console.log( mensaje );
}

function sumar( op1, op2, funcionCallback ){
    let resultado = op1 + op2;
    funcionCallback(`Resultado: ${resultado}`);
}

sumar( 5, 3, imprimir );

//Llamadas asincronas con uso setTimeout
function miFuncionCallback(){
    console.log('Saludo asincrono después de 3 segundos');
}

setTimeout( miFuncionCallback, 3000 ); 

setTimeout( function(){ console.log('Saludo asincrono 2')}, 4000 );

setTimeout( () => console.log('Saludo asincrono 3'), 5000 );

let reloj = () => {
    let fecha = new Date();
    console.log(`Hora: ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`);
}

setInterval( reloj, 1000 ); //Cada 1 segundo se ejecuta






