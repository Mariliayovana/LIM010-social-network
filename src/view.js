/* eslint-disable no-console */
// aqui exportaras las funciones que necesites
import {
  loginEmail,
  loginFacebook,
  loginGoogle,
  loginRegister,
  emailVerification,
  loginOut,
  observador,
} from './controller/control.js';

const changeRoute = (route) => {
  window.location.hash = route;
};

const maysFirst = (string) => {
  const resultFirst = string.charAt(0).toUpperCase() + string.slice(1);
  return resultFirst;
};

export const viewLogin = () => {
  window.event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  loginEmail(email, password).then((result) => {
    observador();
    console.log(result.user.emailVerified);
    if (result.user.emailVerified === false) {
      document.getElementById('error').innerHTML = 'No has verificado tu dirección de email';
    } else {
      return changeRoute('#/home');
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

export const viewRegister = () => {
  window.event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  loginRegister(email, password).then(() => {
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

export const viewExit = () => {
  loginOut().then(() => {
    // Sign-out successful.
    console.log('Saliendo....');
    return changeRoute('#/login');
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
};

export const viewFacebook = () => {
  loginFacebook().then((response) => {
    console.log(response);
    return changeRoute('#/home');
  }).catch((error) => {
    console.log(error);
    // if (error.message ===
    // 'An account already exists with the same email address but different sign-in credentials.
    // Sign in using a provider associated with this email address.') {
    return changeRoute('#/home');
    // }
  });
};

export const viewGoogle = () => {
  loginGoogle().then((response) => {
    console.log(response);
    return changeRoute('#/home');
  }).catch((error) => {
    console.log(error);
  });
};