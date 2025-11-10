import java.util.Scanner;

 class OrderQueue {
    private static final int MAX_SIZE = 5;
    private char[] orders = new char[MAX_SIZE];
    private int front = -1;
    private int rear = -1;

    
    public void initializeQueue() {
        front = -1;
        rear = -1;
    }

    
    public boolean isEmpty() {
        return front == -1;
    }

    public boolean isFull() {
        return (rear + 1) % MAX_SIZE == front;
    }

   
    public boolean enqueue(char order) {
        if (isFull()) {
            System.out.println("Queue is full. Cannot enqueue more orders.");
            return false;
        }

        if (isEmpty()) {
            front = rear = 0;
        } else {
            rear = (rear + 1) % MAX_SIZE;
        }

        orders[rear] = order;
        System.out.println("Order for " + order + " is enqueued.");
        return true;
    }

    
    public boolean dequeue() {
        if (isEmpty()) {
            return false;
        }

        char order = orders[front];
        System.out.println("Dequeued Order: " + order);

        if (front == rear) {
            front = rear = -1;
        } else {
            front = (front + 1) % MAX_SIZE;
        }
        return true;
    }

    
    public void display() {
        if (isEmpty()) {
            System.out.println("Queue is empty. No orders available.");
        } else {
            System.out.print("Orders in the queue are: ");
            int i = front;
            while (i != rear) {
                System.out.print(orders[i] + " ");
                i = (i + 1) % MAX_SIZE;
            }
            System.out.println(orders[rear]);
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        OrderQueue queue = new OrderQueue();

        queue.initializeQueue();

        while (true) {
            
            int option = scanner.nextInt();

            switch (option) {
                case 1:
                    char order = scanner.next().charAt(0);
                    queue.enqueue(order);
                    break;

                case 2:
                    if (!queue.dequeue()) {
                        System.out.println("No orders in the queue.");
                    }
                    break;

                case 3:
                    queue.display();
                    break;

                case 4:
                    System.out.print("Exiting program");
                    scanner.close();
                    return;

                default:
                    System.out.println("Invalid option.");
                    break;
            }
        }
    }
}