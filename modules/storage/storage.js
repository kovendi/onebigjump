window.storage = (function () {
  var DB_KEY = 'oneBigJumpDb';

  function demoUser() {
    return {
      id: 'demo-user',
      email: 'demo@onebigjump.com',
      username: 'demo',
      name: 'Demo User',
      password: 'demo1234'
    };
  }

  function defaultDb() {
    return {
      dogs: [],
      tickets: [],
      users: [demoUser()],
      currentUserId: null
    };
  }

  function getDb() {
    var raw = localStorage.getItem(DB_KEY);
    var db = raw ? JSON.parse(raw) : defaultDb();
    var changed = !raw;

    if (!db.users) {
      db.users = [];
      changed = true;
    }
    if (db.users.length === 0) {
      db.users.push(demoUser());
      changed = true;
    }
    if (!db.currentUserId || !db.users.some(function (u) { return u.id === db.currentUserId; })) {
      db.currentUserId = db.users[0].id;
      changed = true;
    }

    if (changed) {
      saveDb(db);
    }
    return db;
  }

  function saveDb(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }

  function getUsers() {
    return getDb().users;
  }

  function addUser(user) {
    var db = getDb();
    db.users.push(user);
    saveDb(db);
    return user;
  }

  function getCurrentUser() {
    var db = getDb();
    return db.users.find(function (u) { return u.id === db.currentUserId; }) || null;
  }

  function setCurrentUser(userId) {
    var db = getDb();
    db.currentUserId = userId;
    saveDb(db);
    return getCurrentUser();
  }

  function loginUser(email, password) {
    var db = getDb();
    var user = db.users.find(function (u) { return u.email === email && u.password === password; });
    if (!user) return null;
    return setCurrentUser(user.id);
  }

  function updateUser(updates) {
    var db = getDb();
    var user = db.users.find(function (u) { return u.id === db.currentUserId; });
    if (!user) return null;
    Object.assign(user, updates);
    saveDb(db);
    return user;
  }

  function getDogs() {
    var db = getDb();
    return db.dogs.filter(function (d) { return d.userId === db.currentUserId; });
  }

  function addDog(dog) {
    var db = getDb();
    dog.userId = db.currentUserId;
    var dogIndex = db.dogs.filter(function (d) { return d.userId === db.currentUserId; }).length;
    dog.goodDogCard = dogIndex % 2 === 0;
    db.dogs.push(dog);
    saveDb(db);
    return dog;
  }

  function updateDog(id, updates) {
    var db = getDb();
    var dog = db.dogs.find(function (d) { return d.id === id; });
    if (!dog) return null;
    Object.assign(dog, updates);
    saveDb(db);
    return dog;
  }

  function getTickets() {
    var db = getDb();
    return (db.tickets || []).filter(function (t) { return t.userId === db.currentUserId; });
  }

  function addTicket(ticket) {
    var db = getDb();
    if (!db.tickets) {
      db.tickets = [];
    }
    ticket.userId = db.currentUserId;
    db.tickets.push(ticket);
    saveDb(db);
    return ticket;
  }

  function deleteCurrentUser() {
    var db = getDb();
    var userId = db.currentUserId;
    db.dogs = db.dogs.filter(function (d) { return d.userId !== userId; });
    db.tickets = (db.tickets || []).filter(function (t) { return t.userId !== userId; });
    if (userId === 'demo-user') {
      var userIndex = db.users.findIndex(function (u) { return u.id === userId; });
      if (userIndex !== -1) {
        db.users[userIndex] = demoUser();
      }
    } else {
      db.users = db.users.filter(function (u) { return u.id !== userId; });
    }
    db.currentUserId = null;
    saveDb(db);
  }

  return {
    getDb: getDb,
    saveDb: saveDb,
    getDogs: getDogs,
    addDog: addDog,
    updateDog: updateDog,
    getTickets: getTickets,
    addTicket: addTicket,
    getUsers: getUsers,
    addUser: addUser,
    getCurrentUser: getCurrentUser,
    setCurrentUser: setCurrentUser,
    loginUser: loginUser,
    updateUser: updateUser,
    deleteCurrentUser: deleteCurrentUser
  };
})();
