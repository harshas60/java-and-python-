import java.util.Scanner;
class TextEditor {
    static final int MAX_TEXT_LENGTH = 100;
    static char[] textStack = new char[MAX_TEXT_LENGTH];
    static int stackTop = -1;

    public static void initialize() {
        stackTop =-1;
    }
    
    public static boolean isFULL() {
        return stackTop == MAX_TEXT_LENGTH - 1; 
    }
    public static boolean isEMPTY() {
        return stackTop == -1; 
    }
    public static void push(char ch) {
        if (!isFULL()) {
            textStack[++stackTop] = ch;
        } else {
            System.out.println("Stack is full. Cannot push character: " + ch);
        }
    }
    public static char pop() {
        if (!isEMPTY()) {
            return textStack[stackTop--];
        } else {
            System.out.println("Stack is empty. Cannot pop character.");
            return '\0'; 
        }
    }
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        initialize();
        System.out.println("Enter text (type 'UNDO' to remove last character, 'EXIT' to quit):");
        
        while (true) {
            String input = scanner.nextLine();
            if (input.equals("EXIT")) {
                break;
            } else if (input.equals("UNDO")) {
                char removedChar = pop();
                if (removedChar != '\0') {
                    System.out.println("Removed character: " + removedChar);
                }
            } else {
                for (char ch : input.toCharArray()) {
                    push(ch);
                }
                System.out.println("Current text: ");
                for (int i = 0; i <= stackTop; i++) {
                    System.out.print(textStack[i]);
                }
                System.out.println();
            }
        }
        scanner.close();
    }
        
}