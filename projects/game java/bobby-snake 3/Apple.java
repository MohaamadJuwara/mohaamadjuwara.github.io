import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Apple - subklasse van Block.
 * 
 * Een appel die Bobby kan opeten om te groeien.
 * Gebruikt het plaatje 'apple.png'.
 * 
 * De collision() methode wordt OVERSCHREVEN (override):
 * - De slang mag NIET doodgaan als hij een appel eet.
 * - In plaats daarvan groeit de slang en verplaatst de appel.
 */
public class Apple extends Block
{
    /**
     * collision() - overschrijft de methode uit Block.
     * 
     * Wanneer Bobby een appel eet:
     * 1. Laat de slang groeien met 2 stukjes (grow(2))
     * 2. Verhoog de score met 1
     * 3. Verplaats de appel naar een willekeurige nieuwe positie
     * 4. Speel het slurp geluid af
     * 5. Controleer of de score 10 is -> spel gewonnen
     * 
     * @param world het huidige SnakeWorld object
     */
    public void collision(SnakeWorld world)
    {
        // Laat de slang groeien met 2 stukjes
        world.grow(2);
        
        // Verhoog de score
        world.addScore();
        
        // Verplaats de appel naar een willekeurige positie (binnen de rand)
        int newX = Greenfoot.getRandomNumber(world.getWidth() - 2) + 1;
        int newY = Greenfoot.getRandomNumber(world.getHeight() - 2) + 1;
        world.removeObject(this);
        Apple newApple = new Apple();
        world.addObject(newApple, newX, newY);
        
        // Speel het slurp geluid af
        Greenfoot.playSound("slurp.mp3");
    }
}
