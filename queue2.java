import java.util.Scanner;

 class QueueRotationFromIndex {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        
        int M = scanner.nextInt();
        int[] queue = new int[M];

       
        for (int i = 0; i < M; i++) {
            queue[i] = scanner.nextInt();
        }

       
        int K = scanner.nextInt();

       
        rotateQueue(queue, K);

        displayQueue(queue);

        scanner.close();
    }

    
    public static void rotateQueue(int[] queue, int K) {
        int n = queue.length;

       
        K = K % n;

        
        reverse(queue, 0, K - 1); 
        reverse(queue, K, n - 1); 
        reverse(queue, 0, n - 1); 
    }

    
    public static void reverse(int[] queue, int start, int end) {
        while (start < end) {
            int temp = queue[start];
            queue[start] = queue[end];
            queue[end] = temp;
            start++;
            end--;
        }
    }

    
    public static void displayQueue(int[] queue) {
        for (int i = 0; i < queue.length; i++) {
            System.out.print(queue[i] + " ");
        }
        System.out.println();
    }
}
