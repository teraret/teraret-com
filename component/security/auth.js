import serverUrl from '../../config';
import {checkResponseStatus} from '../handlers/responseHandlers';
import 'whatwg-fetch';
import qs from 'qs';
import localStorage from 'localStorage';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  logIn(auth) { 
    localStorage.setItem('auth',JSON.stringify(auth));
  },
  logOut() { 
    localStorage.clear();
  },
  refreshToken() { 
    return fetch(serverUrl+'/oauth/access_token',
      { method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: qs.stringify({ 
          grant_type: 'refresh_token',
          refresh_token: JSON.parse(localStorage.getItem('auth')).refresh_token
        })
      })
      .then(checkResponseStatus)
      .then((a) =>  localStorage.setItem(JSON.stringify(a)))
      .catch(() => { throw new Error("Unable to refresh!")})
  },
  loggedIn() {  
    return localStorage.getItem('auth');
  }
};