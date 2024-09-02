<?php

namespace App\Entity;

use App\Repository\SportCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SportCategoryRepository::class)]
class SportCategory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\ManyToMany(targetEntity: ServiceProduct::class, inversedBy: 'sportCategories')]
    private Collection $sport_category;

    public function __construct()
    {
        $this->sport_category = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(string $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, ServiceProduct>
     */
    public function getSportCategory(): Collection
    {
        return $this->sport_category;
    }

    public function addSportCategory(ServiceProduct $sportCategory): static
    {
        if (!$this->sport_category->contains($sportCategory)) {
            $this->sport_category->add($sportCategory);
        }

        return $this;
    }

    public function removeSportCategory(ServiceProduct $sportCategory): static
    {
        $this->sport_category->removeElement($sportCategory);

        return $this;
    }
}
