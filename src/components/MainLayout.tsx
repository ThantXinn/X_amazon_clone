import { ReactElement } from 'react';
import Footer from './Footer';
import Header from './Header';
import SubHeader from './SubHeader';

interface Props{
    children: ReactElement;
}
const MainLayout = ({children}:Props) => {
  return (
      <>
          <Header />
          <SubHeader />
          {children}
          <Footer />
      </>
  )
}

export default MainLayout