import { Knex } from "knex";

const schema = "everytrack_backend";
const table = "asset_provider";

export async function seed(knex: Knex): Promise<void> {
    const countries: { id: string; code: string }[] = await knex(
        `${schema}.country`
      ).select("id", "code");
      const countriesMap: any = {};
      countries.forEach((country) => {
        countriesMap[country.code] = country.id;
      });

  const haveTrading212Record = await knex(`${schema}.${table}`)
    .count("id", {
      as: "rows",
    })
    .where({ name: 'Trading 212', country_id: countriesMap['UK'] })
    .first();

  if ((haveTrading212Record && Number(haveTrading212Record.rows) > 0) === false) {
    await knex(`${schema}.${table}`).insert([
      {
        name: "Trading 212",
        icon: "/trading_212_uk.svg",
        type: "broker",
        country_id: countriesMap["UK"],
      },
    ]);
  }
}
