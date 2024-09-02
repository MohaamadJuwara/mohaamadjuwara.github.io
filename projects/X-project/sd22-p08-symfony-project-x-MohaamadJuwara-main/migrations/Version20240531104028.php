<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240531104028 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE sport_category_service_product (sport_category_id INT NOT NULL, service_product_id INT NOT NULL, INDEX IDX_9A790B77173D9A4 (sport_category_id), INDEX IDX_9A790B7D3D55FEE (service_product_id), PRIMARY KEY(sport_category_id, service_product_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE sport_category_service_product ADD CONSTRAINT FK_9A790B77173D9A4 FOREIGN KEY (sport_category_id) REFERENCES sport_category (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE sport_category_service_product ADD CONSTRAINT FK_9A790B7D3D55FEE FOREIGN KEY (service_product_id) REFERENCES service_product (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sport_category_service_product DROP FOREIGN KEY FK_9A790B77173D9A4');
        $this->addSql('ALTER TABLE sport_category_service_product DROP FOREIGN KEY FK_9A790B7D3D55FEE');
        $this->addSql('DROP TABLE sport_category_service_product');
    }
}
