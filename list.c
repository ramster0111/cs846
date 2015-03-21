
// DRAW A DIAGRAM FOr THIS SOURCE CODE

/* 
*                                ┏━━┳━━━━┓       ┏━━┳━━━━┓      
*                                ┃  ┃    ┃       ┃  ┃    ┃      
*                                ┃  ┃    ┃       ┃  ┃    ┃      
*                   head ━━━━━━━━▶  ┃next┣━━━━━━━▶  ┃null┃      
*                                ┃  ┃    ┃       ┃  ┃    ┃      
*                                ┃  ┃    ┃       ┃  ┃    ┃      
*                                ┗━━┛▲━━━┛       ┗━━┻━━━━┛      
*                                    ┃                          
*                                    ┃                          
*                                    ┃                          
*                                    ┃                          
*                                                               
*                                                               
*                                 current                       
*/ 

// http://www.macs.hw.ac.uk/~rjp/Coursewww/Cwww/linklist.html
#include<stdlib.h>
#include<stdio.h>

struct list_el {
   int val;
   struct list_el * next;
};

typedef struct list_el item;

void main() {
   item * curr, * head;
   int i;

   head = NULL;

   for(i=1;i<=10;i++) {
     curr = (item *)malloc(sizeof(item));
      curr--;
     
      curr->next  = head;
      head = curr;
   }

   curr = head;

   while(curr) {
      printf("%d\n", curr->val);
      curr = curr->next ;
   }
}
