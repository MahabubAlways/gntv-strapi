import { Checkbox, Td } from '@strapi/design-system';
import { Drag } from '@strapi/icons';
import { Reorder, useDragControls, useMotionValue } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import UpdateModal from './UpdateModal';
import { useRaisedShadow } from './use-shadow';

const StyledTd = styled(Td)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 16px;
  &:first-of-type {
    padding: 0px 4px;
  }
`;
const StyledDrag = styled(Drag)`
  cursor: grab;
`;

interface Show {
  show_id: string;
  Active: number;
  show_title: string;
  show_creator: string;
  show_description: string;
  thumbnail_url: string;
  order: number;
}

interface IProps {
  show: Show;
  onCheckboxChange: (showId: string, isChecked: boolean) => void;
  fetchShows: () => Promise<void>;
}

const ShowItem = ({ show, onCheckboxChange, fetchShows }: IProps) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  const [formData, setFormData] = useState({
    show_title: show.show_title,
    show_creator: show.show_creator,
    show_description: show.show_description,
    thumbnail_url: show.thumbnail_url,
    show_id: show.show_id,
  });

  return (
    <Reorder.Item
      value={show}
      id={show.show_id}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
      as="tr"
    >
      <StyledTd>
        <StyledDrag fill="currentcolor" onPointerDown={(e) => dragControls.start(e)} />
      </StyledTd>
      <StyledTd>
        <Checkbox
          aria-label="Select show"
          checked={show.Active === 1 ? true : false}
          onCheckedChange={(isChecked: boolean) => onCheckboxChange(show.show_id, isChecked)}
        />
      </StyledTd>
      <StyledTd>{show.Active == 0 ? 'False' : 'True'}</StyledTd>
      <StyledTd>{show.show_title}</StyledTd>
      <StyledTd>{show.show_creator}</StyledTd>
      <StyledTd>{show.show_description}</StyledTd>
      <StyledTd>
        {show.thumbnail_url ? (
          <img width={120} src={show.thumbnail_url} alt={show.show_title} />
        ) : (
          'No Thumbnail Found'
        )}
      </StyledTd>
      <StyledTd>
        <UpdateModal formData={formData} setFormData={setFormData} fetchShows={fetchShows} />
      </StyledTd>
    </Reorder.Item>
  );
};

export default ShowItem;
