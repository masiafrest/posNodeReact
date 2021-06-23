-- This is an empty migration.
-- ALTER TABLE "Item" ADD "tsvector" tsvector;
CREATE FUNCTION my_trigger_function()
RETURNS trigger AS 
$$
BEGIN
  NEW.tsvector := to_tsvector('spanish', NEW."marca" || ' ' || NEW.modelo || ' ' || NEW.descripcion || ' ' || NEW."barcode" || ' ' || NEW."sku");
  RETURN NEW;
END $$ 
LANGUAGE 'plpgsql';
CREATE TRIGGER my_trigger
BEFORE INSERT ON "Item"
FOR EACH ROW
EXECUTE PROCEDURE my_trigger_function();
CREATE INDEX idx_fts_item ON "Item" USING gin(tsvector);