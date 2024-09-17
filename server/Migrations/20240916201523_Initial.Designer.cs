﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using server.Data;

#nullable disable

namespace server.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20240916201523_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("server.Entities.IndustrialFacility", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("industrial_facilities");
                });

            modelBuilder.Entity("server.Entities.Pollution", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<float>("EmissionsLimit")
                        .HasColumnType("real")
                        .HasColumnName("emissions_limit");

                    b.Property<long>("IndustrialFacilityId")
                        .HasColumnType("bigint")
                        .HasColumnName("industrial_facility_id");

                    b.Property<float>("MassFlowRate")
                        .HasColumnType("real")
                        .HasColumnName("mass_flow_rate");

                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<float>("Tax")
                        .HasColumnType("real")
                        .HasColumnName("tax");

                    b.Property<float>("Volume")
                        .HasColumnType("real")
                        .HasColumnName("volume");

                    b.HasKey("Id");

                    b.HasIndex("IndustrialFacilityId");

                    b.ToTable("pollutions");
                });

            modelBuilder.Entity("server.Entities.Pollution", b =>
                {
                    b.HasOne("server.Entities.IndustrialFacility", "IndustrialFacility")
                        .WithMany("Pollutions")
                        .HasForeignKey("IndustrialFacilityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("IndustrialFacility");
                });

            modelBuilder.Entity("server.Entities.IndustrialFacility", b =>
                {
                    b.Navigation("Pollutions");
                });
#pragma warning restore 612, 618
        }
    }
}
