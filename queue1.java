import java.util.Scanner;
    class QueuePositionFinder {
        public static void main(String[] args) {
            Scanner scanner =  new Scanner(System.in);
            int N = scanner.nextInt();
            int[] queue = new int[N];
            for (int i = 0; i < N; i++) {
                queue[i] = scanner.nextInt();
            }
            int X = scanner.nextInt();
            int position = finderPositio0n(queue, X);
            if (position != -1) {
                System.out.println("Item " + X + " is at position: " + position);
            } else {
                System.out.println("Item " + X + " not found in the queue");
            } 
            scanner.close();
        }
        public static int finderPositio0n(int[] queue, int X) {
            for (int i = 0; i < queue.length; i++) {
                if (queue[i] == X) {
                    return i + 1; 
                }
            }
            return -1; 
        }
    }