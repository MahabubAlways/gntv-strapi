import mysql from 'mysql2/promise';

export const getDatabaseConnection = async () => {
  return await mysql.createConnection({
    host: '216.225.203.234',
    user: 'devdb',
    password: '1t_f1m71G',
    database: 'Staging_Interocitor',
  });
};
