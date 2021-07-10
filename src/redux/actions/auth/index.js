// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import { loginSuperAdmin, registerSuperAdmin } from '../../../api/auth.api'

const config = useJwt.jwtConfig

// ** Handle User Login
// export const handleLogin = data => {
//   return dispatch => {
//     dispatch({
//       type: 'LOGIN',
//       data,
//       config,
//       [config.storageTokenKeyName]: data[config.storageTokenKeyName],
//       [config.storageRefreshTokenKeyName]: data[config.storageRefreshTokenKeyName]
//     })

//     // ** Add to user, accessToken & refreshToken to localStorage
//     localStorage.setItem('userData', JSON.stringify(data))
//     localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.accessToken))
//     localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(data.refreshToken))
//   }
// }

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userData')
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}

export const handleLogin = (data, cb) => {
  return async (dispatch) => {
    try {
      const resp = await loginSuperAdmin(data)
      debugger
      dispatch({
        type: 'ADMIN_LOGIN',
        data: resp
      })
      localStorage.setItem('userData', JSON.stringify(resp.data))
      if (cb) cb()
    } catch (error) {
      console.log(error)
    }
  }
}

export const handleSuperAdminRegister = (data, cb) => {
  return async dispatch => {
    try {
      const resp = await registerSuperAdmin(data)
      dispatch({
        type: 'ADMIN_REGISTER',
        data: resp
      })
      localStorage.setItem('userData', JSON.stringify(resp))
      if (cb) cb(resp.user.emailVerificationStatus)
    } catch (error) {
      console.log(error)
    }
  }
}
