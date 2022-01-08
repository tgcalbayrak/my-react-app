const STORE_NAME = 'hotels-store';

export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem(STORE_NAME);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(STORE_NAME, serializedState);
  } catch (error) {
    // Ignore write errors.
  }
};

export {
  STORE_NAME
}