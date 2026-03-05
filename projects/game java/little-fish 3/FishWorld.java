import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * FishWorld - de wereld voor het little-fish scenario.
 * Grootte: 800 bij 800. Achtergrond: blauw.
 */
public class FishWorld extends World
{
    public FishWorld()
    {    
        super(800, 800, 1);
        
        // Blauwe achtergrond zonder afbeeldingsbestand
        GreenfootImage bg = new GreenfootImage(800, 800);
        bg.setColor(new Color(0, 105, 180));
        bg.fill();
        setBackground(bg);
        
        prepare();
    }

    private void prepare()
    {
        Fish fish = new Fish();
        addObject(fish, 200, 200);
        
        Fish fish2 = new Fish();
        addObject(fish2, 400, 150);
        
        Fish fish3 = new Fish();
        addObject(fish3, 600, 500);
        
        Crab crab = new Crab();
        addObject(crab, 400, 400);
        
        Label scoreLabel = new Label(0, 40);
        addObject(scoreLabel, 100, 30);
        
        crab.setLabel(scoreLabel);
    }
}
