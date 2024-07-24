import dynamic from 'next/dynamic';
import { lists } from '../../mock/pin';

const App = dynamic(() => import('../../components/AppShell'), {
  ssr: false,
});

export async function generateStaticParams() {
  return [
    { all: ['feed'] },
    { all: ['lists'] },
    ...lists.map(list => ({ all: ['lists', list.id] })),
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
