import sqlite3 from 'sqlite3';

interface ColumnDef {
  name: string;
  type: 'INTEGER' | 'TEXT' | 'TIMESTAMP' | 'BOOLEAN';
  constraint?: string;
}

export class SqliteRepository {
  private columns: ColumnDef[] = [];
}

export class SampleSqliteRepository extends SqliteRepository {
  private readonly columnsDef: ColumnDef[] = [];
}

const sampleSqliteRepository = new SampleSqliteRepository();
