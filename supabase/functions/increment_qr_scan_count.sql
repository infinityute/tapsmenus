CREATE OR REPLACE FUNCTION increment_qr_scan_count(p_menu_id UUID, p_table_number TEXT DEFAULT NULL, p_location TEXT DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE qr_codes
  SET 
    scan_count = COALESCE(scan_count, 0) + 1,
    last_scanned_at = NOW()
  WHERE 
    menu_id = p_menu_id
    AND (
      (p_table_number IS NULL AND table_number IS NULL)
      OR table_number = p_table_number
    )
    AND (
      (p_location IS NULL AND location IS NULL)
      OR location = p_location
    );
END;
$$;