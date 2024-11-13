﻿// <auto-generated />
using System;
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
    [Migration("20241113154356_Changes")]
    partial class Changes
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("server.Entities.Damage", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("IndustrialFacilityId")
                        .HasColumnType("bigint")
                        .HasColumnName("industrial_facility_id");

                    b.Property<long>("PollutionId")
                        .HasColumnType("bigint")
                        .HasColumnName("pollution_id");

                    b.Property<float>("Result")
                        .HasColumnType("real")      
                        .HasColumnName("result");

                    b.Property<string>("Type")
                        .HasColumnType("text")
                        .HasColumnName("type");

                    b.Property<int>("Year")
                        .HasColumnType("integer")
                        .HasColumnName("year");

                    b.HasKey("Id");

                    b.HasIndex("IndustrialFacilityId");

                    b.HasIndex("PollutionId");

                    b.ToTable("damages");
                });

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

                    b.Property<int>("DangerClass")
                        .HasColumnType("integer")
                        .HasColumnName("danger_class");

                    b.Property<float>("EmissionsLimit")
                        .HasColumnType("real")
                        .HasColumnName("emissions_limit");

                    b.Property<float>("MassFlowRate")
                        .HasColumnType("real")
                        .HasColumnName("mass_flow_rate");

                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("pollutions");
                });

            modelBuilder.Entity("server.Entities.Report", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("IndustrialFacilityId")
                        .HasColumnType("bigint")
                        .HasColumnName("industrial_facility_id");

                    b.Property<long>("PollutionId")
                        .HasColumnType("bigint")
                        .HasColumnName("pollution_id");

                    b.Property<float?>("TaxAmount")
                        .HasColumnType("real")
                        .HasColumnName("tax_amount");

                    b.Property<float>("TaxRate")
                        .HasColumnType("real")
                        .HasColumnName("tax_rate");

                    b.Property<string>("TaxType")
                        .HasColumnType("text")
                        .HasColumnName("tax_type");

                    b.Property<float>("Volume")
                        .HasColumnType("real")
                        .HasColumnName("volume");

                    b.Property<int>("Year")
                        .HasColumnType("integer")
                        .HasColumnName("year");

                    b.HasKey("Id");

                    b.HasIndex("IndustrialFacilityId");

                    b.HasIndex("PollutionId");

                    b.ToTable("reports");
                });

            modelBuilder.Entity("server.Entities.Risk", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("CalculationType")
                        .HasColumnType("text")
                        .HasColumnName("calculation_type");

                    b.Property<float>("Result")
                        .HasColumnType("real")
                        .HasColumnName("result");

                    b.Property<string>("SubstanceName")
                        .HasColumnType("text")
                        .HasColumnName("substance_name");

                    b.HasKey("Id");

                    b.ToTable("risks");
                });

            modelBuilder.Entity("server.Entities.Damage", b =>
                {
                    b.HasOne("server.Entities.IndustrialFacility", "IndustrialFacility")
                        .WithMany()
                        .HasForeignKey("IndustrialFacilityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Entities.Pollution", "Pollution")
                        .WithMany()
                        .HasForeignKey("PollutionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("IndustrialFacility");

                    b.Navigation("Pollution");
                });

            modelBuilder.Entity("server.Entities.Report", b =>
                {
                    b.HasOne("server.Entities.IndustrialFacility", "IndustrialFacility")
                        .WithMany()
                        .HasForeignKey("IndustrialFacilityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Entities.Pollution", "Pollution")
                        .WithMany()
                        .HasForeignKey("PollutionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("IndustrialFacility");

                    b.Navigation("Pollution");
                });
#pragma warning restore 612, 618
        }
    }
}
