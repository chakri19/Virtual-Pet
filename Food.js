class Food{
    constructor(){
        this.image = loadImage("Milk.png");
        this.foodStock = 0;
    }

    display(){
        var x = 80,y = 100;

        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);

        if (this.foodStock!=0){
            for(var i = 0; i<this.foodStock;i++){
                if(i%10==0){
                    x = 80;
                    y = y + 50;
                }

                image(this.image, x,y,50,50);
                x = x + 30;
            }
        } 
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(food){
        this.foodStock = food;
    }

    bedroom(){
        background(bedRoom,550,500);
    }

    garden(){
        background(garden,550,500);
    }

    washroom(){
        background(washRoom,550,500);
    }
    

    deductFoods(){
        //what do I do?
    }

}