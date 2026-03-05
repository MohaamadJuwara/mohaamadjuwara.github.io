import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Block - subklasse van Actor.
 * 
 * Dit is de basisklasse voor alle blokken in het spel:
 *   - Border  (rand blokken)
 *   - SnakeBody (lichaam van de slang)
 *   - Apple   (appels)
 * 
 * De collision() methode stopt het spel wanneer Bobby botst.
 */
public class Block extends Actor
{
    /**
     * collision() - wordt aangeroepen wanneer Bobby botst met een Block.
     * Roept de dead() methode aan in SnakeWorld zodat het spel stopt.
     * 
     * @param world het huidige SnakeWorld object
     */
    public void collision(SnakeWorld world)
    {
        world.dead();
    }
}
