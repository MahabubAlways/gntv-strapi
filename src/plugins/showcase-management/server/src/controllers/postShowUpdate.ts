'use strict';
import type { Core } from '@strapi/strapi';
import mysql from 'mysql2/promise';
const { ApplicationError } = require('@strapi/utils').errors;

interface ShowData {
  show_title: string;
  show_creator: string;
  show_description: string;
  thumbnail_url: string;
  show_id: number;
}

const postShowUpdate = ({ strapi }: { strapi: Core.Strapi }) => ({
  async showUpdate(ctx) {
    try {
      const showData: ShowData = ctx.request.body;

      const updateShowsOrder = async () => {
        const connection = await mysql.createConnection({
          host: '216.225.203.234',
          user: 'devdb',
          password: '1t_f1m71G',
          database: 'Staging_Interocitor',
        });

        try {
          const query =
            'UPDATE shows SET show_title = ?, show_creator = ?, show_description = ?, thumbnail_url = ? WHERE show_id = ?';

          // Run update for each show in showData
          await connection.execute(query, [
            showData.show_title,
            showData.show_creator,
            showData.show_description,
            showData.thumbnail_url,
            showData.show_id,
          ]);
        } finally {
          await connection.end();
        }
      };

      await updateShowsOrder();
      ctx.body = { success: true, message: 'Show updated successfully' };
    } catch (error) {
      console.error('Error updating show:', error);
      throw new ApplicationError('Failed to update show');
    }
  },
});

export default postShowUpdate;
