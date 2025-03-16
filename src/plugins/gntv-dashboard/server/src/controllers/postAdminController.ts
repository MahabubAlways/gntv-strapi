'use strict';
import type { Core } from '@strapi/strapi';
import postCheckEmail from './postCheckEmail';
import postRegister from './postRegister';
import { postShowUpdate } from './postShowUpdate';
const { ApplicationError } = require('@strapi/utils').errors;

interface ShowData {
  show_video_url: string;
  show_title: string;
  show_artist: string;
  show_description: string;
  thumbnail_url: string;
  show_id: number;
}

interface CreatorData {
  email: string;
}

interface UserData {
  email: string;
  password: string;
  memberId?: string;
}

const postAdminController = ({ strapi }: { strapi: Core.Strapi }) => ({
  async showUpdate(ctx) {
    try {
      const activeData: ShowData = ctx.request.body;

      if (!Array.isArray(activeData)) {
        throw new ApplicationError('Invalid data: activeData must be an array');
      }

      await postShowUpdate(activeData);
      ctx.body = { success: true, message: 'Active updated successfully' };
    } catch (error) {
      console.error('Error updating show Active:', error);
      throw new ApplicationError('Failed to update show Active');
    }
  },

  async checkEmail(ctx) {
    try {
      const creatorData: CreatorData = ctx.request.body;

      if (typeof creatorData !== 'object' || !creatorData.email) {
        throw new ApplicationError(
          'Invalid data: creatorData must be an object with an email property'
        );
      }

      const result = await postCheckEmail(creatorData);
      ctx.body = { success: true, message: 'Email checked successfully', data: result };
    } catch (error) {
      console.error('Error checking email:', error);
      throw new ApplicationError('Failed to check email');
    }
  },
  async postRegister(ctx) {
    try {
      const userData: UserData = ctx.request.body;
      if (
        typeof userData !== 'object' ||
        !userData.email ||
        !userData.password ||
        !userData.memberId
      ) {
        throw new ApplicationError(
          'Invalid data: creatorData must be an object with an email and password property',
          userData
        );
      }
      const result = await postRegister(userData);
      ctx.body = { success: true, message: 'Successfully Registered', data: result };
    } catch (error) {
      ctx.throw(400, error);
    }
  },
});

export default postAdminController;
