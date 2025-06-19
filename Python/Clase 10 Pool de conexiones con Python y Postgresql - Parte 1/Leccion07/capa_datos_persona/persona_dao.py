from conexion import Conexion
from Persona import Persona
from logger_base import log

class PersonaDAO:
    """
    DAO significa: Data Access Object
    CRUD significa: 
                    Create = Insertar 
                    Read = Seleccionar 
                    Update = Actualizar 
                    Delete = Eliminar
    """
    _SELECCIONAR = 'SELECT * FROM persona ORDER BY id_persona'
    _INSERTAR = 'INSERT INTO persona(nombre, apellido, email) VALUES(%s, %s, %s)'
    _ACTUALIZAR = 'UPDATE persona SET nombre=%s, apellido=%s, email=%s WHERE id_persona=%s'
    _ELIMINAR = 'DELETE FROM persona WHERE id_persona=%s'

    @classmethod
    def seleccionar(cls):
        try:
            conexion = Conexion.obtener_conexion()
            cursor = conexion.cursor()
            cursor.execute(cls._SELECCIONAR)
            registros = cursor.fetchall()
            personas = []
            for registro in registros:
                persona = Persona(registro[0], registro[1], registro[2], registro[3])
                personas.append(persona)
            return personas
        except Exception as e:
            log.error(f'Ocurrió un error en seleccionar: {e}')
            return []
        finally:
            cursor.close()

    @classmethod
    def insertar(cls, persona):
        try:
            conexion = Conexion.obtener_conexion()
            cursor = conexion.cursor()
            valores = (persona.nombre, persona.apellido, persona.email)
            cursor.execute(cls._INSERTAR, valores)
            conexion.commit()
            log.debug(f'Persona insertada: {persona}')
            return cursor.rowcount
        except Exception as e:
            conexion.rollback()
            log.error(f'Error al insertar: {e}')
            return 0
        finally:
            cursor.close()

    @classmethod
    def actualizar(cls, persona):
        try:
            conexion = Conexion.obtener_conexion()
            cursor = conexion.cursor()
            valores = (persona.nombre, persona.apellido, persona.email, persona.id_persona)
            cursor.execute(cls._ACTUALIZAR, valores)
            conexion.commit()
            log.debug(f'Persona actualizada: {persona}')
            return cursor.rowcount
        except Exception as e:
            conexion.rollback()
            log.error(f'Error al actualizar: {e}')
            return 0
        finally:
            cursor.close()

    @classmethod
    def eliminar(cls, persona):
        try:
            conexion = Conexion.obtener_conexion()
            cursor = conexion.cursor()
            valores = (persona.id_persona,)
            cursor.execute(cls._ELIMINAR, valores)
            conexion.commit()
            log.debug(f'Persona eliminada: {persona}')
            return cursor.rowcount
        except Exception as e:
            conexion.rollback()
            log.error(f'Error al eliminar: {e}')
            return 0
        finally:
            cursor.close()

if __name__ == '__main__':
    # Insertar un registro
    # persona1 = Persona(nombre='Juan', apellido='Perez', email='jperez@mail.com')
    # personas_insertadas = PersonaDAO.insertar(persona1)
    # log.debug(f'Personas insertadas: {personas_insertadas}')
                
    # Actualizar un registro
    # persona1 = Persona(1, 'Juan Carlos', 'Perez', 'jcperez@mail.com')
    # personas_actualizadas = PersonaDAO.actualizar(persona1)
    # log.debug(f'Personas actualizadas: {personas_actualizadas}')
        
    # Eliminar un registro
    # persona1 = Persona(id_persona=22)
    # personas_eliminadas = PersonaDAO.eliminar(persona1)
    # log.debug(f'Personas eliminadas: {personas_eliminadas}')
        
    # Seleccionar objetos
    personas = PersonaDAO.seleccionar()
    for persona in personas:
        log.debug(persona)

















