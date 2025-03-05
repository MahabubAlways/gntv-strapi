'use strict';
import type { Core } from '@strapi/strapi';
import mysql from 'mysql2/promise';
const { ApplicationError } = require('@strapi/utils').errors;

const getShowsController = ({ strapi }: { strapi: Core.Strapi }) => ({
  async getShows(ctx) {
    try {
      const fetchShows = async () => {
        const connection = await mysql.createConnection({
          host: '216.225.203.234',
          user: 'devdb',
          password: '1t_f1m71G',
          database: 'Staging_Interocitor',
        });
        try {
          const [shows]: [any[], any] = await connection.execute('SELECT * FROM shows');
          const [creators]: [any[], any] = await connection.execute('SELECT * FROM creators');
          const [showsOrder]: [any[], any] = await connection.execute('SELECT * FROM shows_order');

          const showsWithCreators = shows.map((show: any) => {
            const creator = creators.find((creator) => creator.member_id === show.show_owner);
            const isActive = showsOrder.some((order) => order.show_id === show.show_id);
            return {
              ...show,
              creator_identity: creator ? creator.creator_identity : null,
              show_active: isActive,
            };
          });

          return showsWithCreators;
        } finally {
          await connection.end();
        }
      };

      const shows = await fetchShows();
      ctx.body = shows;
    } catch (error) {
      console.error('Error fetching shows:', error);
      throw new ApplicationError('Failed to fetch shows');
    }
  },

  async getActiveShows(ctx) {
    try {
      const fetchShows = async () => {
        const connection = await mysql.createConnection({
          host: '216.225.203.234',
          user: 'devdb',
          password: '1t_f1m71G',
          database: 'Staging_Interocitor',
        });
        try {
          const [shows]: [any[], any] = await connection.execute(
            'SELECT * FROM shows WHERE show_id IN (SELECT show_id FROM shows_order) ORDER BY (SELECT show_order FROM shows_order WHERE shows_order.show_id = shows.show_id) ASC'
          );
          const [creators]: [any[], any] = await connection.execute('SELECT * FROM creators');

          const showsWithCreators = shows.map((show: any) => {
            const creator = creators.find((creator) => creator.member_id === show.show_owner);
            return {
              ...show,
              creator_identity: creator ? creator.creator_identity : null,
            };
          });

          return showsWithCreators;
        } finally {
          await connection.end();
        }
      };

      const shows = await fetchShows();
      ctx.body = shows;
    } catch (error) {
      console.error('Error fetching shows:', error);
      throw new ApplicationError('Failed to fetch shows');
    }
  },
});

export default getShowsController;
