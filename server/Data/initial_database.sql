CREATE TABLE tax_sum_amount (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
facility_name VARCHAR(255) NOT NULL,
year INTEGER NOT NULL,
total_tax_amount REAL,
UNIQUE (facility_name, year)
);

CREATE OR REPLACE FUNCTION update_tax_sum()
RETURNS TRIGGER AS $$
DECLARE
facility_name_record VARCHAR(255);
BEGIN
SELECT name INTO facility_name_record
FROM industrial_facilities
WHERE id = NEW.industrial_facility_id;

IF EXISTS (SELECT 1 FROM tax_sum_amount WHERE facility_name = facility_name_record AND year = NEW.year) THEN
UPDATE tax_sum_amount
SET total_tax_amount = total_tax_amount + NEW.tax_amount
WHERE facility_name = facility_name_record AND year = NEW.year;
ELSE
        INSERT INTO tax_sum_amount (facility_name, year, total_tax_amount)
        VALUES (facility_name_record, NEW.year, NEW.tax_amount);
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
   
CREATE OR REPLACE FUNCTION update_tax_sum_on_delete()
RETURNS TRIGGER AS $$
DECLARE
facility_name_record VARCHAR(255);
BEGIN
SELECT name INTO facility_name_record
FROM industrial_facilities
WHERE id = OLD.industrial_facility_id;

IF EXISTS (SELECT 1 FROM tax_sum_amount WHERE facility_name = facility_name_record AND year = OLD.year) THEN
UPDATE tax_sum_amount
SET total_tax_amount = total_tax_amount - OLD.tax_amount
WHERE facility_name = facility_name_record AND year = OLD.year;
END IF;

RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER Reports_Insert_TaxSum_Trigger
    AFTER INSERT ON reports
    FOR EACH ROW
    EXECUTE FUNCTION update_tax_sum();

CREATE TRIGGER Reports_Delete_TaxSum_Trigger
    AFTER DELETE ON reports
    FOR EACH ROW
    EXECUTE FUNCTION update_tax_sum_on_delete();

-- Додаємо виробництва
INSERT INTO industrial_facilities(name) VALUES ('ПАТ «АрселорМіттал Кривий Ріг»');
INSERT INTO industrial_facilities(name) VALUES ('АТ «Південний гірничо - збагачувальний комбінат»');
INSERT INTO industrial_facilities(name) VALUES ('ДТЕК «Придніпровська ТЕС»');

-- Додаємо забруднювачі
INSERT INTO pollutions(name, mass_flow_rate, emissions_limit, danger_class, specific_emissions, hazard_class_coefficient, hazard_coefficient) VALUES ('Оксид азоту', 5000, 500, 4,0.014, 2, 3);
INSERT INTO pollutions(name, mass_flow_rate, emissions_limit, danger_class, specific_emissions, hazard_class_coefficient, hazard_coefficient) VALUES ('Сірки діоксид', 5000, 500, 4, 0.0000016, 2, 3);
INSERT INTO pollutions(name, mass_flow_rate, emissions_limit, danger_class, specific_emissions, hazard_class_coefficient, hazard_coefficient) VALUES ('Оксид вуглецю', 5000, 250, 4, 0.0063, 2, 4);
INSERT INTO pollutions(name, mass_flow_rate, emissions_limit, danger_class, specific_emissions, hazard_class_coefficient, hazard_coefficient) VALUES ('Речовини у вигляді суспендованих твердих частинок', 500, 50, 0, 0.000003, 3, 1.5);

-- Звіти 
-- 2023 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 1, 2023, 2392, 145.50, 'Викиди в атмосферне повітря', 1044108);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 2, 2023, 8458, 145.50, 'Викиди в атмосферне повітря', 3691917);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 3, 2023, 45663, 145.50, 'Викиди в атмосферне повітря', 19931899.5);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 4, 2023, 6859, 628.32, 'Викиди в атмосферне повітря', 12928940.64);

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 1, 2023, 3.619, 145.50, 'Викиди в атмосферне повітря', 1579.6935);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 2, 2023, 0.002, 145.50, 'Викиди в атмосферне повітря', 0.873);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 3, 2023, 5.570, 145.50, 'Викиди в атмосферне повітря', 2431.305);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 4, 2023, 488.289, 628.32, 'Викиди в атмосферне повітря', 920405.23344);

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 1, 2023, 3619.221, 145.50, 'Викиди в атмосферне повітря', 1579789.9665);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 2, 2023, 21307.42, 145.50, 'Викиди в атмосферне повітря', 9300688.83);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 3, 2023, 257.321, 145.50, 'Викиди в атмосферне повітря', 112320.6165);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 4, 2023, 1750.541, 628.32, 'Викиди в атмосферне повітря', 3299699.76336);


-- 2021 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 1, 2021, 8870, 145.50, 'Викиди в атмосферне повітря', 3871755);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 2, 2021, 10110, 145.50, 'Викиди в атмосферне повітря', 4413015);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 3, 2021, 167965, 145.50, 'Викиди в атмосферне повітря', 73316722.5);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 4, 2021, 23012, 628.32, 'Викиди в атмосферне повітря', 43376699.52);

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 1, 2021, 0.81, 145.50, 'Викиди в атмосферне повітря', 353.565);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 2, 2021, 0.001, 145.50, 'Викиди в атмосферне повітря', 0.4365);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 3, 2021, 1.24, 145.50, 'Викиди в атмосферне повітря', 541.26);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 4, 2021, 97.44, 628.32, 'Викиди в атмосферне повітря', 183670.5024);

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 1, 2021, 2209.905, 145.50, 'Викиди в атмосферне повітря', 964623.5325);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 2, 2021, 12548.820, 145.50, 'Викиди в атмосферне повітря',5477559.93);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 3, 2021, 148.094, 145.50, 'Викиди в атмосферне повітря', 64643.031);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 4, 2021, 185.779, 628.32, 'Викиди в атмосферне повітря', 350185.98384);

-- 2020 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 1, 2020, 8045, 145.50, 'Викиди в атмосферне повітря', 3511642.5);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 2, 2020, 8458, 145.50, 'Викиди в атмосферне повітря', 3691917);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 3, 2020, 170465, 145.50, 'Викиди в атмосферне повітря', 74407972.5);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 4, 2020, 20801, 628.32, 'Викиди в атмосферне повітря', 39209052.96);

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 1, 2020, 10.643, 145.50, 'Викиди в атмосферне повітря', 4645.6695);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 2, 2020, 0.048, 145.50, 'Викиди в атмосферне повітря', 20.952);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 3, 2020, 14.935, 145.50, 'Викиди в атмосферне повітря', 6519.1275);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 4, 2020, 1189.677, 628.32, 'Викиди в атмосферне повітря', 2242493.55792);

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 1, 2020, 2873.940, 145.50, 'Викиди в атмосферне повітря', 1254474.81);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 2, 2020, 15441.612, 145.50, 'Викиди в атмосферне повітря', 6740263.638);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 3, 2020, 183.072, 145.50, 'Викиди в атмосферне повітря', 79910.928);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 4, 2020, 948.543, 628.32, 'Викиди в атмосферне повітря', 1787965.61328);


-- 2016 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 1, 2016, 8142.6, 145.50, 'Викиди в атмосферне повітря', 3554244.9);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 2, 2016, 4412.51, 145.50, 'Викиди в атмосферне повітря', 1926060.615);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 3, 2016, 74241.13, 145.50, 'Викиди в атмосферне повітря', 32406253.245);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 4, 2016, 26642.92, 628.32, 'Викиди в атмосферне повітря', 50220838.4832);

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 1, 2016, 6890.005, 145.50, 'Викиди в атмосферне повітря', 3007487.1825);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 2, 2016, 1526.320, 145.50, 'Викиди в атмосферне повітря', 666238.68);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 3, 2016, 31958.568, 145.50, 'Викиди в атмосферне повітря', 13949914.932);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 4, 2016, 5209.572, 628.32, 'Викиди в атмосферне повітря', 9819834.83712);

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 1, 2016, 9624.774, 145.50, 'Викиди в атмосферне повітря', 4201213.851);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 2, 2016, 44185.922, 145.50, 'Викиди в атмосферне повітря', 19287154.953);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 3, 2016, 380.706, 145.50, 'Викиди в атмосферне повітря', 166178.169);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 4, 2016, 6121.001, 628.32, 'Викиди в атмосферне повітря', 11537842.04496);

-- 2015 рік
-- ПАТ «АрселорМіттал Кривий Ріг»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 1, 2015, 7714.23, 145.50, 'Викиди в атмосферне повітря', 3367261.395);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 2, 2015, 4439.586, 145.50, 'Викиди в атмосферне повітря', 1937879.289);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 3, 2015, 72742.554, 145.50, 'Викиди в атмосферне повітря', 31752124.821);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (1, 4, 2015, 23092.82, 628.32, 'Викиди в атмосферне повітря', 43529041.9872);

-- АТ «Південний гірничо - збагачувальний комбінат»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 1, 2015, 5348.418, 145.50, 'Викиди в атмосферне повітря', 2334584.457);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 2, 2015, 1183.239, 145.50, 'Викиди в атмосферне повітря', 516483.8235);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 3, 2015, 24778.208, 145.50, 'Викиди в атмосферне повітря', 10815687.792);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (2, 4, 2015, 4261.923, 628.32, 'Викиди в атмосферне повітря', 8033554.37808);

-- ДТЕК «Придніпровська ТЕС»
INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 1, 2015, 5776.138, 145.50, 'Викиди в атмосферне повітря', 2521284.237);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 2, 2015, 22191.059, 145.50, 'Викиди в атмосферне повітря', 9686397.2535);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 3, 2015, 222.702, 145.50, 'Викиди в атмосферне повітря', 97209.423);

INSERT INTO reports(industrial_facility_id, pollution_id, year, volume, tax_rate, tax_type, tax_amount)
VALUES (3, 4, 2015, 4702.115, 628.32, 'Викиди в атмосферне повітря', 8863298.6904);