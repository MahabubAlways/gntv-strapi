'use strict';
import { getDatabaseConnection } from '../../../db-conn';

export const fetchShowsData = async () => {
  const connection = await getDatabaseConnection();
  try {
    const [shows] = await connection.execute<any[]>('SELECT * FROM shows');
    const [creators] = await connection.execute<any[]>('SELECT * FROM creators');
    const [showsOrder] = await connection.execute<any[]>('SELECT * FROM shows_order');

    return shows.map((show: any) => {
      const creator = creators.find((creator: any) => creator.member_id === show.show_owner);
      const isActive = showsOrder.some((order: any) => order.show_id === show.show_id);
      return {
        ...show,
        creator_identity: creator ? creator.creator_identity : null,
        show_active: isActive,
      };
    });
  } finally {
    await connection.end();
  }
};

export const fetchActiveShowsData = async (): Promise<any[]> => {
  const connection = await getDatabaseConnection();
  try {
    const [shows]: [any[], any] = await connection.execute(
      `SELECT * FROM shows WHERE show_id IN 
      (SELECT show_id FROM shows_order) 
      ORDER BY (SELECT show_order FROM shows_order WHERE shows_order.show_id = shows.show_id) ASC`
    );
    const [showsOrder]: [any[], any] = await connection.execute('SELECT * FROM shows_order');
    const [creators]: [any[], any] = await connection.execute('SELECT * FROM creators');

    return shows.map((show: any) => {
      const creator = creators.find((creator: any) => creator.member_id === show.show_owner);
      const isActive = showsOrder.find((order: any) => order.show_id === show.show_id);
      return {
        ...show,
        creator_identity: creator ? creator.creator_identity : null,
        show_order: isActive ? isActive.show_order : null,
      };
    });
  } finally {
    await connection.end();
  }
};

export const fetchProfilesData = async (): Promise<any[]> => {
  const connection = await getDatabaseConnection();
  try {
    const [creators]: [any[], any] = await connection.execute('SELECT * FROM creators');
    const [creatorsOrder]: [any[], any] = await connection.execute('SELECT * FROM creators_order');

    return creators.map((creator: any) => {
      const isActive = creatorsOrder.some((order: any) => order.member_id === creator.member_id);
      return {
        ...creator,
        creator_active: isActive,
      };
    });
  } finally {
    await connection.end();
  }
};

export const fetchActiveProfilesData = async (): Promise<any[]> => {
  const connection = await getDatabaseConnection();
  try {
    const [profiles]: [any[], any] = await connection.execute(
      `SELECT * FROM creators WHERE member_id IN 
      (SELECT member_id FROM creators_order) 
      ORDER BY (SELECT creator_order FROM creators_order WHERE creators_order.member_id = creators.member_id) ASC`
    );
    const [profilesOrder]: [any[], any] = await connection.execute('SELECT * FROM creators_order');

    return profiles.map((profile: any) => {
      const creator = profilesOrder.find((creator: any) => creator.member_id === profile.member_id);
      return {
        ...profile,
        creator_order: creator ? creator.creator_order : null,
      };
    });
  } finally {
    await connection.end();
  }
};
