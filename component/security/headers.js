// eslint-disable-next-line import/no-anonymous-default-export
import localStorage from 'localStorage';
// eslint-disable-next-line import/no-anonymous-default-export
export default () => { //<1>
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+(localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).data.access_token : null)
    }
  }