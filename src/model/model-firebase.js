const loginEmail = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

// eslint-disable-next-line max-len
const loginRegister = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

// para salir de la sesión de un usuario//
const loginOut = () => firebase.auth().signOut();

const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const loginFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
// propiedad que usuario esta activo//
const currentUser = () => firebase.auth().currentUser;

export {
  loginEmail,
  loginRegister,
  loginOut,
  loginGoogle,
  loginFacebook,
  currentUser,
};
