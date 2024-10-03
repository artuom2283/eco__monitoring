-- Додаємо виробництва
INSERT INTO industrial_facilities(name) VALUES ('ПАТ «АрселорМіттал Кривий Ріг»');
INSERT INTO industrial_facilities(name) VALUES ('АТ «Південний гірничо - збагачувальний комбінат»');
INSERT INTO industrial_facilities(name) VALUES ('ДТЕК «Придніпровська ТЕС»');

-- Додаємо забруднювачі
INSERT INTO pollutions(name, mass_flow_rate, emissions_limit) VALUES ('Оксид азоту', 5000, 500);
INSERT INTO pollutions(name, mass_flow_rate, emissions_limit) VALUES ('Сірки діоксид', 5000, 500);
INSERT INTO pollutions(name, mass_flow_rate, emissions_limit) VALUES ('Оксид вуглецю', 5000, 250);
INSERT INTO pollutions(name, mass_flow_rate, emissions_limit) VALUES ('Речовини у вигляді суспендованих твердих частинок ', 500, 50);


-- Звіти 
-- 2023 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 1, 2023, 2392);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 2, 2023, 8458);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 3, 2023, 45663);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 4, 2023, 6859);

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 1, 2023, 3.619);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 2, 2023, 0.002);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 3, 2023, 5.570);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 4, 2023, 488.289);

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 1, 2023, 3619.221);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 2, 2023, 21307.42);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 3, 2023, 257.321);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 4, 2023, 1750.541);


-- 2021 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 1, 2021, 8870);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 2, 2021, 10110);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 3, 2021, 167965);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 4, 2021, 23012);

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 1, 2021, 0.81);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 2, 2021, 0.001);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 3, 2021, 1.24);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 4, 2021, 97.44);

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 1, 2021, 2209.905);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 2, 2021, 12548.820);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 3, 2021, 148.094);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 4, 2021, 185.779);

-- 2020 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 1, 2020, 8045);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 2, 2020, 8458);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 3, 2020, 170465);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 4, 2020, 20801);

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 1, 2020, 10.643);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 2, 2020, 0.048);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 3, 2020, 14.935);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 4, 2020, 1189.677);

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 1, 2020, 2873.940);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 2, 2020, 15441.612);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 3, 2020, 183.072);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 4, 2020, 948.543);


-- 2016 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 1, 2016, 8142.6);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 2, 2016, 4412.51);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 3, 2016, 74241.13);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 4, 2016, 26642.92);

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 1, 2016, 6890.005);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 2, 2016, 1526.320);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 3, 2016, 31958.568);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 4, 2016, 5209.572);

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 1, 2016, 9624.774);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 2, 2016, 44185.922);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 3, 2016, 380.706);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 4, 2016, 6121.001);

-- 2015 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 1, 2015, 7714.23);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 2, 2015, 4439.586);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 3, 2015, 72742.554);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (1, 4, 2015, 23092.82);

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 1, 2015, 5348.418);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 2, 2015, 1183.239);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 3, 2015, 24778.208);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (2, 4, 2015, 4261.923);

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 1, 2015, 5776.138);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 2, 2015, 22191.059);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 3, 2015, 222.702);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume)
VALUES (3, 4, 2015, 4702.115);