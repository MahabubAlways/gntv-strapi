import { useFetchClient } from '@strapi/admin/strapi-admin';
import { Box, Button, Field, Modal } from '@strapi/design-system';
import { Pencil } from '@strapi/icons';
import { ChangeEvent, Dispatch, FormEvent, MouseEvent, SetStateAction, useState } from 'react';
import SelectImage from './SelectImage';

interface FormData {
  show_video_url: string;
  show_title: string;
  show_creator: string;
  show_description: string;
  thumbnail_url: string;
  show_id: string;
}
interface show {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  fetchShows: () => Promise<void>;
}

function UpdateModal({ formData, setFormData, fetchShows }: show) {
  const [saveShow, setSaveShow] = useState<null | string>(null);
  const [open, setOpen] = useState(false);

  const { post } = useFetchClient();

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaveShow('Saving...');

    const api = '/showcase-management/show-update';

    try {
      const { data } = await post(api, formData);
      console.log(data);
      setSaveShow('Updated');
      await fetchShows();
      setTimeout(() => {
        setSaveShow(null);
        setOpen(false);
      }, 500);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePopup = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger id={formData.show_id}>
        <Button>
          <Pencil fill="currentcolor" />
        </Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Update Show</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSave}>
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
            <Box paddingTop={2}>
              <Field.Root name="creator" required>
                <Field.Label>Creator</Field.Label>
                <Field.Input
                  name="show_creator"
                  defaultValue={formData.show_creator}
                  onChange={handleChange}
                />
              </Field.Root>
            </Box>
            <Box paddingTop={2}>
              <Field.Root name="description" required>
                <Field.Label>Description</Field.Label>
                <Field.Input
                  name="show_description"
                  defaultValue={formData.show_description}
                  onChange={handleChange}
                />
              </Field.Root>
            </Box>
            <Box paddingTop={2}>
              <Field.Root name="video_url">
                <Field.Label>Show Video URL</Field.Label>
                <Field.Input
                  name="show_video_url"
                  defaultValue={formData.show_video_url}
                  onChange={handleChange}
                />
              </Field.Root>
            </Box>
            <Box paddingTop={2}>
              <SelectImage formData={formData} setFormData={setFormData} />
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>
              <Button variant="tertiary">Cancel</Button>
            </Modal.Close>
            {saveShow && (
              <Box paddingTop={2}>
                <p>{saveShow}</p>
              </Box>
            )}
            <Button type="submit">Save</Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}

export default UpdateModal;
