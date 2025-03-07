'use strict';
import type { Core } from '@strapi/strapi';
import {
  fetchActiveProfilesData,
  fetchActiveShowsData,
  fetchProfilesData,
  fetchShowsData,
} from './ControllerGetFunctions';
const { ApplicationError } = require('@strapi/utils').errors;

const getAdminController = ({ strapi }: { strapi: Core.Strapi }) => ({
  async getShows(ctx) {
    try {
      ctx.body = await fetchShowsData();
    } catch (error) {
      console.error('Error fetching shows:', error);
      throw new ApplicationError('Failed to fetch shows');
    }
  },

  async getActiveShows(ctx) {
    try {
      ctx.body = await fetchActiveShowsData();
    } catch (error) {
      console.error('Error fetching active shows:', error);
      throw new ApplicationError('Failed to fetch active shows');
    }
  },

  async getProfiles(ctx) {
    try {
      ctx.body = await fetchProfilesData();
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw new ApplicationError('Failed to fetch profiles');
    }
  },

  async getActiveProfiles(ctx) {
    try {
      ctx.body = await fetchActiveProfilesData();
    } catch (error) {
      console.error('Error fetching active profiles:', error);
      throw new ApplicationError('Failed to fetch active profiles');
    }
  },
});

export default getAdminController;
