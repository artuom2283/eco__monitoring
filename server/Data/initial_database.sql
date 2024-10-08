-- Додаємо виробництва
INSERT INTO industrial_facilities(name) VALUES ('ПАТ «АрселорМіттал Кривий Ріг»');
INSERT INTO industrial_facilities(name) VALUES ('АТ «Південний гірничо - збагачувальний комбінат»');
INSERT INTO industrial_facilities(name) VALUES ('ДТЕК «Придніпровська ТЕС»');

-- Додаємо забруднювачі
INSERT INTO pollutions(name, mass_flow_rate, emissions_limit, danger_class) VALUES ('Оксид азоту', 5000, 500, 4);
INSERT INTO pollutions(name, mass_flow_rate, emissions_limit, danger_class) VALUES ('Сірки діоксид', 5000, 500, 4);
INSERT INTO pollutions(name, mass_flow_rate, emissions_limit, danger_class) VALUES ('Оксид вуглецю', 5000, 250, 4);
INSERT INTO pollutions(name, mass_flow_rate, emissions_limit, danger_class) VALUES ('Речовини у вигляді суспендованих твердих частинок ', 500, 50, 0);


-- Звіти 
-- 2023 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 1, 2023, 2392, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 2, 2023, 8458, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 3, 2023, 45663, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 4, 2023, 6859, 628.32, 'Викиди в атмосферне повітря');

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 1, 2023, 3.619, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 2, 2023, 0.002, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 3, 2023, 5.570, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 4, 2023, 488.289, 628.32, 'Викиди в атмосферне повітря');

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 1, 2023, 3619.221, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 2, 2023, 21307.42, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 3, 2023, 257.321, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 4, 2023, 1750.541, 628.32, 'Викиди в атмосферне повітря');


-- 2021 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 1, 2021, 8870, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 2, 2021, 10110, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 3, 2021, 167965, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 4, 2021, 23012, 628.32, 'Викиди в атмосферне повітря');

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 1, 2021, 0.81, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 2, 2021, 0.001, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 3, 2021, 1.24, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 4, 2021, 97.44, 628.32, 'Викиди в атмосферне повітря');

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 1, 2021, 2209.905, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 2, 2021, 12548.820, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 3, 2021, 148.094, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 4, 2021, 185.779, 628.32, 'Викиди в атмосферне повітря');

-- 2020 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 1, 2020, 8045, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 2, 2020, 8458, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 3, 2020, 170465, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 4, 2020, 20801, 628.32, 'Викиди в атмосферне повітря');

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 1, 2020, 10.643, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 2, 2020, 0.048, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 3, 2020, 14.935, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 4, 2020, 1189.677, 628.32, 'Викиди в атмосферне повітря');

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 1, 2020, 2873.940, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 2, 2020, 15441.612, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 3, 2020, 183.072, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 4, 2020, 948.543, 628.32, 'Викиди в атмосферне повітря');


-- 2016 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 1, 2016, 8142.6, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 2, 2016, 4412.51, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 3, 2016, 74241.13, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 4, 2016, 26642.92, 628.32, 'Викиди в атмосферне повітря');

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 1, 2016, 6890.005, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 2, 2016, 1526.320, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 3, 2016, 31958.568, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 4, 2016, 5209.572, 628.32, 'Викиди в атмосферне повітря');

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 1, 2016, 9624.774, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 2, 2016, 44185.922, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 3, 2016, 380.706, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 4, 2016, 6121.001, 628.32, 'Викиди в атмосферне повітря');

-- 2015 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 1, 2015, 7714.23, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 2, 2015, 4439.586, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 3, 2015, 72742.554, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (1, 4, 2015, 23092.82, 628.32, 'Викиди в атмосферне повітря');

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 1, 2015, 5348.418, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 2, 2015, 1183.239, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 3, 2015, 24778.208, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (2, 4, 2015, 4261.923, 628.32, 'Викиди в атмосферне повітря');

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 1, 2015, 5776.138, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 2, 2015, 22191.059, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 3, 2015, 222.702, 145.50, 'Викиди в атмосферне повітря');

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type)
VALUES (3, 4, 2015, 4702.115, 628.32, 'Викиди в атмосферне повітря');