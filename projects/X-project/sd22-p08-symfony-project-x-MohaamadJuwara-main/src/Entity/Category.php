<?php




namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\Session;

class CategoryController extends AbstractController
{
    /*
     * Route to show the pizza's in a certain category
     */
    #[Route('/category/{category}', name: 'app_category_products')]
    public function show(EntityManagerInterface $entityManager, $category): Response
    {
        //Get all the categories
        $cat = $entityManager->getRepository(Category::class)->find($category);

        //Return the view with the categories
        return $this->render('category/products.html.twig', [
            'category' => $cat,
        ]);
    }
}
