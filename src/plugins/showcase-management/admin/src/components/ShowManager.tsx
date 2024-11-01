import { useFetchClient } from '@strapi/admin/strapi-admin';
import { Box, Checkbox, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@strapi/design-system';
import { Drag, List, Pencil } from '@strapi/icons';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
`;

const StyledTd = styled(Td)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:first-of-type {
    width: 30px;
    min-width: fit-content;
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
  const { get } = useFetchClient();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await get<Show[]>('/api/showcase-management/shows');
        setShows(response.data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, [get]);

  return (
    <Container>
      <Title>Show Management</Title>
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
              <StyledTh>Title</StyledTh>
              <StyledTh>Creator</StyledTh>
              <StyledTh>Description</StyledTh>
              <StyledTh>Thumbnail</StyledTh>
              <StyledTh>Active</StyledTh>
              <StyledTh>Order</StyledTh>
              <StyledTh>Actions</StyledTh>
            </Tr>
          </Thead>
          <Tbody>
            {shows.map((show) => (
              <Tr key={show.show_id}>
                <StyledTd>
                  <Drag fill="currentcolor" />
                </StyledTd>
                <StyledTd>
                  <Checkbox aria-label="Select all entries" />
                </StyledTd>
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
                <StyledTd>{show.Active == 0 ? 'False' : 'True'}</StyledTd>
                <StyledTd>{show.order}</StyledTd>
                <StyledTd>
                  <Flex>
                    <Pencil />
                  </Flex>
                </StyledTd>
              </Tr>
            ))}
          </Tbody>
        </StyledTable>
      </Box>
    </Container>
  );
};

export default ShowManager;
