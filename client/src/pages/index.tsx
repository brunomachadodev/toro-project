import Header from '../components/header';
import SearchBox from '../components/searchBox';

export default function Home() {
  return (
    <>
      <Header />
      <h1>Invista com facilidade</h1>
      <p>Com o seu CPF, você tem acesso aos dados para depósito em sua conta Toro.</p>
      <SearchBox
        ariaLabel="Pesquise seu CPF"
        placeholder="Digite seu CPF"
      />
    </>
  );
}
