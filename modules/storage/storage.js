window.storage = (function () {
  var DB_KEY = 'oneBigJumpDb';

  function defaultDb() {
    return {
      dogs: [],
      tickets: []
    };
  }

  function getDb() {
    var raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      var db = defaultDb();
      saveDb(db);
      return db;
    }
    return JSON.parse(raw);
  }

  function saveDb(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }

  function getDogs() {
    return getDb().dogs;
  }

  function addDog(dog) {
    var db = getDb();
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
    return db.tickets || [];
  }

  function addTicket(ticket) {
    var db = getDb();
    if (!db.tickets) {
      db.tickets = [];
    }
    db.tickets.push(ticket);
    saveDb(db);
    return ticket;
  }

  return {
    getDb: getDb,
    saveDb: saveDb,
    getDogs: getDogs,
    addDog: addDog,
    updateDog: updateDog,
    getTickets: getTickets,
    addTicket: addTicket
  };
})();
