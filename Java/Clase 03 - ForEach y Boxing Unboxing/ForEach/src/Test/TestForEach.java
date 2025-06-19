package Test;

import Domain.Persona;

public class TestForEach {
    public static void main(String[] args) {
        int edades[] = {5,6,7,8,9}; // sintaxis resumida
        for (var edad: edades){ //Sintaxis del ForEach
            System.out.println("edad= "+ edad);
        }
        Persona personas[] = {new Persona("Juan"), new Persona("Carla"), new Persona("Gerardo")};

        //ForEach
        for (Persona persona: personas){
            System.out.println("persona= "+ persona);
        }

    }
}
