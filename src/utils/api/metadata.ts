import { fetchData } from './queries';

export const uploadMetadataFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'application/json');

  return fetchData('/metadata', {
    method: 'POST',
    body: formData,
    headers: {
      accept: '*/*',
    },
  });
};
