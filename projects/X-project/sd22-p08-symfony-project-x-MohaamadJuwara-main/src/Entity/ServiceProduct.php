<?php

namespace App\Entity;

use App\Repository\ServiceProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ServiceProductRepository::class)]
class ServiceProduct
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    #[ORM\Column]
    private ?int $price = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\ManyToMany(targetEntity: SportCategory::class, mappedBy: 'sport_category')]
    private Collection $sportCategories;

    public function __construct()
    {
        $this->sportCategories = new ArrayCollection();
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

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

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
     * @return Collection<int, SportCategory>
     */
    public function getSportCategories(): Collection
    {
        return $this->sportCategories;
    }

    public function addSportCategory(SportCategory $sportCategory): static
    {
        if (!$this->sportCategories->contains($sportCategory)) {
            $this->sportCategories->add($sportCategory);
            $sportCategory->addSportCategory($this);
        }

        return $this;
    }

    public function removeSportCategory(SportCategory $sportCategory): static
    {
        if ($this->sportCategories->removeElement($sportCategory)) {
            $sportCategory->removeSportCategory($this);
        }

        return $this;
    }
}
