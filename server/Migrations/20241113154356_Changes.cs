using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class Changes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "industrial_facility_id",
                table: "damages",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "pollution_id",
                table: "damages",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<int>(
                name: "year",
                table: "damages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_damages_industrial_facility_id",
                table: "damages",
                column: "industrial_facility_id");

            migrationBuilder.CreateIndex(
                name: "IX_damages_pollution_id",
                table: "damages",
                column: "pollution_id");

            migrationBuilder.AddForeignKey(
                name: "FK_damages_industrial_facilities_industrial_facility_id",
                table: "damages",
                column: "industrial_facility_id",
                principalTable: "industrial_facilities",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_damages_pollutions_pollution_id",
                table: "damages",
                column: "pollution_id",
                principalTable: "pollutions",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_damages_industrial_facilities_industrial_facility_id",
                table: "damages");

            migrationBuilder.DropForeignKey(
                name: "FK_damages_pollutions_pollution_id",
                table: "damages");

            migrationBuilder.DropIndex(
                name: "IX_damages_industrial_facility_id",
                table: "damages");

            migrationBuilder.DropIndex(
                name: "IX_damages_pollution_id",
                table: "damages");

            migrationBuilder.DropColumn(
                name: "industrial_facility_id",
                table: "damages");

            migrationBuilder.DropColumn(
                name: "pollution_id",
                table: "damages");

            migrationBuilder.DropColumn(
                name: "year",
                table: "damages");
            
        }
    }
}
