package Domain;

public class Persona {
    private String nombre;

    public String getNombre() {
        return nombre;
    }

    public Persona(String nombre) {
        this.nombre = nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public String toString() {
        return "Persona{" + "nombre='" + nombre + '\'' + '}';
    }
}
