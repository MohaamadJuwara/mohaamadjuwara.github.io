import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)
import java.util.LinkedList;

/**
 * SnakeWorld - de wereld voor het Bobby Snake spel.
 * 
 * Volgt alle stappen van de opdracht:
 * - Wereld: 25 blokken breed, 20 blokken hoog, blokgrootte 32
 * - Achtergrond: bg.jpg
 * - Rand tekenen met Border blokken (twee for-loops)
 * - Bobby's hoofd aanmaken als SnakeBody in een LinkedList
 * - Bobby beweegt via dx en dy in act()
 * - tailCounter beperkt de grootte van de slang
 * - changeDirection() reageert op pijltjestoetsen
 * - dead eigenschap stopt het spel bij botsing
 * - Apple wordt willekeurig geplaatst
 * - Score bijhouden met Label (score bijhouden opdracht)
 * - Spel stopt na 10 appels (einde opdracht)
 */
public class SnakeWorld extends World
{
    // De slang is een lijst van SnakeBody objecten
    // Het LAATSTE element in de lijst is altijd het HOOFD
    private LinkedList<SnakeBody> snake = new LinkedList<SnakeBody>();

    // Bewegingsrichting: dx=1 betekent naar rechts starten
    private int dx = 1;
    private int dy = 0;

    // tailCounter: hoeveel elementen mogen nog toegevoegd worden
    private int tailCounter = 5;

    // dead: als true stopt het spel
    private boolean dead = false;

    // stepCounter: slang beweegt pas elke 5 frames zodat draaien goed werkt
    private int stepCounter = 0;
    private static final int MOVE_DELAY = 5;

    // Score bijhouden (opdracht: score bijhouden)
    private int score = 0;

    // Label voor de score (altijd zichtbaar bovenaan)
    private Label scoreLabel;

    /**
     * Constructor van SnakeWorld.
     * Wereld: 25 breed, 20 hoog, blokgrootte 32.
     * Achtergrond: bg.jpg
     */
    public SnakeWorld()
    {
        // Wereld aanmaken: 25 blokken breed, 20 blokken hoog, blokgrootte 32
        super(25, 20, 32);

        // Achtergrond instellen
        setBackground("bg.jpg");

        // Rand tekenen
        drawBorder();

        // Bobby's hoofd aanmaken en toevoegen
        SnakeBody head = new SnakeBody();
        snake.add(head);
        addObject(head, 2, 2);

        // Appel aanmaken op willekeurige positie (binnen de rand)
        Apple apple = new Apple();
        addObject(apple,
            Greenfoot.getRandomNumber(getWidth() - 2) + 1,
            Greenfoot.getRandomNumber(getHeight() - 2) + 1);

        // Score label aanmaken en toevoegen linksboven (opdracht: score bijhouden)
        scoreLabel = new Label(0, 26);
        addObject(scoreLabel, 6, 1);
    }

    /**
     * drawBorder() - tekent de rand rondom het speelveld.
     * 
     * Gebruikt twee for-loops:
     * 1. Horizontale randen: boven en onder
     * 2. Verticale randen: links en rechts
     */
    private void drawBorder()
    {
        // Horizontale randen: boven (y=0) en onder (y=getHeight()-1)
        for (int x = 0; x < getWidth(); x++)
        {
            addObject(new Border(), x, 0);
            addObject(new Border(), x, getHeight() - 1);
        }

        // Verticale randen: links (x=0) en rechts (x=getWidth()-1)
        for (int y = 1; y < getHeight() - 1; y++)
        {
            addObject(new Border(), 0, y);
            addObject(new Border(), getWidth() - 1, y);
        }
    }

    /**
     * act() - wordt voortdurend aangeroepen door Greenfoot.
     * 
     * Stopt direct als Bobby dood is.
     * Anders:
     * 1. Verander richting op basis van toetsen
     * 2. Beweeg de staart (of verklein tailCounter)
     * 3. Vervang het huidige hoofd door tail.png
     * 4. Controleer botsingen op de nieuwe positie
     * 5. Voeg het nieuwe hoofd toe
     */
    public void act()
    {
        // Als Bobby dood is: wacht op R toets om opnieuw te starten
        if (dead)
        {
            String key = Greenfoot.getKey();
            if (key != null && key.equals("r"))
            {
                Greenfoot.setWorld(new SnakeWorld());
            }
            return;
        }

        // Lees toetsinvoer ELKE frame zodat we nooit een toets missen
        changeDirection();

        // Beweeg de slang pas elke MOVE_DELAY frames
        stepCounter++;
        if (stepCounter < MOVE_DELAY)
        {
            return;
        }
        stepCounter = 0;

        // Beheer de staartlengte
        if (tailCounter == 0)
        {
            // Verwijder het eerste (oudste) element van de staart
            SnakeBody tail = snake.removeFirst();
            removeObject(tail);
        }
        else
        {
            // Slang mag nog groeien: verlaag de teller
            tailCounter--;
        }

        // Vervang het huidige hoofd door tail.png (wordt nu staart)
        snake.getLast().setImage("tail.png");

        // Bereken de positie van het nieuwe hoofd
        int newX = snake.getLast().getX() + dx;
        int newY = snake.getLast().getY() + dy;

        // Controleer botsingen VOOR het plaatsen van het nieuwe hoofd
        java.util.List<Block> blocks = getObjectsAt(newX, newY, Block.class);
        for (Block block : blocks)
        {
            block.collision(this);
        }

        // Als Bobby dood is na de botsingscheck: stop
        if (dead)
        {
            Greenfoot.playSound("dead.mp3");
            showText("GAME OVER!  Score: " + score + " / 10  |  Druk R om opnieuw te spelen", getWidth() / 2, getHeight() / 2);
            return;
        }

        // Nieuw hoofd aanmaken en toevoegen
        SnakeBody newHead = new SnakeBody();
        newHead.setImage("bobby.png");
        snake.add(newHead);
        addObject(newHead, newX, newY);
    }

    /**
     * changeDirection() - verandert de richting van Bobby op basis van pijltjestoetsen.
     * 
     * Bobby mag NIET naar zichzelf terugkeren:
     * - links: alleen als dx == 0 (Bobby beweegt niet horizontaal)
     * - rechts: alleen als dx == 0
     * - omhoog: alleen als dy == 0 (Bobby beweegt niet verticaal)
     * - omlaag: alleen als dy == 0
     */
    private void changeDirection()
    {
        // Gebruik getKey() - geeft de ingedrukte toets terug als String
        // Dit werkt betrouwbaarder dan isKeyDown() voor richtingsverandering
        String key = Greenfoot.getKey();

        if (key == null)
        {
            return; // geen toets ingedrukt
        }

        if (key.equals("left") && dx == 0)
        {
            dx = -1;
            dy = 0;
        }
        else if (key.equals("right") && dx == 0)
        {
            dx = 1;
            dy = 0;
        }
        else if (key.equals("up") && dy == 0)
        {
            dx = 0;
            dy = -1;
        }
        else if (key.equals("down") && dy == 0)
        {
            dx = 0;
            dy = 1;
        }
    }

    /**
     * dead() - stopt het spel door de dead eigenschap op true te zetten.
     * Wordt aangeroepen vanuit Block.collision()
     */
    public void dead()
    {
        dead = true;
    }

    /**
     * grow() - laat de slang groeien.
     * Wordt aangeroepen vanuit Apple.collision()
     * 
     * @param amount het aantal stukjes waarmee de slang groeit
     */
    public void grow(int amount)
    {
        tailCounter = tailCounter + amount;
    }

    /**
     * addScore() - verhoogt de score met 1 en update het Label.
     * Wordt aangeroepen vanuit Apple.collision() (opdracht: score bijhouden)
     * 
     * Als de score 10 bereikt: spel gewonnen! (opdracht: spel stoppen na 10 appels)
     */
    public void addScore()
    {
        score = score + 1;
        scoreLabel.setValue(score);

        // Opdracht: spel stoppen na het opeten van 10 appels
        if (score >= 10)
        {
            dead = true;
            showText("JE HEBT GEWONNEN!  Score: " + score + " / 10  |  Druk R om opnieuw te spelen", getWidth() / 2, getHeight() / 2);
        }
    }
}
