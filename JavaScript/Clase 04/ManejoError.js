'use strict';
try{
    x = 10; // Variable no declarada, esto generará un error de referencia 
    miFuncion(); // Llamada a una función no definida, esto generará un error de referencia
}catch (error) {
    console.log( typeof (error) ) // Manejo del error
}finally{
    console.log("Este bloque se ejecuta siempre, independientemente de si hay un error o no.");
}
console.log('Continuamos ...')

let resultado = 1;

try{
    if(isNaN(resultado)){
        throw new Error("El resultado no es un número"); // Lanzar un error personalizado
    }else if (resultado === ''){
        throw new Error("El resultado es una cadena vacia"); // Lanzar un error personalizado
    }else if (resultado >= 0)throw 'Valor positivo'; // Lanzar un error personalizado
    else if (resultado < 0)throw 'Valor negativo'; // Lanzar un error personalizado
}
catch (error) {
    console.log(error); // Manejo del error
    console.log(error.name); // Nombre del error
    console.log(error.message); // Mensaje del error
}