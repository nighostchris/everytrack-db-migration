# Everytrack DB Migration
[![Database Migration](https://github.com/nighostchris/everytrack-db-migration/actions/workflows/migrate.yaml/badge.svg)](https://github.com/nighostchris/everytrack-db-migration/actions/workflows/migrate.yaml)

Centralized repository for managing database migrations for Everytrack.

## Table of Contents

- [Local Environment Setup](#local-environment-setup)
  - [Postgres](#postgres)
  - [Migration](#migration)
- [Useful Commands](#useful-commands)
  - [pgcli](#pgcli)

## Local Environment Setup

### Postgres

```bash
# Setup local docker container
docker pull postgres:16.1
docker run -d -e POSTGRES_USER=everytrack -e POSTGRES_PASSWORD=everytrack -p 5432:5432 -v /var/lib/postgresql/data/everytrack:/var/lib/postgresql/data --name everytrack-pg postgres:16.1

# Access database in container
docker exec -it everytrack-pg bash
psql -U everytrack -d postgres
```

### Migration

```bash
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

# Export path to global golang executable bin directory
vim .zshrc
export PATH=$PATH:$HOME/go/bin

# Create new migration file
migrate create -ext sql -dir ./migrations -seq <migration_file_name>

# Run migration
migrate -path ./migrations -database "postgresql://everytrack:everytrack@127.0.0.1:5432/everytrack?sslmode=disable" up

# Rollback migration
migrate -path ./migrations -database "postgresql://everytrack:everytrack@127.0.0.1:5432/everytrack?sslmode=disable" down -all
```

## Useful Commands

### pgcli

We will be using a powerful cli tools to manage our postgres database - `pgcli`

```bash
brew install pgcli
vim ~/.config/pgcli/config

# A config file is automatically created at ~/.config/pgcli/config at first launch
# See the file itself for a description of all available options
# Add alias dsn config under the section like below
[alias_dsn]
# example_dsn = postgresql://[user[:password]@][netloc][:port][/dbname]
pgcli -D <name>
```
