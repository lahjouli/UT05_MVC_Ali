

"use strict";

export class ResourceError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ResourceError';
    }
  }