db.createUser({
  user: 'root',
  pwd: 'abcd1234',
  roles: [
    {
      role: 'readWrite',
      db: 'vfastadmin',
    },
  ],
});
