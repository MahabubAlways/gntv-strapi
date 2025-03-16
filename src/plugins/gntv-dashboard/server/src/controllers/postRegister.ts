'use strict';
const { ApplicationError } = require('@strapi/utils').errors;
import { getDatabaseConnection } from '../../../db-conn';

interface UserData {
  email: string;
  password: string;
  memberId?: string;
}

export const postRegister = async (userData: UserData) => {
  const connection = await getDatabaseConnection();

  try {
    const role = await strapi.query('plugin::users-permissions.role').findOne({
      where: { name: 'Subscriber' }, // or any other role name
    });
    const roleId = role.id;
    // Create the new user
    const user = await strapi.plugins['users-permissions'].services.user.add({
      username: userData.email,
      email: userData.email,
      password: userData.password,
      provider: 'local',
      confirmed: true, // Set to false if email confirmation is required
      role: roleId,
    });

    // Insert or update memberId in creators table
    if (userData.memberId) {
      const query = `
      INSERT INTO creators (member_id)
      VALUES (?)
      ON DUPLICATE KEY UPDATE
      member_id = VALUES(member_id)
      `;

      await connection.execute(query, [userData.memberId]);
    }

    // Generate JWT token
    const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
      id: user.id,
    });

    // Return user info and token
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      jwt,
    };
  } catch (error) {
    throw new ApplicationError(error);
  }
};

export default postRegister;
