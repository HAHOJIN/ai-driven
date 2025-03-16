-- 테이블 정보 확인
SELECT 
    table_name, 
    column_name, 
    data_type, 
    udt_name
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public'
    AND table_name = 'images';

-- style 컬럼의 타입 확인
SELECT 
    pg_typeof(style) 
FROM 
    images 
LIMIT 1;

-- enum 타입 정보 확인
SELECT 
    t.typname AS enum_name,
    e.enumlabel AS enum_value
FROM 
    pg_type t 
    JOIN pg_enum e ON t.oid = e.enumtypid 
    JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
WHERE 
    n.nspname = 'public'; 