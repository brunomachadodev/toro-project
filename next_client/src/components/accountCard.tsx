import { ReactElement } from 'react';

interface AccountCardProps {
  data: Array<{ name: string; value: string }>;
}

export default function AccountCard({ data }: AccountCardProps): ReactElement {
  return (
    <section className='bg-white shadow-md overflow-hidden max-w-3xl sm:rounded-lg mt-4 mx-4 md:mx-auto  '>
      <header className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Informações para depósito
        </h3>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
          Sua conta Toro aceita transferências por TED e PIX, desde que a conta possua o mesmo CPF cadastrado.
        </p>
      </header>
      <div className='border-t border-gray-300'>
        <dl>
          {data.map((item) => (
            <div
              key={item.name}
              className='odd:bg-white even:bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'
            >
              <dt className='text-sm font-medium text-gray-500'>{item.name}</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
