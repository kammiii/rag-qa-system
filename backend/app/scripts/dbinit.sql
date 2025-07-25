-- Create user
CREATE USER llb WITH ENCRYPTED PASSWORD 'llb';

-- Create main database
CREATE DATABASE llb OWNER llb;
GRANT ALL PRIVILEGES ON DATABASE llb TO llb;

-- Enable extensions on main db
\connect llb;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
GRANT ALL ON SCHEMA public TO llb;

-- Create test database
CREATE DATABASE llb_test OWNER llb;
GRANT ALL PRIVILEGES ON DATABASE llb_test TO llb;

-- Enable extensions on test db
\connect llb_test;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
GRANT ALL ON SCHEMA public TO llb;
