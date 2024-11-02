import { useFetchClient } from '@strapi/admin/strapi-admin';
import { Button } from '@strapi/design-system';
import { ChangeEvent, FormEvent, useState } from 'react';

interface UploadResponse {
  id: number;
  name: string;
  url: string;
  // Add other properties as needed based on Strapi's response
}

const MyMediaUploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadResponse | null>(null);
  const { post } = useFetchClient();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('files', file);

    try {
      const { data } = await post<{ data: UploadResponse[] }>('/upload', formData);
      console.log('File uploaded:', data);
      if (data.data && data.data.length > 0) {
        setUploadedFile(data.data[0]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <Button type="submit">Upload</Button>
      </form>
      {uploadedFile && (
        <div>
          <h3>Uploaded File:</h3>
          <p>Name: {uploadedFile.name}</p>
          <p>URL: {uploadedFile.url}</p>
          <img src={uploadedFile.url} alt={uploadedFile.name} style={{ maxWidth: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default MyMediaUploadComponent;
