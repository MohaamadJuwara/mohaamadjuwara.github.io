import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Fish - subklasse van Animal.
 * Opdracht 7: beweegt met move(4) in act()
 * Opdracht 8: draait aan de randen via hitEdge()
 */
public class Fish extends Animal
{
    public Fish()
    {
        // Teken een vis zonder extern afbeeldingsbestand
        GreenfootImage img = new GreenfootImage(42, 24);
        // Vis lichaam
        img.setColor(new Color(30, 200, 255));
        img.fillOval(0, 2, 32, 20);
        // Vis staart
        int[] xPoints = {28, 42, 42, 28};
        int[] yPoints = {12, 2, 22, 12};
        img.fillPolygon(xPoints, yPoints, 4);
        // Vis oog
        img.setColor(new Color(0, 0, 0));
        img.fillOval(6, 8, 6, 6);
        img.setColor(new Color(255, 255, 255));
        img.fillOval(7, 9, 3, 3);
        setImage(img);
    }

    public void act()
    {
        move(4);
        hitEdge();
    }

    private void hitEdge()
    {
        if (getX() >= 790)
        {
            turn(40);
        }
        if (getY() >= 790)
        {
            turn(40);
        }
        if (getX() <= 10)
        {
            turn(40);
        }
        if (getY() <= 10)
        {
            turn(40);
        }
    }
}
