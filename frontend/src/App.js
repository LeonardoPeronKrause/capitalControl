import logo from './logo.svg';
import './App.css';

function App() {
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
        <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
      </tbody>
    </table>
   </div> 
  )
}

export default App;
