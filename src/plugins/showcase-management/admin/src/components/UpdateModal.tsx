import { Box, Button, Field, Modal } from '@strapi/design-system';
import { Pencil } from '@strapi/icons';
import ThumbUpload from './ThumbUpload';

interface show {
  title: string;
  creator: string;
  desc: string;
}

function UpdateModal({ title, creator, desc }: show) {
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
              <Field.Input defaultValue={title} />
            </Field.Root>
          </Box>
          <Box paddingTop={3}>
            <Field.Root name="creator" required>
              <Field.Label>Creator</Field.Label>
              <Field.Input defaultValue={creator} />
            </Field.Root>
          </Box>
          <Box paddingTop={3}>
            <Field.Root name="description" required>
              <Field.Label>Description</Field.Label>
              <Field.Input defaultValue={desc} />
            </Field.Root>
          </Box>
          <Box paddingTop={3}>
            <ThumbUpload />
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button variant="tertiary">Cancel</Button>
          </Modal.Close>
          <Button>Confirm</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}

export default UpdateModal;
