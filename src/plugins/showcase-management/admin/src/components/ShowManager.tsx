import { useFetchClient } from '@strapi/admin/strapi-admin';
import {
  Box,
  Button,
  Checkbox,
  Field,
  Flex,
  SingleSelect,
  SingleSelectOption,
  Table,
  Th,
  Thead,
  Tr,
} from '@strapi/design-system';
import { List } from '@strapi/icons';
import { Reorder } from 'framer-motion';
import { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import ShowItem from './ShowItem';

const Container = styled.div`
  padding-block-start: 56px;
  padding-inline-end: 56px;
  padding-block-end: 56px;
  padding-inline-start: 56px;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 3.2rem;
  line-height: 1.25;
  color: currentcolor;
  padding-bottom: 20px;
`;

const StyledTable = styled(Table)`
  min-width: 100%;
  table-layout: fixed;
  & tr {
    border-bottom: 1px solid rgb(50, 50, 77);
  }
`;
const StyledSelectBox = styled(Box)`
  width: 100px;
`;

const StyledTh = styled(Th)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:first-of-type {
    width: 20px;
    min-width: fit-content;
  }
  &:nth-child(2) {
    width: 40px;
    min-width: fit-content;
  }
  &:nth-child(3) {
    width: 60px;
    min-width: fit-content;
  }
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

const ShowManager = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [saveOrder, setSaveOrder] = useState<null | string>(null);
  const { get, post } = useFetchClient();

  const fetchShows = async () => {
    try {
      const response = await get<Show[]>('/showcase-management/shows');
      setShows(response.data);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };
  useEffect(() => {
    fetchShows();
  }, [get]);

  const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const showOrder: { show_id: string; order: number; Active: number }[] = [];

    shows.forEach((show, index) => {
      showOrder.push({
        show_id: show.show_id,
        order: index + 1,
        Active: show.Active,
      });
    });
    setSaveOrder('Saving...');

    const api = '/showcase-management/show-order';

    try {
      const { data } = await post(api, showOrder);
      setSaveOrder('Saved');
      await fetchShows();
      setTimeout(() => {
        setSaveOrder(null);
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle bulk select
  const handleBulkSelect = (isChecked: boolean) => {
    setShows((prevShows) =>
      prevShows.map((show) => ({
        ...show,
        Active: isChecked ? 1 : 0,
      }))
    );
  };

  const handleCheckboxChange = (showId: string, isChecked: boolean) => {
    setShows((prevShows) =>
      prevShows.map((show) =>
        show.show_id === showId ? { ...show, Active: isChecked ? 1 : 0 } : show
      )
    );
  };

  return (
    <Container>
      <Title>Showcase Management</Title>
      <Flex paddingBottom={6}>
        <StyledSelectBox>
          <Field.Label>Select Action</Field.Label>
          <SingleSelect>
            <SingleSelectOption value="Order">Order</SingleSelectOption>
            <SingleSelectOption value="Activate">Activate</SingleSelectOption>
          </SingleSelect>
        </StyledSelectBox>
        <Box paddingTop={4} paddingLeft={4}>
          <Button onClick={handleSave}>Apply</Button>
          {saveOrder && (
            <Box paddingTop={4}>
              <p>{saveOrder}</p>
            </Box>
          )}
        </Box>
      </Flex>
      <Box>
        <StyledTable>
          <Thead>
            <Tr>
              <StyledTh>
                <List fill="currentcolor" />
              </StyledTh>
              <StyledTh>
                <Checkbox
                  aria-label="Select all entries"
                  onCheckedChange={(isChecked: boolean) => handleBulkSelect(isChecked)}
                />
              </StyledTh>
              <StyledTh>Active</StyledTh>
              <StyledTh>Title</StyledTh>
              <StyledTh>Creator</StyledTh>
              <StyledTh>Description</StyledTh>
              <StyledTh>Thumbnail</StyledTh>
              <StyledTh>Actions</StyledTh>
            </Tr>
          </Thead>
          <Reorder.Group axis="y" as="tbody" values={shows} onReorder={setShows}>
            {shows.map((show) => (
              <ShowItem key={show.show_id} show={show} onCheckboxChange={handleCheckboxChange} />
            ))}
          </Reorder.Group>
        </StyledTable>
      </Box>
    </Container>
  );
};

export default ShowManager;