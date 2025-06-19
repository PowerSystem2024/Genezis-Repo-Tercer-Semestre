package test;

public class TestArgumentosVariables {
    public static void main(String[] args) {
        imprimirNumeros(3, 4, 5);
        imprimirNumeros(1, 2);
        variosParámetros("Juan", "Perez", 7, 8, 9);
    }
    
    private static void variosParámetros(String nombre,String apellido,int ...numeros){
        System.out.println("Nombre: "+nombre+", Apellido: "+apellido);
        imprimirNumeros(numeros);
    }
    
    private static void imprimirNumeros(int ...numeros){
        for (int i = 0; i < numeros.length; i++) {
            System.out.println("Elementos: "+numeros[i]);
        }
    }
}
