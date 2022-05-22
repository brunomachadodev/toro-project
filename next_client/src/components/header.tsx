import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/brand.png';

export default function Header() {
  return (
    <header className='bg-white py-4 px-8 mb-8 flex justify-center'>
      <Link href='/'>
        <Image
          className='hover:cursor-pointer'
          alt='Toro Investimentos'
          src={logo}
          layout='intrinsic'
          height={37}
          width={128}
        />
      </Link>
    </header>
  );
}
