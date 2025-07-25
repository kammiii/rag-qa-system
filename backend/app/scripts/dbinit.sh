#!/bin/bash

# Script to initialize local postgres DB for ChatDeutsch

set -e

echo "🚀 Initializing Postgres DB (llb and llb_test)..."

sudo -u postgres psql -f backend/scripts/dbinit.sql

echo "✅ Databases created and extensions enabled."
