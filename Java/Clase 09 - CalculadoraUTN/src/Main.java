import java.util.Scanner;
import java.util.InputMismatchException;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean continuar = true;

        while (continuar) {
            System.out.println("\n******** Calculadora UTN ********");
            System.out.println("1. Sumar");
            System.out.println("2. Restar");
            System.out.println("3. Multiplicar");
            System.out.println("4. Dividir");
            System.out.println("5. Salir");
            System.out.print("Elige una opción: ");

            try {
                int opcion = scanner.nextInt();

                if (opcion == 5) {
                    continuar = false;
                    continue;
                }

                if (opcion < 1 || opcion > 4) {
                    System.out.println("Opción no válida. Inténtalo de nuevo.");
                    continue;
                }

                System.out.print("Ingresa el primer número: ");
                double num1 = scanner.nextDouble();
                System.out.print("Ingresa el segundo número: ");
                double num2 = scanner.nextDouble();

                double resultado = 0;

                switch (opcion) {
                    case 1:
                        resultado = num1 + num2;
                        break;
                    case 2:
                        resultado = num1 - num2;
                    case 3:
                        resultado = num1 * num2;
                        break;
                    case 4:
                        if (num2 == 0) {
                            System.err.println("Error: No se puede dividir por cero.");
                            continue;
                        }
                        resultado = num1 / num2;
                        break;
                }

                System.out.println("El resultado es: " + resultado);

            } catch (InputMismatchException e) {
                System.err.println("Error: Por favor, ingresa un número válido.");
                scanner.next();
            }
        }
        scanner.close();
    }
}