import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const[ativos, setAtivos] = useState([]); // Cria um estado para armazenar os ativos vindos da API
  const [novoAtivo, setNovoAtivo] = useState({  // Estado para armazenar os dados do novo ativo
    nome: '', 
    ticker: '',
    cotas: '',
    precoMedio: '',
    precoAtual: ''
  });

// Funçao para buscar os ativos
  useEffect(() => { // Executa a função quando o componente carrega
    fetch('http://localhost:5000/api/ativos') // Faz a requisição para o backend
      .then((response) => response.json()) // Converte a resposta para JSON
      .then((data) => setAtivos(data)) // Armazena os dados no estado
      .catch((error) => console.error('Erro ao buscar ativos:', error))
  }, []); // O array vazio [] significa que a requisição será feita apenas uma vez ao montar o componente

  // Função para lidar com as mudanças nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoAtivo({
      ...novoAtivo,
      [name]: value,
    });
  };

  // Função para enviar o novo ativo ao backend
  const handleSubmit = (e) => {
    e.preventDefault();

    // Certificar que os dados sao numéricos
    const ativoData = {
      nome: novoAtivo.nome,
      ticker: novoAtivo.ticker,
      cotas: parseInt(novoAtivo.cotas), // Garantir que seja um número inteiro
      precoMedio: parseFloat(novoAtivo.precoMedio), // Garantir que seja um número decimal
      precoAtual: parseFloat(novoAtivo.precoAtual) // Garantir que seja um número decimal
    };

    fetch('http://localhost:5000/api/ativos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ativoData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao adicionar ativo.');
        }
        return response.json()
      })
      .then((data) => {
        setAtivos([...ativos, {...ativoData, id: data.id}]);
        setNovoAtivo({ nome: '', ticker: '', cotas: '', precoMedio: '', precoAtual: ''});
        alert('Ativo adicionado com sucesso!');
      })
      .catch((error) => console.error('Erro ao adicionar ativo:', error));
  };

  return (
   <div>
    <h1>Capital Control</h1>
    <p>O seu sistema de gerenciamento de investimentos!</p>

    {/* Formulário para adicionar novo ativo */}
    <h2>Adicionar Novo Ativo</h2>
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='nome'
        placeholder='Nome do Ativo'
        value={novoAtivo.nome}
        onChange={handleInputChange}
        required
      />
      <input
        type='text'
        name='ticker'
        placeholder='Ticker'
        value={novoAtivo.ticker}
        onChange={handleInputChange}
        required
      />
      <input
        type='number'
        name='cotas'
        placeholder='Número de Cotas'
        value={novoAtivo.cotas}
        onChange={handleInputChange}
        required
      />
      <input
        type='number'
        step='0.01'
        name='precoMedio'
        placeholder='Preço Médio'
        value={novoAtivo.precoMedio}
        onChange={handleInputChange}
        required
      />
      <input
        type='number'
        step='0.01'
        name='precoAtual'
        placeholder='Preço Atual'
        value={novoAtivo.precoAtual}
        onChange={handleInputChange}
        required
      />
      <button type='submit'>Adicionar Ativos</button>
    </form>
    {/* Tabela de ativos */}
    <h2>Lista de Ativos</h2>
    <table>
      <thead>
        <tr>
          <th>Ativo</th>
          <th>Nome</th>
          <th>Ticker</th>
          <th>Cotas</th>
          <th>Preço Médio</th>
          <th>Preço Atual</th>
          <th>Valor Investido</th>
          <th>Valor Total Hoje</th>
        </tr>
      </thead>
      <tbody>
          {ativos && ativos.length > 0 ? (
            ativos.map((ativo) => (
            <tr key={ativo.id}>
              <td>{ativo.nome}</td>
              <td>{ativo.ticker}</td>
              <td>{ativo.cotas}</td>
              <td>R$ {(ativo.precoMedio && !isNaN(ativo.precoMedio) ? ativo.precoMedio.toFixed(2) : '0.00')}</td>
              <td>R$ {(ativo.precoAtual && !isNaN(ativo.precoAtual) ? ativo.precoAtual.toFixed(2) : '0.00')}</td>
              <td>R$ {(ativo.cotas * (ativo.precoMedio || 0)).toFixed(2)}</td>
              <td>R$ {(ativo.cotas * (ativo.precoAtual || 0)).toFixed(2)}</td>
            </tr>
          ))
        ) : (
          <tr><td colSpan='5'>Nenhum ativo encontrado.</td></tr>
        )}
      </tbody>
    </table>
   </div> 
  );
}

export default App;
