from NumerosIgualesException import NumerosIgualesException

resultado = None


try:
    a = int(input('Ingrese un número: '))
    b = int(input('Ingrese otro número: '))

    if a==b: #Comparo en el caso que esto suceda , se lanza la Exception
        raise NumerosIgualesException('Los números ingresados son iguales.')

    resultado = a/b
except  TypeError as e:
    print(f'TypeError - Ocurrió un error: {type(e)}')
except ZeroDivisionError as e:
    print(f'ZeroDivisionError - Ocurrió un error: {type(e)}')
except Exception as e:
    print(f'Exception - Ocurrió un error: {type(e)}')
else:
    print("No se arrojó ninguna exception.")
finally: #Siempre se ejecuta este bloque.
    print("Ejecución del bloque finally. Siempre se ejecuta.")

print(f'El resultado es: {resultado}')
print('Seguimos...')

