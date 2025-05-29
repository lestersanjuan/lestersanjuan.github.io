import React, { useState } from "react";
import "./Assessment.css"; // Your custom stylesheet
function Assessment() {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    function newItem() {
        let randomItem = Math.floor(Math.random() * 100);
        return randomItem;
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        console.log('isChecked:', e.target.checked);
        // any other side-effects here…
      };

    const bobaMilk: string[] = [
        "Brown Sugar Boba Milk",
        "Creme Brulee Boba Milk",
        "Pudding Boba Milk",
        "Oreo Brulee Boba Milk",
        "Red Bean Boba Milk",
        "Taro Boba Milk",
        "Grass Jelly Boba Milk",
      ];
      
      const cheeseFoam: string[] = [
        "Ceylon Cheese",
        "Jasmine Cheese",
        "Oolong Cheese",
        "Four Seasons Cheese",
        "White Peach Oolong Cheese",
      ];
      
      const originalTea: string[] = [
        "Ceylon Black Tea",
        "Jasmine Green Tea",
        "Roasted Oolong Tea",
        "Four Seasons Tea",
      ];
      
      const frostie: string[] = [
        "Strawberry Frostie",
        "Matcha Red Bean Frostie",
        "Fresh Taro Frostie",
        "Mango Frostie",
      ];
      
      const milkTea: string[] = [
        "Sunright Boba Milk Tea",
        "Panda Milk Tea",
        "Ceylon Milk Tea",
        "Jasmine Milk Tea",
        "Oolong Milk Tea",
        "Four Seasons Latte",
        "Matcha Milk Tea",
        "Hokkaido Milk Tea",
        "Taro Milk Tea",
        "Matcha Oolong Milk Tea",
        "Strawberry Matcha Latte",
        "Thai Milk Tea",
        "Mango Milk Tea",
        "Cream Pudding Milk Tea",
        "White Peach Oolong Milk Tea",
      ];
      
      const fruitTea: string[] = [
        "Sunright Fruit Tea",
        "Lemon Jasmine Tea",
        "Grapefruit Jasmine Tea",
        "Strawberry Jasmine Tea",
        "Yogurt Green Tea",
        "Yogurt Lemon",
        "Yogurt Orange",
        "Mango Jasmine",
        "Grapefruit Yakult",
      ];
      
      const bruleeLatte: string[] = [
        "Brulee Oat Latte - Ceylon",
        "Brulee Oat Latte - Jasmine",
        "Brulee Oat Latte - Oolong",
        "Brulee Oat Latte - Four Seasons",
        "Brulee Oat Latte - Matcha",
      ];
      
      const kidsMenu: string[] = [
        "Strawberry Boba Milk (16oz.)",
        "Oreo Chocolate Boba Milk (16oz.)",
        "Hokkaido Boba Frostie (16oz.)",
        "Yogurt Orange (16oz.)",
      ];
      
      const seasonal: string[] = [
        "Cream Pudding Milk Tea",
        "Mochi Matcha Red Bean Frostie",
        "Mango Frostie",
        "Grapefruit Yakult",
      ];
      
      const toppings: string[] = [
        "Cheese Foam",
        "Creme Brulee",
        "Boba",
        "Honey Boba",
        "Agar Boba",
        "Red Bean",
        "Taro",
        "Lychee Jelly",
        "Caramel Pudding (Yellow)",
        "Grass Jelly",
        "Oreo",
        "Upgrade Cane Sugar to Honey",
        "Cream Pudding (White)",
        "Jasmine Tea Jelly",
        "Mochi",
      ];
      
      const sweetnessLevel: number[] = [120, 100, 75, 50, 25, 0];
      
      const iceLevel: string[] = [
        "Regular Ice",
        "Less Ice",
        "No Ice",
      ];
      
      const milkType: string[] = [
        "Organic Milk",
        "Fresh Milk",
        "Oat Milk",
        "Almond Milk",
      ];
      
      // composite menus
      const storeMenu: string[][] = [
        bobaMilk,
        cheeseFoam,
        originalTea,
        frostie,
        milkTea,
        fruitTea,
        bruleeLatte,
        kidsMenu,
      ];
      
      const toppingsTraining1: string[][] = [
        fruitTea,
        milkTea,
        originalTea,
        cheeseFoam,
        bruleeLatte,
      ];
      
      const toppingsTraining2: string[][] = [
        bobaMilk,
        ["Sunright Boba Milk Tea"],
      ];
      
      const storeMenu2: string[][] = [
        bobaMilk,
        cheeseFoam,
        originalTea,
        frostie,
        milkTea,
        fruitTea,
        bruleeLatte,
        kidsMenu,
        seasonal,
      ];

    
    let [testValue, setTestValue] = useState(0);
    return (
        <div>
            <h1>Assessment</h1>
            <label>
                    <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                    />
                    Toggle me
                </label>
            <p>This is the Assessment page.</p>
            <button onClick={() => setTestValue(testValue = newItem())}>What is {testValue}</button>
        </div>
    )
}

export default Assessment;