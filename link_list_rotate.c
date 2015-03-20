
/* 
  Function to rotate a link list by k elements in clockwise direction.
  
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
