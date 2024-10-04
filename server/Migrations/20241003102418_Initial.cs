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
                    mass_flow_rate = table.Column<float>(type: "real", nullable: false),
                    danger_class = table.Column<int>(type: "integer", nullable: false),
                    emissions_limit = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pollutions", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "reports",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    industrial_facility_id = table.Column<long>(type: "bigint", nullable: false),
                    pollution_id = table.Column<long>(type: "bigint", nullable: false),
                    year = table.Column<int>(type: "integer", nullable: false),
                    volume = table.Column<float>(type: "real", nullable: false),
                    water_tax = table.Column<float>(type: "real", nullable: true),
                    air_tax = table.Column<float>(type: "real", nullable: true),
                    total_tax = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reports", x => x.id);
                    table.ForeignKey(
                        name: "FK_reports_industrial_facilities_industrial_facility_id",
                        column: x => x.industrial_facility_id,
                        principalTable: "industrial_facilities",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_reports_pollutions_pollution_id",
                        column: x => x.pollution_id,
                        principalTable: "pollutions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_reports_industrial_facility_id",
                table: "reports",
                column: "industrial_facility_id");

            migrationBuilder.CreateIndex(
                name: "IX_reports_pollution_id",
                table: "reports",
                column: "pollution_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "reports");

            migrationBuilder.DropTable(
                name: "industrial_facilities");

            migrationBuilder.DropTable(
                name: "pollutions");
        }
    }
}
