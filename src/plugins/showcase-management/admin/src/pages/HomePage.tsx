import { Main } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import ShowManager from '../components/ShowManager';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main>
      <ShowManager />
    </Main>
  );
};

export { HomePage };
