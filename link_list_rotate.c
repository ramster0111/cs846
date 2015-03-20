
/* 
  Function to rotate a link list by k elements in clockwise direction.
  Eg: for 2 elements:
  
  /* 
  *                                                               
  *                                                               
  *                                                               
  *                                                               
  *      ┏━━┓    ┏━━┓    ┏━━┓       ┏━━┓                          
  *      ┃  ┣━━━━▶  ┣━━━━▶  ┣━ ━ ━  ┃  ┃                          
  *      ┃1 ┃    ┃2 ┃    ┃3 ┃       ┃N ┃                          
  *      ┗━━┛    ┗━━┛    ┗━━┛       ┗━━┛                          
  *                                                               
  *                                                               
  *                                                               
  *                                                               
  *                                                               
  *                                                               
  *                                                               
  *      ┏━━┓    ┏━━┓    ┏━━┓       ┏━━┓                          
  *      ┃  ┣━━━━▶  ┣━━━━▶  ┣━━ ━━  ┃  ┃                          
  *      N-1┃    ┃N ┃    ┃1 ┃       N-2┃                          
  *      ┗━━┛    ┗━━┛    ┗━━┛       ┗━━┛                          
  *                                                               
  *                                                               
  *                                                               
  *                                                               
  *                                                               
  *                                                               
  *                                                               
  *                                                               
  *                                                               
  */ 
*/

struct list *rotate_k(struct list *node,int k)
{
   int count=0;
   struct list *knode,*ptr=node;
   while(ptr!=NULL && count < k)
   {
      ptr=ptr->next;
      count++; 
   }
   knode=ptr;
   while(ptr->next!=NULL)
   {
      ptr=ptr->next;
   }
   ptr->next =node;
   node=knode->next;     
   knode->next=NULL;

   return knode; //<-- THIS IS THE NEW LIST
}
