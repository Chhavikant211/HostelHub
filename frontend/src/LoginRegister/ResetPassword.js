// import React, { useState } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import api from '../api'; // ✅ Use your centralized API instance
// import '../styles/ResetPassword.css';

// function ResetPassword({ userType: propUserType }) {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { token } = useParams();
//   const location = useLocation();

//   // ✅ FORCE OVERRIDE - determine userType from URL directly
//   let userType;
  
//   console.log('=== USERTYPE DETECTION DEBUG ===');
//   console.log('1. Props userType:', propUserType);
//   console.log('2. Current pathname:', location.pathname);
//   console.log('3. Window location:', window.location.pathname);
  
//   // Force check the actual current URL
//   const currentPath = window.location.pathname;
//   console.log('4. Checking window.location.pathname:', currentPath);
  
//   if (currentPath.includes('reset-password-student')) {
//     userType = 'student';
//     console.log('5. FORCED STUDENT from window.location');
//   } else if (currentPath.includes('reset-password-owner')) {
//     userType = 'owner';
//     console.log('5. FORCED OWNER from window.location');
//   } else if (propUserType) {
//     userType = propUserType;
//     console.log('5. Using props userType:', propUserType);
//   } else {
//     userType = 'student'; // Since you're testing student, default to student
//     console.log('5. DEFAULTING TO STUDENT for testing');
//   }
  
//   console.log('6. FINAL userType:', userType);
//   console.log('7. Will call endpoint:', userType === 'student' ? '/reset-password-student' : '/reset-password-owner');
//   console.log('===============================');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // ✅ Add debugging to see actual values
//     console.log('Password values before validation:');
//     console.log('newPassword:', newPassword);
//     console.log('newPassword type:', typeof newPassword);
//     console.log('newPassword length:', newPassword?.length);
//     console.log('confirmPassword:', confirmPassword);
    
//     if (newPassword !== confirmPassword) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Passwords do not match',
//         text: 'Please make sure your passwords match.',
//       });
//       return;
//     }

//     // ✅ Fixed password validation regex
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
//     if (!passwordRegex.test(newPassword)) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid Password',
//         text: 'Password must be at least 8 characters long and contain uppercase, lowercase, number and special character',
//       });
//       return;
//     }

//     setLoading(true);
    
//     try {
//       // ✅ Match your App.js routing pattern
//       const endpoint = userType === 'student'
//         ? '/reset-password-student'
//         : '/reset-password-owner';
      
//       console.log('Using endpoint:', endpoint);
//       console.log('Token:', token);
//       console.log('UserType determined as:', userType);
      
//       // ✅ Create request data object properly
//       const requestData = { 
//         token: token,
//         newPassword: newPassword  // Don't convert to String(), just use the value directly
//       };
      
//       console.log('Request data being sent:');
//       console.log('- token:', requestData.token);
//       console.log('- newPassword type:', typeof requestData.newPassword);
//       console.log('- newPassword length:', requestData.newPassword?.length);
//       console.log('- newPassword first 3 chars:', requestData.newPassword?.substring(0, 3) + '...');
      
//       const response = await api.post(endpoint, requestData);
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Password Reset Successful!',
//         text: 'Your password has been reset. Please login with your new password.',
//       });
      
//       navigate(userType === 'student' ? '/student-login' : '/owner-login');
//     } catch (error) {
//       console.error('Reset Error Details:');
//       console.error('- Error object:', error);
//       console.error('- Response status:', error?.response?.status);
//       console.error('- Response data:', error?.response?.data);
//       console.error('- Response headers:', error?.response?.headers);
//       console.error('- Request config:', error?.config);
      
//       let errorMessage = 'Something went wrong. Please try again.';
      
//       if (error?.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error?.response?.status === 400) {
//         errorMessage = 'Invalid request. Please check your token and try again.';
//       } else if (error?.response?.status === 404) {
//         errorMessage = 'Reset token not found or expired. Please request a new password reset.';
//       }
      
//       Swal.fire({
//         icon: 'error',
//         title: 'Reset Failed',
//         text: errorMessage,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="reset-password-container">
//       <div className="reset-password-card">
//         <h2>Reset Password</h2>
//         <p>Please enter your new password below.</p>
        
//         {/* Debug: Show current userType */}
//         <p style={{ fontSize: '12px', color: '#666' }}>
//           Current user type: {userType || 'undefined'}
//         </p>
        
//         <form onSubmit={handleSubmit}>
//           {/* 🔍 Debug info - remove this after fixing */}
//           <div style={{ 
//             background: '#f0f0f0', 
//             padding: '10px', 
//             margin: '10px 0', 
//             fontSize: '12px',
//             border: '1px solid #ccc'
//           }}>
//             <strong>DEBUG INFO:</strong><br/>
//             Window URL: {window.location.pathname}<br/>
//             React Router URL: {location.pathname}<br/>
//             UserType: <strong style={{color: userType === 'student' ? 'green' : 'red'}}>{userType}</strong><br/>
//             Props UserType: {propUserType}<br/>
//             Token: {token}<br/>
//             Expected endpoint: <strong>{userType === 'student' ? '/reset-password-student' : '/reset-password-owner'}</strong>
//           </div>
          
//           <div className="form-group">
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               placeholder="New Password"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm New Password"
//               required
//             />
//           </div>
//           <button type="submit" className="submit-button" disabled={loading}>
//             {loading ? 'Resetting...' : 'Reset Password'}
//           </button>
//         </form>
//         <div className="back-to-login">
//           <button onClick={() => navigate(userType === 'student' ? '/student-login' : '/owner-login')}>
//             Back to Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;













// // import React, { useState } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import Swal from 'sweetalert2';
// // import '../styles/ResetPassword.css';

// // function ResetPassword() {
// //   const [newPassword, setNewPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();
// //   const { token, userType } = useParams();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (newPassword !== confirmPassword) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Passwords do not match',
// //         text: 'Please make sure your passwords match.',
// //       });
// //       return;
// //     }

// //     // Password validation
// //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// //     if (!passwordRegex.test(newPassword)) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Invalid Password',
// //         text: 'Password must be at least 8 characters long and contain uppercase, lowercase, number and special character',
// //       });
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const endpoint = userType === 'student' ? '/reset-password-student' : '/reset-password-owner';
// //       const response = await fetch(`http://localhost:5000${endpoint}`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         credentials: 'include',
// //         body: JSON.stringify({ token, newPassword }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         Swal.fire({
// //           icon: 'success',
// //           title: 'Password Reset Successful!',
// //           text: 'Your password has been reset. Please login with your new password.',
// //         });
// //         navigate(userType === 'student' ? '/student-login' : '/owner-login');
// //       } else {
// //         Swal.fire({
// //           icon: 'error',
// //           title: 'Error',
// //           text: data.message || 'Something went wrong. Please try again.',
// //         });
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error',
// //         text: 'An unexpected error occurred. Please try again.',
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="reset-password-container">
// //       <div className="reset-password-card">
// //         <h2>Reset Password</h2>
// //         <p>Please enter your new password below.</p>
        
// //         <form onSubmit={handleSubmit}>
// //           <div className="form-group">
// //             <input
// //               type="password"
// //               value={newPassword}
// //               onChange={(e) => setNewPassword(e.target.value)}
// //               placeholder="New Password"
// //               required
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <input
// //               type="password"
// //               value={confirmPassword}
// //               onChange={(e) => setConfirmPassword(e.target.value)}
// //               placeholder="Confirm New Password"
// //               required
// //             />
// //           </div>
          
// //           <button type="submit" className="submit-button" disabled={loading}>
// //             {loading ? 'Resetting...' : 'Reset Password'}
// //           </button>
// //         </form>

// //         <div className="back-to-login">
// //           <button onClick={() => navigate(userType === 'student' ? '/student-login' : '/owner-login')}>
// //             Back to Login
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ResetPassword; 
