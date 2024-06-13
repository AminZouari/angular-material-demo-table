export class Todo {
   
    id: number;
    title: string;
    completed: boolean;
    userId: number;

    constructor(id: number,title: string,completed: boolean,userId: number){
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.userId = userId;
    }  
}
