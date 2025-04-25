package mundopc;

import ar.com.system2023.mundopc.*;

public class mundoPC {
    public static void main(String[] args) {
        Monitor monitorHP = new Monitor("HP", 13);//Importar la clase
        Teclado tecladoHP = new Teclado("Bluetooth","HP");
        Raton ratonHP = new Raton("Bluetooth","HP");
        Computadora computadoraHP = new Computadora("Computadora HP", monitorHP, tecladoHP, ratonHP);
        
        //Creamos otros objetos de marcas diferentes
        Monitor monitorGamer = new Monitor("Gamer", 32);
        Teclado tecladoGamer = new Teclado("Bluetooth","Gamer");
        Raton ratonGamer = new Raton("Bluetooth","Gamer");
        Computadora computadoraGamer = new Computadora("Computadora Gamer", monitorGamer, tecladoGamer, ratonGamer);
        
        Monitor monitorBenQ = new Monitor("BenQ", 24);
        Teclado tecladoCorsair = new Teclado("USB","Corsair");
        Raton ratonRazer = new Raton("Bluetooth","Razer");
        Computadora computadoraLenovo = new Computadora("Computadora Lenovo", monitorBenQ, tecladoCorsair, ratonRazer);
        
        Computadora computadoraAsus = new Computadora("Computadora ASUS", new Monitor("ASUS", 27), new Teclado("USB", "ASUS"), new Raton("USB", "ASUS"));
        Computadora computadoraDell = new Computadora("Computadora Dell", new Monitor("Dell", 24), new Teclado("Bluetooth", "Dell"), new Raton("Bluetooth", "Dell"));
        Computadora computadoraAcer = new Computadora("Computadora Acer", new Monitor("Acer", 21), new Teclado("USB", "Acer"), new Raton("USB", "Acer"));
        Computadora computadoraMSI = new Computadora("Computadora MSI", new Monitor("MSI", 29), new Teclado("Bluetooth", "MSI"), new Raton("Bluetooth", "MSI"));
        Computadora computadoraSamsung = new Computadora("Computadora Samsung", new Monitor("Samsung", 27), new Teclado("USB", "Samsung"), new Raton("USB", "Samsung"));
        Computadora computadoraHPGamer = new Computadora("Computadora HP Gamer", new Monitor("HP", 30), new Teclado("Bluetooth", "HP"), new Raton("Bluetooth", "HP"));
        Computadora computadoraMixta = new Computadora("Computadora Mixta", monitorGamer, tecladoCorsair, ratonHP);

        Orden orden1 = new Orden();//Inicializamos el arreglo vacio
        Orden orden2 = new Orden();//Nueva lista para el objeto orden2
        
        orden1.agregarComputadora(computadoraHP);
        orden1.agregarComputadora(computadoraGamer);
        orden1.agregarComputadora(computadoraLenovo);
        
        orden1.agregarComputadora(computadoraAsus);
        orden1.agregarComputadora(computadoraDell);
        orden1.agregarComputadora(computadoraAcer);
        orden1.agregarComputadora(computadoraMSI);
        orden1.agregarComputadora(computadoraSamsung);
        orden1.agregarComputadora(computadoraHPGamer);
        orden1.agregarComputadora(computadoraMixta);
        
        Computadora computadorasVarias = new Computadora("Computadora de diferentes marcas", monitorHP, tecladoGamer, ratonHP);
        orden2.agregarComputadora(computadorasVarias);
        
        orden1.mostrarOrden();
        orden2.mostrarOrden();
    }
}
