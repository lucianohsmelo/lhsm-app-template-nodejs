import { Client, QueryResult } from 'pg';

export class PgRepository implements Repository {
  private readonly client: Client;

  constructor() {
    this.client = new Client();
  }
  async select(): Promise<void> {
    this.client.query('', (err, res) => {
      console.log(res);
    });
  }

  async insert(data: Row | Row[]): Promise<void> {
    this.client.query('', []);
  }
}

const pgRepository = new PgRepository();

pgRepository.insert({ 2: 2 });
