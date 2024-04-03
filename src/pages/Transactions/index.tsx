import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { SearchForm } from '../../components/SearchForm';
import { Summary } from '../../components/Summary';
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles';
interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}
export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions');

    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map(
              ({ description, type, price, category, id, createdAt }) => {
                return (
                  <tr key={id}>
                    <td width="40%">{description}</td>
                    <td>
                      <PriceHighlight
                        variant={type}
                      >{`R$ ${price}`}</PriceHighlight>
                    </td>
                    <td>{category}</td>
                    <td>{createdAt}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  );
}
