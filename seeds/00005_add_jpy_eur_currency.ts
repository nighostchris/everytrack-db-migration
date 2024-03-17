import { Knex } from "knex";

const table = "currency";
const schema = "everytrack_backend";

export async function seed(knex: Knex): Promise<void> {
  const haveEurRecord = await knex(`${schema}.${table}`)
    .count("id", {
      as: "rows",
    })
    .where({ ticker: 'EUR' })
    .first();
  const haveJpyRecord = await knex(`${schema}.${table}`)
    .count("id", {
      as: "rows",
    })
    .where({ ticker: 'JPY' })
    .first();

  if ((haveEurRecord && Number(haveEurRecord.rows) > 0) === false) {
    await knex(`${schema}.${table}`).insert([
      { ticker: "EUR", symbol: "€" },
    ]);
  }

  if ((haveJpyRecord && Number(haveJpyRecord.rows) > 0) === false) {
    await knex(`${schema}.${table}`).insert([
      { ticker: "JPY", symbol: "¥" },
    ]);
  }
}
