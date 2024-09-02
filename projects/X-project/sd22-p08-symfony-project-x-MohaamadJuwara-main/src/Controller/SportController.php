<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\SportCategory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SportController extends AbstractController
{
    #[Route('/', name: 'app_sport')]
    public function index(EntityManagerInterface $entityManager): Response
    {

        if ($this->isGranted('ROLE_USER')){
            return $this->render('role/user.html.twig');
        }
        if ($this->isGranted('ROLE_EMPLOYEE')){
            return $this->render('role/employee.html.twig');
        }
        if ($this->isGranted('ROLE_ADMIN')){
            return $this->render('role/admin.html.twig');
        }

       $categories = $entityManager->getRepository(SportCategory::class)->findAll();
        return $this->render('sport/index.html.twig', [
            'categories' => $categories,
        ]);
    }


    #[Route('/sport/product/{id}', name: 'app_category_products')]
    public function product(EntityManagerInterface $entityManager, $id): Response
    {
        $category = $entityManager->getRepository(SportCategory::class)->find($id);
        return $this->render('sport/categorydex.html.twig', [
            'category' => $category,
        ]);
    }


    #[Route('/sport/category/{id}', name: 'app_category_show')]
    public function show(EntityManagerInterface $entityManager,  $id): Response
    {
        //Get all the categories
        $cat = $entityManager->getRepository(Category::class)->find($id);


        //Return the view with the categories
        return $this->render('sport/products.html.twig', [
            'category' => $cat,
        ]);
    }


    //
    #[Route('//product', name: 'app_product')]
    public function indexProduct(EntityManagerInterface $entityManager): Response
    {
        $categories = $entityManager->getRepository(SportCategory::class)->findAll();
        return $this->render('sport/index.html.twig', [
            'categories' => $categories,
        ]);
    }



}
