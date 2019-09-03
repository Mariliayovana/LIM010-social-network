/* eslint-disable no-console */
// aqui exportaras las funciones que necesites
import {
  loginEmail,
  loginFacebook,
  loginGoogle,
  loginRegister,
  currentUser,
  loginOut,
} from './model/model-firebase.js';

import { addPost } from './model/model-firestore.js';

const changeRoute = (route) => {
  window.location.hash = route;
};

const maysFirst = (string) => {
  const resultFirst = string.charAt(0).toUpperCase() + string.slice(1);
  return resultFirst;
};
export const controllerLogin = () => {
  window.event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  loginEmail(email, password).then((result) => {
    // observador();
    console.log(result);
    console.log(result.user.emailVerified);
    if (result.user.emailVerified === false) {
      document.getElementById('error').innerHTML = 'No has verificado tu dirección de email';
    } else {
      changeRoute('#/home');
    }
  }).catch((error) => {
    const errorMessage = error.message;
    if (email === '' || password === '') {
      document.getElementById('error').innerHTML = 'Ingresa los campos completos';
    } else if (errorMessage) {
      document.getElementById('error').innerHTML = 'La contraseña no es válida o el usuario no está registrado.';
    }
  });
};
const emailVerification = () => {
  currentUser().sendEmailVerification()
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
};

export const controllerRegister = () => {
  window.event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  loginRegister(email, password).then((response) => {
    console.log(response);
    emailVerification();
    if (name !== '') {
      // console.log(user);
      const newName = maysFirst(name.toLowerCase());
      document.getElementById('screen-register').innerHTML = `
      <h1 class="register-ok">Foods Kids agradece tu registro ${newName}!</h1>
      <p class="ok">Verifica tu cuenta email para acceder a Foods Kids</p>
      <img src="../img/confeti.gif">
      <a class="ir-login" href="#/login" id="registrate">Ir a Log in</a>`;
    } else {
      document.getElementById('screen-register').innerHTML = `
      <h1 class="register-ok">Foods Kids agradece tu registro!</h1>
      <p class="ok">Verifica tu cuenta email para acceder a Foods Kids</p>
      <img src="../img/confeti.gif">
      <a class="ir-login" href="#/login" id="registrate">Ir a Log in</a>`;
    }
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorMessage === 'The email address is badly formatted.') {
      document.getElementById('error').innerHTML = 'Completa correctamente los campos.';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      document.getElementById('email').classList.add('focus');
      document.getElementById('password').classList.add('focus');
    } else if (errorCode === 'auth/weak-password') {
      document.getElementById('error').innerHTML = 'La contraseña debe tener 6 caracteres o más.';
      document.getElementById('password').value = '';
      document.getElementById('email').classList.remove('focus');
      document.getElementById('password').classList.add('focus');
    } else {
      document.getElementById('error').innerHTML = 'Ya existe un registro con ésta cuenta';
    }
  });
};

export const controllerExit = () => {
  loginOut().then((response) => {
    // Sign-out successful.
    changeRoute('#/login');
    console.log('Saliendo....');
    console.log(response);
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
};

export const controllerFacebook = () => {
  loginFacebook().then((response) => {
    console.log(response);
    changeRoute('#/home');
  }).catch((error) => {
    console.log(error);
  });
};

export const controllerGoogle = () => {
  loginGoogle().then((response) => {
    console.log(response);
    console.log(currentUser());
    changeRoute('#/home');
  }).catch((error) => {
    console.log(error);
  });
};

export const timePublic = () => {
  const f = new Date();
  const mes = f.getMonth() + 1;
  const cad = `${f.getDate()}/${mes}/${f.getFullYear()} - ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`;
  console.log(cad);
  window.status = cad;
  return window.status;
};
export const createPost = () => {
  const comentario = document.getElementById('comentario').value;
  const privacidad = document.getElementById('post-privacy').value;
  const date = timePublic();
  let likes = document.getElementById('contador');
  likes = 0;
  console.log(privacidad);
  addPost(comentario, currentUser().email, currentUser().uid, privacidad, likes, date)
    .then((response) => {
      document.getElementById('comentario').value = '';
      console.log('se agrego a tu colleccion', response.id);
    }).catch((error) => {
      console.log('no se agrego', error);
    });
};
