'use strict';
const { ApplicationError } = require('@strapi/utils').errors;

interface UserData {
  email: string;
  password: string;
}

export const postAdminRegister = async (userData: UserData) => {
  try {
    const role = await strapi.query('plugin::users-permissions.role').findOne({
      where: { name: 'Authenticated' }, // or any other role name
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

export default postAdminRegister;
