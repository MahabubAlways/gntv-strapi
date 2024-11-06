'use strict';
import type { Core } from '@strapi/strapi';
import mysql from 'mysql2/promise';
const { ApplicationError } = require('@strapi/utils').errors;

const postShowActive = ({ strapi }: { strapi: Core.Strapi }) => ({
  async showActive(ctx) {
    try {
      const activeData = ctx.request.body;

      if (!Array.isArray(activeData)) {
        throw new ApplicationError('Invalid data: activeData must be an array');
      }

      const updateShowActive = async () => {
        const connection = await mysql.createConnection({
          host: '216.225.203.234',
          user: 'devdb',
          password: '1t_f1m71G',
          database: 'Staging_Interocitor',
        });

        try {
          const query = 'UPDATE shows SET `Active` = ? WHERE show_id = ?';

          // Run update for each show in orderData
          for (const show of activeData) {
            const { Active, show_id } = show;
            await connection.execute(query, [Active, show_id]);
          }
        } finally {
          await connection.end();
        }
      };

      await updateShowActive();
      ctx.body = { success: true, message: 'Order updated successfully' };
    } catch (error) {
      console.error('Error updating show Active:', error);
      throw new ApplicationError('Failed to update show Active');
    }
  },
});

export default postShowActive;
