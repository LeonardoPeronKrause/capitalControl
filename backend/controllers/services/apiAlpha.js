const axios = require('axios');

const obterCotacao = async (ticker) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=YOUR_API_KEY`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    
    if (data && data['Time Series (5min)']) {
      const lastRefreshed = data['Meta Data']['3. Last Refreshed'];
      const cotacao = data['Time Series (5min)'][lastRefreshed]['4. close'];  // Pega o valor de fechamento
      return cotacao;
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar cotação:', error);
    throw error;
  }
};

module.exports = { obterCotacao };
