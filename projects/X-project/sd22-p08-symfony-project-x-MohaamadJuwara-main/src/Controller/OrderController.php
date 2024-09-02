<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\ServiceProduct;
use App\Form\OrderType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OrderController extends AbstractController
{
    #[Route('/order/{id}', name: 'app_order')]
    public function index(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $product = $entityManager->getRepository(ServiceProduct::class)->find($id);
        $form = $this->createForm(OrderType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $order = $form->getData();

            $extraPrice = 0;
            if ($order->getSize() === 'large') {
                $extraPrice = 4;
            } elseif ($order->getSize() === 'medium') {
                $extraPrice = 2;
            } elseif ($order->getSize() === 'small') {
                $extraPrice = -1;
            }

            // setting the price of the order ($order)

            //$order->setOrderPrice($product->getPrice() + $extraPrice);

            //$order->setProduct($product);

            $entityManager->persist($order);
            $entityManager->flush();

            $this->addFlash('success', 'Het order is toegevoegd');

            return $this->redirectToRoute('app_orders');

        }

        return $this->render('order/index.html.twig', [
            'product' => $product,
            'form' => $form
        ]);
    }

    #[Route('/orders/show', name: 'app_orders')]
    public function orders(EntityManagerInterface $entityManager, Request $request): Response
    {
        $orders = $entityManager->getRepository(Order::class)->findAll();
        return $this->render('order/show.html.twig', ['orders' => $orders]);
    }


    #[Route('/orders/show/edit', name: 'app_orders_edit')]
    public function edit(EntityManagerInterface $entityManager, Request $request): Response
    {
        $orders = $entityManager->getRepository(Order::class)->findAll();

        return $this->render('order/edit.html.twig', ['orders' => $orders]);
    }

    //
    #[Route('/orders/show/delete/{order}', name: 'app_delete_order')]
    public function delete(EntityManagerInterface $entityManager, Order $order): Response
    {
        $entityManager->remove($order);
        $entityManager->flush();

        $this->addFlash('danger', 'De bestelling is gewist.');

        return $this->redirectToRoute('app_orders_edit');
    }

    //update
    #[Route('/orders/show/update/{order}', name: 'app_update_order')]
    public function update(EntityManagerInterface $entityManager, Request $request, Order $order): Response
    {
        $orderForm = $this->createForm(OrderType::class, $order);
        $orderForm->handleRequest($request);

        if ($orderForm->isSubmitted() && $orderForm->isValid()) {
            $entityManager->persist($order);

            $entityManager->flush();

            $this->addFlash('danger', 'the order has been update.');

            return $this->redirectToRoute('app_orders_edit');
        }

        return $this->render('order/update.html.twig', ['orderForm' => $orderForm]);
    }


}

