/**
 * SnakeBody - subklasse van Block.
 * 
 * Elk stukje van de slang is een SnakeBody object.
 * - Het hoofd van Bobby gebruikt het plaatje 'bobby.png'
 * - De staart gebruikt het plaatje 'tail.png'
 * 
 * De slang in het spel is een LinkedList van SnakeBody objecten.
 * Het laatste element in de lijst is altijd het hoofd.
 */
public class SnakeBody extends Block
{
    // SnakeBody erft collision() van Block
    // Als Bobby zichzelf raakt -> dead() -> spel stopt
}
