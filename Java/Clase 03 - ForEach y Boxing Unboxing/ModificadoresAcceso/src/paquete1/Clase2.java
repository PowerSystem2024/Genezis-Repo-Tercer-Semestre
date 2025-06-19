package paquete1;

public class Clase2 extends Clase1 {
    String atributoDefault = "Valor del atributo default";

    //Clase2() {
    //    System.out.println("Constructor Default");
   // }

    public Clase2(){
        super();
        this.atributoDefault = "Modificación del atributo default";
        System.out.println("atributoDefault = " + atributoDefault);
        this.metodoDefault();
    }

    void metodoDefault() {
        System.out.println("Método Default");
    }
}
