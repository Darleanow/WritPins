import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../components/AppShell'), {
  ssr: false,
});

export async function generateStaticParams() {
  return [
    { all: ['feed'] },
    { all: ['lists'] },
    { all: ['settings'] },
    { all: ['login'] },
    {
      all: ['register']
    }
  ];
}

export default function Page() {
  return <App />;
}
