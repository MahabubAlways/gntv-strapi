'use strict';
import type { Core } from '@strapi/strapi';
import mysql from 'mysql2/promise';
const { ApplicationError } = require('@strapi/utils').errors;

const postShowOrder = ({ strapi }: { strapi: Core.Strapi }) => ({
  async showOrder(ctx) {
    try {
      const orderData = ctx.request.body;

      if (!Array.isArray(orderData)) {
        throw new ApplicationError('Invalid data: orderData must be an array');
      }

      const updateShowsOrder = async () => {
        const connection = await mysql.createConnection({
          host: '216.225.203.234',
          user: 'devdb',
          password: '1t_f1m71G',
          database: 'Staging_Interocitor',
        });

        try {
          const query = 'UPDATE shows SET `order` = ? WHERE show_id = ?';

          // Run update for each show in orderData
          for (const show of orderData) {
            const { order, show_id } = show;
            await connection.execute(query, [order, show_id]);
          }
        } finally {
          await connection.end();
        }
      };

      await updateShowsOrder();
      ctx.body = { success: true, message: 'Order updated successfully' };
    } catch (error) {
      console.error('Error updating show order:', error);
      throw new ApplicationError('Failed to update show order');
    }
  },
});

export default postShowOrder;
