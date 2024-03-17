import { Knex } from "knex";

const schema = "everytrack_backend";
const table = "stock";

export async function seed(knex: Knex): Promise<void> {
  const haveVusaRecord = await knex(`${schema}.${table}`)
    .count("id", {
      as: "rows",
    })
    .where({ ticker: 'VUSA.L' })
    .first();

  if ((haveVusaRecord && Number(haveVusaRecord.rows) > 0) === false) {
    const currencies: { id: string; ticker: string }[] = await knex(
      `${schema}.currency`
    ).select("id", "ticker");
    const currenciesMap: any = {};
    currencies.forEach((currency) => {
      currenciesMap[currency.ticker] = currency.id;
    });

    const countries: { id: string; code: string }[] = await knex(
      `${schema}.country`
    ).select("id", "code");
    const countriesMap: any = {};
    countries.forEach((country) => {
      countriesMap[country.code] = country.id;
    });

    await knex(`${schema}.${table}`).insert([
      {
        country_id: countriesMap["UK"],
        currency_id: currenciesMap["GBP"],
        name: "Vanguard S&P 500 UCITS ETF",
        ticker: "VUSA.L",
        current_price: "16.04",
      },
    ]);
  }
}
