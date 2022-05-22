import Head from 'next/head';
import AccountCard from '../components/accountCard';
import Header from '../components/header';

export default function Account() {
  const data = [
    { name: 'Banco', value: '352' },
    { name: 'Agência', value: '0001' },
    { name: 'Conta', value: `${Math.floor(Math.random() * 100_000)}` },
    { name: 'Nome Completo', value: 'Bruno Machado' },
    { name: 'CPF', value: '995.183.230-03' },
  ];

  return (
    <div className='flex flex-col items-center'>
      <Header />
      <Head>
        <title>Depósito | Toro Investimentos</title>
      </Head>
      <AccountCard data={data} />
    </div>
  );
}
