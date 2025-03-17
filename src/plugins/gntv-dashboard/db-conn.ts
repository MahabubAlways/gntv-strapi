import mysql from 'mysql2/promise';

export const getDatabaseConnection = async () => {
  return await mysql.createConnection({
    host: '216.225.203.234',
    user: 'devdb',
    password: '1t_f1m71G',
    database: 'Staging_Interocitor',
  });
};

// export const getDatabaseConnection = async () => {
//   return await mysql.createConnection({
//     host: '74.208.197.45',
//     user: 'panel_get',
//     password: 'Dckime03752017$$%nfASDbda',
//     database: 'InterocitorDB',
//   });
// };
