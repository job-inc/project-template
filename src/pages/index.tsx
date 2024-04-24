import DashboardPage from '../components/DashboardPage/DashboardPage';
import { declareSsrProps } from '../utils/declareSsrProps';

export const getServerSideProps = declareSsrProps(
    async ({ ssrHelpers }) => {
        await ssrHelpers.example.getHello.fetch();

        return {};
    },
    {
        private: true,
    },
);

export default DashboardPage;
