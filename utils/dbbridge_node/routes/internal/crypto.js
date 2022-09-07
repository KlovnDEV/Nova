import fetch from 'cross-fetch';

async function updateCurrencies() {

  let connection = null;

  try {

    const currencies = [ 'bitcoin', 'litecoin', 'ethereum', 'monero', 'dogecoin'];
    const vs_currencies = [ 'usd' ];

    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currencies.join('%2C')}&vs_currencies=${vs_currencies.join('%2C')}`);

    if (response.status !== 200) throw new Error(response);

    const data = await response.json();

    if (!data) throw new Error('No data');

    connection = await DB.getConnection();
    connection.beginTransaction();

    Object.entries(data).forEach(([currency, price]) => {
      if (!price['usd']) return;
      if (typeof currency !== 'string') return;
      const usd = price['usd'];
      if (usd <= 0) return;

      connection.query('INSERT INTO crypto (name, price) VALUES (?, ?) ON DUPLICATE KEY UPDATE price = ?', [currency, usd, usd]);

    });

    await connection.commit();

  } finally {
    if (connection) connection.release();
  }
}

setInterval(async () => {
  updateCurrencies();
}, 1000 * 60 * 5);
