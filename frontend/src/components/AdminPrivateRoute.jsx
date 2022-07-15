// import React from 'react'
// import { useSelector } from 'react-redux'
// import RedirectToAdmin from './RedirectToAdmin'

// function AdminPrivateRoute({ children }) {
//     const { user } = useSelector((state) => state.auth)
//     console.log(user ? user.result.roles : "")
//     return user ? user.result.roles : "" === "user" ? children : <RedirectToAdmin />
// }

// export default AdminPrivateRoute