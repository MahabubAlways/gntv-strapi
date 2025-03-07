'use strict';
import type { Core } from '@strapi/strapi';
import mysql from 'mysql2/promise';
const { ApplicationError } = require('@strapi/utils').errors;

const getAdminController = ({ strapi }: { strapi: Core.Strapi }) => ({
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

  async getProfiles(ctx) {
    try {
      const fetchProfiles = async () => {
        const connection = await mysql.createConnection({
          host: '216.225.203.234',
          user: 'devdb',
          password: '1t_f1m71G',
          database: 'Staging_Interocitor',
        });
        try {
          const [creators]: [any[], any] = await connection.execute('SELECT * FROM creators');
          const [creatorsOrder]: [any[], any] = await connection.execute(
            'SELECT * FROM creators_order'
          );

          const profiles = creators.map((creator: any) => {
            const isActive = creatorsOrder.some((order) => order.member_id === creator.member_id);
            return {
              ...creator,
              creator_active: isActive,
            };
          });

          return profiles;
        } finally {
          await connection.end();
        }
      };

      const profiles = await fetchProfiles();
      ctx.body = profiles;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw new ApplicationError('Failed to fetch profiles');
    }
  },

  async getActiveProfiles(ctx) {
    try {
      const fetchProfiles = async () => {
        const connection = await mysql.createConnection({
          host: '216.225.203.234',
          user: 'devdb',
          password: '1t_f1m71G',
          database: 'Staging_Interocitor',
        });
        try {
          const [profiles]: [any[], any] = await connection.execute(
            'SELECT * FROM creators WHERE member_id IN (SELECT member_id FROM creators_order) ORDER BY (SELECT creator_order FROM creators_order WHERE creators_order.member_id = creators.member_id) ASC'
          );
          const [profiles_order]: [any[], any] = await connection.execute(
            'SELECT * FROM creators_order'
          );

          const creators = profiles.map((profile: any) => {
            const creator = profiles_order.find(
              (creator) => creator.member_id === profile.member_id
            );
            return {
              ...profile,
              creator_order: creator ? creator.creator_order : null,
            };
          });

          return creators;
        } finally {
          await connection.end();
        }
      };

      const profiles = await fetchProfiles();
      ctx.body = profiles;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw new ApplicationError('Failed to fetch profiles');
    }
  },
});

export default getAdminController;
