import { useFetchClient } from '@strapi/admin/strapi-admin';
import { Box, Button, Flex, Typography } from '@strapi/design-system';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

interface UploadResponse {
  id: number;
  name: string;
  url: string;
  // Add other properties as needed based on Strapi's response
}

interface FormData {
  show_title: string;
  show_creator: string;
  show_description: string;
  thumbnail_url: string;
  show_id: string;
}

interface UploadComponentProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

const UploadComponent = ({ formData, setFormData }: UploadComponentProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { post } = useFetchClient();

  const handleUploadCheck = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log('File uploaded:', formData);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('files', file);

    try {
      const response = await post<{ data: UploadResponse[] }>('/upload', formData);
      const { data } = response;

      console.log('File uploaded:', data);

      if (Array.isArray(data) && data.length > 0) {
        setFormData((prevData: any) => ({
          ...prevData,
          thumbnail_url: data[0]?.url,
        }));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Box padding={4}>
      <Typography variant="beta">Upload Image to Projects Folder</Typography>
      <Box paddingTop={4}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
      </Box>
      <Flex paddingTop={4}>
        <Box paddingRight={4}>
          <Button onClick={handleSubmit} disabled={!file}>
            Upload
          </Button>
        </Box>
        {formData && (
          <Box>
            <Typography variant="omega">Uploaded Image:</Typography>
            <img
              width={120}
              src={formData.thumbnail_url}
              alt=""
              style={{ maxWidth: '100%', marginTop: '8px' }}
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default UploadComponent;
