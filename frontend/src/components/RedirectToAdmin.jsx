// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const RedirectToAdmin = () => {
//   const [count, setCount] = useState(5);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCount((currentCount) => --currentCount);
//     }, 1000);
//     count === 0 && navigate("/admin");
//     return () => clearInterval(interval);
//   }, [count, navigate]);
//   return (
//     <div style={{ marginTop: "5rem" }}>
//       <h5>Redirecting you in {count} seconds</h5>
//     </div>
//   );
// };

// export default RedirectToAdmin;
