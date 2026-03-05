import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Crab - subklasse van Animal.
 * Opdracht 2: beweegt met pijltjestoetsen
 * Opdracht 3: eet vissen op
 * Opdracht 4: houdt score bij via Label
 */
public class Crab extends Animal
{
    private Label scoreLabel;
    private int wormsEaten = 0;

    public Crab()
    {
        // Teken een krab zonder extern afbeeldingsbestand
        GreenfootImage img = new GreenfootImage(50, 36);
        // Krab lichaam
        img.setColor(new Color(220, 60, 40));
        img.fillOval(10, 8, 30, 20);
        // Linker schaar
        img.fillRect(0, 6, 12, 6);
        img.fillOval(0, 2, 8, 8);
        // Rechter schaar
        img.fillRect(38, 6, 12, 6);
        img.fillOval(42, 2, 8, 8);
        // Poten links
        img.fillRect(10, 24, 4, 10);
        img.fillRect(16, 26, 4, 10);
        // Poten rechts
        img.fillRect(30, 24, 4, 10);
        img.fillRect(36, 26, 4, 10);
        // Ogen
        img.setColor(new Color(0, 0, 0));
        img.fillOval(16, 10, 6, 6);
        img.fillOval(28, 10, 6, 6);
        img.setColor(new Color(255, 255, 255));
        img.fillOval(18, 12, 3, 3);
        img.fillOval(30, 12, 3, 3);
        setImage(img);
    }

    public void act()
    {
        if (Greenfoot.isKeyDown("left"))
        {
            move(-4);
        }
        if (Greenfoot.isKeyDown("right"))
        {
            move(4);
        }
        if (Greenfoot.isKeyDown("up"))
        {
            turn(-4);
        }
        if (Greenfoot.isKeyDown("down"))
        {
            turn(4);
        }
        
        eatFish();
    }

    private void eatFish()
    {
        Actor fish = getOneIntersectingObject(Fish.class);
        
        if (fish != null)
        {
            getWorld().removeObject(fish);
            wormsEaten = wormsEaten + 1;
            
            if (scoreLabel != null)
            {
                scoreLabel.setValue(wormsEaten);
            }
        }
    }

    public void setLabel(Label label)
    {
        scoreLabel = label;
    }
}
