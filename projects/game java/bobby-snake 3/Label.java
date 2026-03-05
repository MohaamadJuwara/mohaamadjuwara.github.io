import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Label - toont de score in de wereld.
 * 
 * Geïmporteerd via: Bewerken -> Importeer klasse -> Label
 * 
 * Wordt gebruikt om de score altijd zichtbaar te houden bovenaan het scherm.
 */
public class Label extends Actor
{
    private int intValue;
    private int fontSize;

    /**
     * Constructor: maakt een Label aan met beginwaarde en lettergrootte.
     * 
     * @param value    beginwaarde (bijv. 0)
     * @param fontSize lettergrootte (bijv. 20)
     */
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

    /**
     * setValue() - stelt een nieuwe waarde in en tekent het Label opnieuw.
     * 
     * @param value de nieuwe score om te tonen
     */
    public void setValue(int value)
    {
        this.intValue = value;
        updateImage();
    }

    /**
     * updateImage() - tekent het Label opnieuw.
     * Toont: "Score: [waarde] / 10"
     */
    private void updateImage()
    {
        String text = "Score: " + intValue + " / 10";

        // Maak een brede afbeelding zodat de tekst nooit afgekapt wordt
        GreenfootImage image = new GreenfootImage(260, 36);
        image.setColor(new Color(0, 0, 0, 160));
        image.fill();
        image.setColor(new Color(255, 255, 0));
        image.setFont(new greenfoot.Font("Arial", true, false, fontSize));
        image.drawString(text, 10, 26);
        setImage(image);
    }
}
