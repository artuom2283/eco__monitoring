using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "industrial_facilities",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_industrial_facilities", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "pollutions",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true),
                    volume = table.Column<float>(type: "real", nullable: false),
                    tax = table.Column<float>(type: "real", nullable: false),
                    mass_flow_rate = table.Column<float>(type: "real", nullable: false),
                    emissions_limit = table.Column<float>(type: "real", nullable: false),
                    industrial_facility_id = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pollutions", x => x.id);
                    table.ForeignKey(
                        name: "FK_pollutions_industrial_facilities_industrial_facility_id",
                        column: x => x.industrial_facility_id,
                        principalTable: "industrial_facilities",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_pollutions_industrial_facility_id",
                table: "pollutions",
                column: "industrial_facility_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "pollutions");

            migrationBuilder.DropTable(
                name: "industrial_facilities");
        }
    }
}
