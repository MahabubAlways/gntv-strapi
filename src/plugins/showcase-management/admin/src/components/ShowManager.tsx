import { useFetchClient } from '@strapi/admin/strapi-admin';
import { Box, Button, Checkbox, Table, Th, Thead, Tr } from '@strapi/design-system';
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

  const handleSaveOrder = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const showOrder: { show_id: string; order: number }[] = [];

    shows.forEach((show, index) => {
      showOrder.push({
        show_id: show.show_id,
        order: index + 1,
      });
    });

    console.log('submitting...', showOrder);
    setSaveOrder('Order Saving...');

    try {
      const { data } = await post('/showcase-management/show-order', showOrder);
      setSaveOrder('Saved');
      await fetchShows();
      setTimeout(() => {
        setSaveOrder(null);
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Title>Showcase Management</Title>
      <Box paddingBottom={6}>
        <Button onClick={handleSaveOrder}>Save Order</Button>
        {saveOrder && (
          <Box paddingTop={4}>
            <p>{saveOrder}</p>
          </Box>
        )}
      </Box>
      <Box>
        <StyledTable>
          <Thead>
            <Tr>
              <StyledTh>
                <List fill="currentcolor" />
              </StyledTh>
              <StyledTh>
                <Checkbox aria-label="Select all entries" />
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
              <ShowItem key={show.show_id} show={show} />
            ))}
          </Reorder.Group>
        </StyledTable>
      </Box>
    </Container>
  );
};

export default ShowManager;
