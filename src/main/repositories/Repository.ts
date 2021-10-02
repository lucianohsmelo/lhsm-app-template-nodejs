interface Row {
  [column: string]: unknown;
}

interface Repository {
  select: () => Promise<void>;
  insert: (data: Row | Row[]) => Promise<void>;
}

const row: Row = {
  '2': 2,
};

console.log(row);
