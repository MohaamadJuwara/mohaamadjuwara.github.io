import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Label - toont een score in de wereld.
 * Opdracht 4 (deel 2): scorebord dat bijhoudt hoeveel vissen opgegeten zijn.
 */
public class Label extends Actor
{
    private int intValue;
    private int fontSize;

    public Label(int value, int fontSize)
    {
        this.intValue = value;
        this.fontSize = fontSize;
        updateImage();
    }

    public void act()
    {
        // Label wordt bijgewerkt via setValue()
    }

    public void setValue(int value)
    {
        this.intValue = value;
        updateImage();
    }

    private void updateImage()
    {
        String displayText = "Score: " + intValue;
        
        GreenfootImage image = new GreenfootImage(
            displayText,
            fontSize,
            new Color(255, 255, 255),
            new Color(0, 0, 0, 150)
        );
        
        setImage(image);
    }
}
