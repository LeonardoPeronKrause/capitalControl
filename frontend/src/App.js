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

    fetch('http://localhost:5000/api/ativos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoAtivo),
    })
      .then((response) => response.json())
      .then((data) => {
        setAtivos([...ativos, {...novoAtivo, id: data.id}]);
        setNovoAtivo({ nome: '', ticker: '', cotas: '', precoMedio: '', precoAtual: ''});
        alert('Ativo adicionado com sucesso!');
      })
      .catch((error) => console.error('Erro ao adicionar ativo:', error));
  };

  return (
   <div>
    <h1>Capital Control</h1>
    <p>O seu sistema de gerenciamento de investimentos!</p>

    <table border='1'>
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
          {ativos.map((ativo, index) => (
            <tr key={index}>
              <td>{ativo.id}</td>
              <td>{ativo.nome}</td>
              <td>{ativo.ticker}</td>
              <td>{ativo.cotas}</td>
              <td>R$ {ativo.precoMedio.toFixed(2)}</td>
              <td>R$ {ativo.precoAtual.toFixed(2)}</td>
              <td>R$ {(ativo.cotas * ativo.precoMedio).toFixed(2)}</td>
              <td>R$ {(ativo.cotas * ativo.precoAtual).toFixed(2)}</td>
            </tr>
          ))}
      </tbody>
    </table>
   </div> 
  );
}

export default App;
