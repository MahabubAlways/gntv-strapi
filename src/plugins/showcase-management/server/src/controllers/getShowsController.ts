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
          const [rows] = await connection.execute(
            'SELECT show_id, Active, show_title, show_creator, show_description, thumbnail_url, `order` FROM shows ORDER BY `order` ASC'
          );
          return rows;
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
