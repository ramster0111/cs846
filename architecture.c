

/* 
*                    Apac┏e Cassa┓dr┏ St┓rage Layers            
*                        ┃       ┃  ┃   ┃                       
*            Write━━━━━▶ ┃       ┃  ┃   ┃                       
*                        ┃       ┃  ┃   ┃                       
*                        ┃       ┃  Full Memtable               
*                        ┃       ┃  ┃   ┃                       
*                        ┃       ┃  ┃   ┃                       
*                        ┃       ┃  ┃   ┃                       
*                        ┃       ┃  ┃ ┃ ┃                       
*    In-Memory:          ┃       ┃  ┃ ┃ ┃                       
*                        ┃       ┃  ┃ ┃ ┃                       
*                        ┗━━━━━━━┛  ┗━╋━┛                       
*                         MemTable    ┃Flush                    
*                ━━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━     
*                                     ┃                         
*                                     ┃                         
*                                     ┃   SSTables              
*                                  ┏━━▼━━━┳━━━━━┳━━━━━┓         
*                                  ┃      ┃     ┃     ┃         
*                                  ┃      ┃     ┃     ┃         
*    Disc Storage:                 ┃      ┃     ┃     ┃         
*                                  ┃      ┃     ┃     ┃         
*                                  ┃      ┃     ┃     ┃         
*                                  ┃      ┃     ┃     ┃         
*                                  ┃      ┃     ┃     ┃         
*                                  ┗━━━━━━┻━━━━━┻━━━━━┛         
*/ 
Draw an architecture diagram.
For example, operating system, database, web service.
The diagram should have 3 components and interaction.
*/
