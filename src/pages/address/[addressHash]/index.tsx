import { fetchData } from 'utils/api/queries';

function Page() {
  return null;
}

export default Page;

export async function getServerSideProps({ query }) {
  const { addressHash } = query;

  let destination = `/accounts/${addressHash}`;

  try {
    await fetchData(`/contracts/${addressHash}`);
    destination = `/contracts/${addressHash}`;
  } catch (error) {
    // ignore
  }

  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
}
