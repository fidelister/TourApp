// export const authAdmin = (permissions) => {
//     return (req, res, next) => {
//         const userRole = req.body.roles
//         console.log(req.user)
//         if (permissions.includes(userRole)) {
//             next()
//         } else {
//             return res.status(401).json("You don't have the permissions")
//         }
//     }
// }
