'use strict';
import type { Core } from '@strapi/strapi';
//import mysql from 'mysql2/promise';
const { ApplicationError } = require('@strapi/utils').errors;

const postShowUpdate = ({ strapi }: { strapi: Core.Strapi }) => ({
  async showUpdate(ctx) {
    try {
      const postBody = ctx.request.body;
      ctx.body = postBody;
      ctx.status = 200;
    } catch (error) {
      throw new ApplicationError('Failed to fetch shows');
    }
  },
});

export default postShowUpdate;
