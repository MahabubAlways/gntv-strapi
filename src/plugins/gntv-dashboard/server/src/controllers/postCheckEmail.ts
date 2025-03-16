'use strict';
import { getDatabaseConnection } from '../../../db-conn';

interface CreatorData {
  email: string;
}

interface CheckEmailResult {
  eligible: boolean;
  memberId?: string;
}

export const postCheckEmail = async (creatorData: CreatorData): Promise<CheckEmailResult> => {
  const connection = await getDatabaseConnection();

  try {
    const query = 'SELECT member_id, COUNT(*) as count FROM members WHERE email = ?';
    const [rows] = await connection.execute(query, [creatorData.email]);

    if (rows[0].count === 0) {
      return { eligible: false };
    } else {
      return { eligible: true, memberId: rows[0].member_id };
    }
  } finally {
    await connection.end();
  }
};

export default postCheckEmail;
