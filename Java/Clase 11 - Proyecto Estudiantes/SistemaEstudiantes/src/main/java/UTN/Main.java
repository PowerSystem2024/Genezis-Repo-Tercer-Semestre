package UTN;

import UTN.conexion.Conexion;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        var conexion = Conexion.getConnection();
        if (conexion != null) {
            System.out.println("Conexion exitosa : " + conexion);
        } else {
            System.out.println("Error al conectarse");

        }
    }//Fin main
}// Fin clase