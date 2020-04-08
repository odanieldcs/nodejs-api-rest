db.createUser({
  user: 'user-db',
  pwd: 'password-db',
  roles: [
    {
      role: 'readWrite',
      db: 'database',
    },
  ],
})
