import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1726507153669 implements MigrationInterface {
  name = 'Migration1726507153669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users"
                             (
                                 "id"        uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                 "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updatedAt" TIMESTAMP                  DEFAULT now(),
                                 "deletedAt" TIMESTAMP,
                                 "username"  character varying NOT NULL,
                                 "password"  character varying NOT NULL,
                                 CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
