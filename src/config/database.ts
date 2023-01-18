class DatabaseSingleton {
  private static instace: DatabaseSingleton;

  private constructor() {
    // connect to database
  }

  static getInstace() {
    if (!this.instace) {
      this.instace = new DatabaseSingleton();
      return this.instace;
    }
    return this.instace;
  }
}

export default DatabaseSingleton.getInstace();
