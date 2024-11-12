import { useFetchClient } from '@strapi/admin/strapi-admin';
import { Box, Button, Field, Modal } from '@strapi/design-system';
import { Pencil } from '@strapi/icons';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import SelectImage from './SelectImage';

interface FormData {
  show_title: string;
  show_creator: string;
  show_description: string;
  thumbnail_url: string;
  show_id: string;
}
interface show {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

interface UploadResponse {
  id: number;
  name: string;
  url: string;
  // Add other properties as needed based on Strapi's response
}
function UpdateModal({ formData, setFormData }: show) {
  const [uploadedFile, setUploadedFile] = useState<UploadResponse | null>(null);
  const [saveShow, setSaveShow] = useState<null | string>(null);

  const { post } = useFetchClient();

  const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSaveShow('Saving...');

    const api = '/showcase-management/show-update';

    try {
      const { data } = await post(api, formData);
      console.log(data);
      setSaveShow('Updated');
      //await fetchShows();
      setTimeout(() => {
        setSaveShow(null);
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button>
          <Pencil fill="currentcolor" />
        </Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Update Show</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box>
            <Field.Root name="title" required>
              <Field.Label>Title</Field.Label>
              <Field.Input
                name="show_title"
                defaultValue={formData.show_title}
                onChange={handleChange}
              />
            </Field.Root>
          </Box>
          <Box paddingTop={3}>
            <Field.Root name="creator" required>
              <Field.Label>Creator</Field.Label>
              <Field.Input
                name="show_creator"
                defaultValue={formData.show_creator}
                onChange={handleChange}
              />
            </Field.Root>
          </Box>
          <Box paddingTop={3}>
            <Field.Root name="description" required>
              <Field.Label>Description</Field.Label>
              <Field.Input
                name="show_description"
                defaultValue={formData.show_description}
                onChange={handleChange}
              />
            </Field.Root>
          </Box>
          <Box paddingTop={3}>
            <SelectImage formData={formData} setFormData={setFormData} />
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button variant="tertiary">Cancel</Button>
          </Modal.Close>
          {saveShow && (
            <Box paddingTop={4}>
              <p>{saveShow}</p>
            </Box>
          )}
          <Button onClick={handleSave}>Confirm</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}

export default UpdateModal;
