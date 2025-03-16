'use strict';
import { getDatabaseConnection } from '../../../db-conn';

interface ShowData {
  show_video_url: string;
  show_title: string;
  show_artist: string;
  show_description: string;
  thumbnail_url: string;
  show_id: number;
}

export const postShowUpdate = async (showData: ShowData): Promise<void> => {
  const connection = await getDatabaseConnection();

  try {
    const query =
      'UPDATE shows SET show_title = ?, show_artist = ?, show_description = ?, show_video_url = ?, thumbnail_url = ? WHERE show_id = ?';

    // Run update for each show in showData
    await connection.execute(query, [
      showData.show_title,
      showData.show_artist,
      showData.show_description,
      showData.show_video_url,
      showData.thumbnail_url,
      showData.show_id,
    ]);
  } finally {
    await connection.end();
  }
};

export default postShowUpdate;
