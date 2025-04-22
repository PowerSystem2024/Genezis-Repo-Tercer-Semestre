import os

class Pelicula:
    def __init__(self, titulo, estado="disponible"):
        """Inicializa una película con título y estado"""
        self.titulo = titulo
        self.estado = estado  # Puede ser "Vigente", "Usado" o "Eliminado"
    
    def cambiar_estado(self, nuevo_estado):
        """Cambia el estado de la película"""
        estados_validos = ["disponible", "Usado", "Eliminado"]
        if nuevo_estado in estados_validos:
            self.estado = nuevo_estado
            return True
        return False
    
    def __str__(self):
        return f"{self.titulo} - {self.estado}"
    
    def to_dict(self):
        """Convierte la película a un diccionario para guardar"""
        return {"titulo": self.titulo, "estado": self.estado}

class CatalogoPeliculas:
    def __init__(self, archivo="peliculas.txt"):
        """Inicializa el catálogo con una lista vacía de películas"""
        self.archivo = archivo
        self.peliculas = []
        self.cargar_peliculas()
    
    def agregar_pelicula(self, titulo):
        """Agrega una nueva película al catálogo"""
        nueva_pelicula = Pelicula(titulo)
        self.peliculas.append(nueva_pelicula)
        self.guardar_peliculas()
        return nueva_pelicula
    
    def listar_peliculas(self):
        """Muestra todas las películas en el catálogo"""
        print("\n--- Catálogo de Películas ---")
        for idx, pelicula in enumerate(self.peliculas, 1):
            print(f"{idx}. {pelicula}")
        print("---------------------------\n")
    
    def cambiar_estado_pelicula(self, indice, nuevo_estado):
        """Cambia el estado de una película específica"""
        try:
            pelicula = self.peliculas[indice-1]
            if pelicula.cambiar_estado(nuevo_estado):
                print(f"Estado de '{pelicula.titulo}' cambiado a '{nuevo_estado}'")
                self.guardar_peliculas()
            else:
                print("Estado no válido")
        except IndexError:
            print("Índice de película no válido")
    
    def eliminar_pelicula(self, indice):
        """Elimina una película del catálogo"""
        try:
            pelicula = self.peliculas.pop(indice-1)
            print(f"Película '{pelicula.titulo}' eliminada del catálogo")
            self.guardar_peliculas()
        except IndexError:
            print("Índice de película no válido")
    
    def guardar_peliculas(self):
        """Guarda todas las películas en el archivo TXT"""
        with open(self.archivo, 'w') as f:
            for pelicula in self.peliculas:
                f.write(f"{pelicula.titulo}|{pelicula.estado}\n")
    
    def cargar_peliculas(self):
        """Carga las películas desde el archivo TXT"""
        if os.path.exists(self.archivo):
            with open(self.archivo, 'r') as f:
                lineas = f.readlines()
                for linea in lineas:
                    datos = linea.strip().split('|')
                    if len(datos) == 2:
                        self.peliculas.append(Pelicula(datos[0], datos[1]))

def mostrar_menu():
    """Muestra el menú principal"""
    print("\n--- Menú del Catálogo ---")
    print("1. Agregar película")
    print("2. Listar películas")
    print("3. Cambiar estado de película")
    print("4. Eliminar película")
    print("5. Salir")
    print("------------------------")

def main():
    catalogo = CatalogoPeliculas()
    
    while True:
        mostrar_menu()
        opcion = input("Seleccione una opción: ")
        
        if opcion == "1":
            titulo = input("Ingrese el título de la película: ")
            catalogo.agregar_pelicula(titulo)
            print(f"Película '{titulo}' agregada al catálogo")
        
        elif opcion == "2":
            catalogo.listar_peliculas()
        
        elif opcion == "3":
            catalogo.listar_peliculas()
            try:
                indice = int(input("Seleccione el número de película a modificar: "))
                print("\nOpciones de estado:")
                print("1. Vigente")
                print("2. Usado")
                print("3. Eliminado")
                estado_opcion = input("Seleccione el nuevo estado (1-3): ")
                
                estados = {1: "Vigente", 2: "Usado", 3: "Eliminado"}
                if estado_opcion in ["1", "2", "3"]:
                    catalogo.cambiar_estado_pelicula(indice, estados[int(estado_opcion)])
                else:
                    print("Opción de estado no válida")
            except ValueError:
                print("Por favor ingrese un número válido")
        
        elif opcion == "4":
            catalogo.listar_peliculas()
            try:
                indice = int(input("Seleccione el número de película a eliminar: "))
                catalogo.eliminar_pelicula(indice)
            except ValueError:
                print("Por favor ingrese un número válido")
        
        elif opcion == "5":
            print("Saliendo del sistema...")
            break
        
        else:
            print("Opción no válida, por favor intente nuevamente")

if __name__ == "__main__":
    print("Bienvenido al Catálogo de Películas")
    main()