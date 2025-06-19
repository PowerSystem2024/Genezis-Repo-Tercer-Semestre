# Declaramos una variable
try:
    archivo = open('prueba.txt', 'w', encoding='utf8') #La w es de write(escribir)
    archivo.write('Programamos con diferentes tipos de archivos, ahora en txt.\n') 
    archivo.write('Los acentos son importantes para las palabras\n')
    archivo.write('como por ejemplo: acción, ajecución y producción\n')
    archivo.write('Las letras son:\nr para leer, \nw para escribir, \na para agregar, \nx para crear un nuevo archivo\n')
    archivo.write('t esta es para texto o text, \nb para archivos binarios, \nw+ para escribir y leer, \nr+ para agregar y leer\n')
    archivo.write('Saludos a todos los alumnos de la tecnicatura\n')
    archivo.write('Con esto terminamos')
except Exception as e:
    print(e)
finally: # siempre se ejecuta
    archivo.close() # Cierra el archivo
# archivo.write('Todo quedo perfecto'): esto es un error























