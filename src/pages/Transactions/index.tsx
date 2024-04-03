import { useContext } from 'react';
import { Header } from '../../components/Header';
import { SearchForm } from '../../components/SearchForm';
import { Summary } from '../../components/Summary';
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { priceFormatter, dateFormatter } from '../../utils/formatter';

export function Transactions() {
  const { transactions } = useContext(TransactionsContext);

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
                      <PriceHighlight variant={type}>
                        {type === 'outcome' && '- '}
                        {priceFormatter.format(price)}
                      </PriceHighlight>
                    </td>
                    <td>{category}</td>
                    <td>{dateFormatter.format(new Date(createdAt))}</td>
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
