-- Ensure pgcrypto is available for bcrypt hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Seed default administrator if not exists
INSERT INTO "User" ("id", "nome", "email", "senha", "role", "revendaId", "telefone", "dataNasc", "refreshToken")
VALUES (
    'seed-admin-1',
    'Administrador',
    'admin@admin.com',
    crypt('123456', gen_salt('bf', 10)),
    'ADMIN',
    NULL,
    NULL,
    NULL,
    NULL
)
ON CONFLICT ("email") DO NOTHING;
