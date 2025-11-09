#!/bin/bash
# =========================================
# Café Fausse - Automatic PostgreSQL Backup
# =========================================

# Configuration
DB_NAME="cafe_fausse"
DB_USER="postgres"
BACKUP_DIR="$HOME/Quantic/cafe-fausse/backups"
DATE=$(date +'%Y-%m-%d_%H-%M-%S')
FILE_NAME="${DB_NAME}_backup_${DATE}.sql"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Perform the backup
pg_dump -U $DB_USER -d $DB_NAME > "${BACKUP_DIR}/${FILE_NAME}"

# Optional: compress the backup (saves space)
gzip "${BACKUP_DIR}/${FILE_NAME}"

# Optional: delete backups older than 7 days
find "$BACKUP_DIR" -type f -name "*.gz" -mtime +7 -exec rm {} \;

echo "✅ Backup complete: ${FILE_NAME}.gz"
