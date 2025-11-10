import java.util.Scanner;

 class ShelfStack {

    static final int MAX_SIZE = 100;
    int[] stack = new int[MAX_SIZE];
    int top = -1;

  
    public void push(int value) {
        if (top == MAX_SIZE - 1) {
            System.out.println("Shelf is full. Cannot add more items.");
            return;
        }
        stack[++top] = value;
        System.out.println("Item " + value + " is pushed onto the shelf");
    }

  
    public void pop() {
        if (top == -1) {
            System.out.println("No items in the shelf");
            return;
        }
        int element = stack[top--];
        System.out.println("Item " + element + " is popped from the shelf");
    }

    public void displayStack() {
        if (top == -1) {
            System.out.println("Shelf is empty");
            return;
        }
        System.out.print("Items in the shelf: ");
        for (int i = top; i >= 0; --i) {
            System.out.print(stack[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ShelfStack shelf = new ShelfStack();

        int choice, value;


        do {
            

            choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    value = scanner.nextInt();
                    shelf.push(value);
                    break;
                case 2:
                    shelf.pop();
                    break;
                case 3:
                    shelf.displayStack();
                    break;
                case 4:
                    System.out.println("Exiting the warehouse");
                    break;
                default:
                    System.out.println("Invalid choice");
            }
        } while (choice != 4);

        scanner.close();
    }
}
