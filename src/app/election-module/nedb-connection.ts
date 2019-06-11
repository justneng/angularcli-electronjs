exports.get = () => {
  const DataStore = require('nedb');
  let appDataSource: any = {};
  appDataSource.user = new DataStore(
    {
      filename: 'src/resource/database/user.db',
      createdAt: true,
      timestampData: true,
      autoload: true
    }
  );
  appDataSource.department = new DataStore(
    {
      filename: 'src/resource/database/department.db',
      createdAt: true,
      timestampData: true,
      autoload: true
    }
  );

  return appDataSource;
};
