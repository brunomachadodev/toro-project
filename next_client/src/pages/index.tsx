import Head from 'next/head';
import { useState } from 'react';
import AccountCard from '../components/accountCard';
import Header from '../components/header';
import SearchBox from '../components/searchBox';

export default function Home() {
  const [account, setAccount] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const getAccountData = (data) => {
    if (data) {
      setErrorMessage('')
      setAccount([
        {
          name: 'Banco',
          value: '352',
        },
        {
          name: 'Agência',
          value: '0001',
        },
        {
          name: 'Conta',
          value: data.id,
        },
        {
          name: 'Nome Completo',
          value: data.name,
        },
        {
          name: 'CPF',
          value: data.cpf,
        },
        {
          name: 'Email',
          value: data.email,
        },
      ]);
    } else {
      setAccount([]);
    }
  };

  const getErrorMessage = (message) => {
    setAccount([]);
    setErrorMessage(message);
  };

  return (
    <div>
      <Head>
        <title>Buscar Conta | Toro Investimentos</title>
      </Head>
      <Header />
      <h1 className='text-4xl lg:text-5xl sm:text-4xl font-bold leading-normal px-5 mt-0 mb-6 text-violet-800 text-center'>
        Invista com facilidade
      </h1>
      <p className='text-base lg:text-lg font-semibold text-center mt-2 px-12 mb-12'>
        Com o seu CPF, você tem acesso aos dados para depósito em sua conta
        Toro.
      </p>
      <SearchBox
        placeholder='Digite seu CPF'
        callback={getAccountData}
        errorCallback={getErrorMessage}
      />
      {errorMessage && <p className='text-center text-red-800 font-semibold'>{errorMessage}</p>}
      {account.length > 0 && <AccountCard data={account} />}
    </div>
  );
}
