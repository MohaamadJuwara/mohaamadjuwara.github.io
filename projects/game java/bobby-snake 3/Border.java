/**
 * Border - subklasse van Block.
 * 
 * Rand blokken die de grenzen van het spel vormen.
 * Gebruikt het plaatje 'green.png'.
 * 
 * Als Bobby botst met een Border, wordt collision() aangeroepen
 * (overgeërfd van Block) en stopt het spel.
 */
public class Border extends Block
{
    // Border erft collision() van Block
    // Als Bobby een Border raakt -> dead() -> spel stopt
}
