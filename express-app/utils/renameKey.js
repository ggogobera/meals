function renameKey(object, oldKey, newKey) {
  if (oldKey !== newKey && object.hasOwnProperty(oldKey)) {
    Object.defineProperty(object, newKey, Object.getOwnPropertyDescriptor(object, oldKey));
    delete object[oldKey];
  }

  return object;
}

module.exports = renameKey;
