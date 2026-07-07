window.storage = (function () {
  var DB_KEY = 'oneBigJumpDb';

  function demoUser() {
    return {
      id: 'demo-user',
      email: 'demo@onebigjump.com',
      username: 'demo',
      name: 'Demo User',
      password: 'demo1234',
      referralCount: 4,
      loyaltyPoints: 120
    };
  }

  function extraDemoUsers() {
    var names = [
      'Anna Johnson', 'Peter Smith', 'Esther Clark', 'Ben Turner', 'Sophie Reed',
      'Gabriel Cooper', 'Dora Bennett', 'Leon Brooks', 'Kate Morgan', 'Adam Foster',
      'Nora Bailey', 'Mark Hughes', 'Lucy Parker', 'Daniel Ward', 'Rachel Hunt',
      'Zoltan Fisher', 'Hannah Reeves', 'Balint Wood', 'Petra Simmons', 'Chris Ellis',
      'Vivien Marsh', 'Thomas Price', 'Bori Sanders', 'Gregory Ross', 'Emma Hayes',
      'Matt Coleman', 'Kinga Powell', 'Norbert Long', 'Blanka Curtis', 'Attila Barnes'
    ];

    return names.map(function (name, index) {
      var n = index + 2;
      return {
        id: 'demo-user-' + n,
        email: 'demo' + n + '@onebigjump.com',
        username: 'demo' + n,
        name: name,
        photo: 'https://i.pravatar.cc/300?img=' + n,
        referralCount: n % 6,
        loyaltyPoints: (n % 10) * 15
      };
    });
  }

  function extraDemoDogs() {
    var dogNames = [
      'Bella', 'Max', 'Charlie', 'Luna', 'Cooper', 'Daisy', 'Rocky', 'Molly',
      'Buddy', 'Sadie', 'Duke', 'Zoe', 'Bear', 'Lucy', 'Milo', 'Chloe',
      'Jack', 'Ruby', 'Leo', 'Coco', 'Oscar', 'Maggie', 'Teddy', 'Rosie',
      'Finn', 'Ellie', 'Zeus', 'Penny', 'Bruno', 'Nala'
    ];
    var breeds = [
      'labrador', 'golden_retriever', 'border_collie', 'australian_shepherd',
      'belgian_shepherd', 'german_shepherd', 'jack_russell', 'french_bulldog',
      'poodle', 'beagle', 'mixed', 'other'
    ];
    var birthdates = [
      '2019/03/12', '2020/07/22', '2021/01/05', '2018/11/30', '2022/05/17',
      '2017/09/09', '2023/02/14', '2020/12/01', '2021/06/25', '2019/08/19'
    ];

    return dogNames.map(function (dogName, index) {
      var n = index + 2;
      return {
        id: 'demo-dog-' + n,
        userId: 'demo-user-' + n,
        name: dogName,
        breed: breeds[index % breeds.length],
        birthdate: birthdates[index % birthdates.length],
        microchip: '9001234567890' + (n % 10),
        photo: 'https://placedog.net/500/500?id=' + n,
        goodDogCard: index % 2 === 0,
        gdcBronze: index % 2 === 0,
        gdcSilver: index % 4 === 0,
        gdcGold: index % 8 === 0,
        festivalVisitor: index % 3 === 0,
        healthChecked: index % 2 === 1
      };
    });
  }

  function defaultDb() {
    return {
      dogs: extraDemoDogs(),
      tickets: [],
      users: [demoUser()].concat(extraDemoUsers()),
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

  function getUserById(userId) {
    var db = getDb();
    return db.users.find(function (u) { return u.id === userId; }) || null;
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

  function getDogsByUserId(userId) {
    var db = getDb();
    return db.dogs.filter(function (d) { return d.userId === userId; });
  }

  function addDog(dog) {
    var db = getDb();
    dog.userId = db.currentUserId;
    var dogIndex = db.dogs.filter(function (d) { return d.userId === db.currentUserId; }).length;
    dog.goodDogCard = dogIndex % 2 === 0;
    dog.gdcBronze = dogIndex % 2 === 0;
    dog.gdcSilver = dogIndex % 4 === 0;
    dog.gdcGold = dogIndex % 8 === 0;
    dog.festivalVisitor = false;
    dog.healthChecked = dogIndex % 2 === 1;
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

  function getTicketsByUserId(userId) {
    var db = getDb();
    return (db.tickets || []).filter(function (t) { return t.userId === userId; });
  }

  function addTicket(ticket) {
    var db = getDb();
    if (!db.tickets) {
      db.tickets = [];
    }
    ticket.userId = db.currentUserId;
    var ticketsForEvent = db.tickets.filter(function (t) { return t.eventId === ticket.eventId; });
    ticket.ticketNumber = ticketsForEvent.length + 1;
    db.tickets.push(ticket);
    saveDb(db);
    return ticket;
  }

  function updateTicket(id, updates) {
    var db = getDb();
    var ticket = (db.tickets || []).find(function (t) { return t.id === id; });
    if (!ticket) return null;
    Object.assign(ticket, updates);
    saveDb(db);
    return ticket;
  }

  function getNotifications() {
    var db = getDb();
    return (db.notifications || [])
      .filter(function (n) { return n.userId === db.currentUserId; })
      .sort(function (a, b) { return b.createdAt - a.createdAt; });
  }

  function addNotification(notification) {
    var db = getDb();
    if (!db.notifications) {
      db.notifications = [];
    }
    notification.userId = db.currentUserId;
    notification.id = Date.now().toString() + Math.random().toString(36).slice(2);
    notification.createdAt = Date.now();
    notification.read = false;
    db.notifications.push(notification);
    saveDb(db);
    return notification;
  }

  function markNotificationRead(id) {
    var db = getDb();
    var notification = (db.notifications || []).find(function (n) { return n.id === id; });
    if (!notification) return;
    notification.read = true;
    saveDb(db);
  }

  function markAllNotificationsRead() {
    var db = getDb();
    (db.notifications || []).forEach(function (n) {
      if (n.userId === db.currentUserId) n.read = true;
    });
    saveDb(db);
  }

  function hasUnreadNotifications() {
    var db = getDb();
    return (db.notifications || []).some(function (n) { return n.userId === db.currentUserId && !n.read; });
  }

  function logStorageUsage() {
    var used = 0;
    var perKey = [];
    for (var key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        var bytes = (localStorage[key].length + key.length) * 2; // UTF-16 => 2 bytes/char
        used += bytes;
        perKey.push({ key: key, bytes: bytes });
      }
    }
    var estimatedQuota = 10 * 1024 * 1024; // ~10MB, typical Chrome default (Safari/Firefox may be lower, ~5MB)
    var usedKb = (used / 1024).toFixed(1);
    var freeKb = ((estimatedQuota - used) / 1024).toFixed(1);
    var percent = ((used / estimatedQuota) * 100).toFixed(1);
    console.log(
      '[storage] used: ' + usedKb + ' KB / ~' + (estimatedQuota / 1024).toFixed(0) + ' KB (' + percent + '%), ~free: ' + freeKb + ' KB'
    );
    perKey
      .sort(function (a, b) { return b.bytes - a.bytes; })
      .forEach(function (entry) {
        console.log('  - ' + entry.key + ': ' + (entry.bytes / 1024).toFixed(1) + ' KB');
      });
  }

  function deleteCurrentUser() {
    var db = getDb();
    var userId = db.currentUserId;
    db.dogs = db.dogs.filter(function (d) { return d.userId !== userId; });
    db.tickets = (db.tickets || []).filter(function (t) { return t.userId !== userId; });
    db.notifications = (db.notifications || []).filter(function (n) { return n.userId !== userId; });
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
    getDogsByUserId: getDogsByUserId,
    addDog: addDog,
    updateDog: updateDog,
    getTickets: getTickets,
    getTicketsByUserId: getTicketsByUserId,
    addTicket: addTicket,
    updateTicket: updateTicket,
    getUsers: getUsers,
    addUser: addUser,
    getCurrentUser: getCurrentUser,
    getUserById: getUserById,
    setCurrentUser: setCurrentUser,
    loginUser: loginUser,
    updateUser: updateUser,
    getNotifications: getNotifications,
    addNotification: addNotification,
    markNotificationRead: markNotificationRead,
    markAllNotificationsRead: markAllNotificationsRead,
    hasUnreadNotifications: hasUnreadNotifications,
    deleteCurrentUser: deleteCurrentUser,
    logStorageUsage: logStorageUsage
  };
})();
