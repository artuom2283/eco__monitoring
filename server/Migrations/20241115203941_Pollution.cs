using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class Pollution : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "hazard_class_coefficient",
                table: "pollutions",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "hazard_coefficient",
                table: "pollutions",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "specific_emissions",
                table: "pollutions",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "hazard_class_coefficient",
                table: "pollutions");

            migrationBuilder.DropColumn(
                name: "hazard_coefficient",
                table: "pollutions");

            migrationBuilder.DropColumn(
                name: "specific_emissions",
                table: "pollutions");
        }
    }
}
