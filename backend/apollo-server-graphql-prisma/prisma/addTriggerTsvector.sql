-- This is an empty migration.
-- ALTER TABLE "Item" ADD "tsvector" tsvector;
CREATE FUNCTION my_trigger_function()
RETURNS trigger AS 
$$
BEGIN
  NEW.tsvector := to_tsvector('spanish',  NEW.descripcion || ' ' || NEW."barcode" );
  RETURN NEW;
END $$ 
LANGUAGE 'plpgsql';
CREATE TRIGGER my_trigger
BEFORE INSERT ON "Item"
FOR EACH ROW
EXECUTE PROCEDURE my_trigger_function();
-- prisma dont support gin 
-- CREATE INDEX idx_fts_item ON "Item" USING gin(tsvector);