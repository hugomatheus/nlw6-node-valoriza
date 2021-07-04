import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1624576604868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    }, 
                    {
                        name: "admin",
                        type: "boolean",
                        default: false
                    }, 
                    {
                        name: "created_at",
                        type: "timestamp",
                        default:"now()"
                    }, 
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default:"now()" 
                    }
                ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
