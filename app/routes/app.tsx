import { Outlet } from 'remix';
import { Navigation } from '~/components/interactions/navigate/smartComponent/Navigation';
import { BaseLayout } from '~/components/layout/BaseLayout';


export default function App() {
  return (
    <BaseLayout
      topBar={ <Navigation /> }
      body={ <Outlet/> }
    />
  );
}
