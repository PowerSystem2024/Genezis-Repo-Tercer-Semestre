from ManejoArchivos import ManejoArchivos

# MANEJO DE CONTEXTO WITH: sintaxis simplificada, abre y cierra el archivo
# with open('prueba.txt', 'r', encoding='utf8') as archivo: 
    # print(archivo.read())
# No hace falta ni el try, ni el finally
# en el contexto de with lo que se ejecuta de manera automatica
# Utiliza diferentes métodos: __enter__ y __exit__
# __enter__ abre el archivo y __exit__ lo cierra

with ManejoArchivos('prueba.txt') as archivo: 
    print(archivo.read())










