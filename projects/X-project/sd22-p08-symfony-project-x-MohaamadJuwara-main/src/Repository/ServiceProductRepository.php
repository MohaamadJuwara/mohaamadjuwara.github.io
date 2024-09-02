<?php

namespace App\Repository;

use App\Entity\ServiceProduct;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ServiceProduct>
 *
 * @method ServiceProduct|null find($id, $lockMode = null, $lockVersion = null)
 * @method ServiceProduct|null findOneBy(array $criteria, array $orderBy = null)
 * @method ServiceProduct[]    findAll()
 * @method ServiceProduct[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ServiceProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ServiceProduct::class);
    }

//    /**
//     * @return ServiceProduct[] Returns an array of ServiceProduct objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ServiceProduct
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
