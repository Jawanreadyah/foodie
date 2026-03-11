export const DatabaseError = class extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
  }
};
