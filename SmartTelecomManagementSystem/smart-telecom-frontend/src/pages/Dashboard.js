// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [plans, setPlans] = useState([]);
//   const [error, setError] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [editFormData, setEditFormData] = useState({});

//   useEffect(() => {
//     if (!user || !user.role) return;

//     const fetchPlans = async () => {
//       try {
//         let url = "";

//         if (user.role.toLowerCase() === "customer") {
//           url = "http://localhost:9003/users";
//         } else if (user.role.toLowerCase() === "admin") {
//           url = "http://localhost:9002/plans";
//         } else {
//           throw new Error(`Unsupported role: ${user.role}`);
//         }

//         const response = await axios.get(url, {
//           headers: {
//             Authorization: `Bearer ${user.token}`, // Remove if not needed
//           },
//         });
//         setPlans(response.data);
//         setError(null);
//       } catch (err) {
//         setError("Failed to load data");
//       }
//     };

//     fetchPlans();
//   }, [user]);

//   // Start editing a plan
//   const handleEditClick = (plan) => {
//     setEditingId(plan.id);
//     setEditFormData({ ...plan });
//   };

//   // Cancel editing
//   const handleCancelClick = () => {
//     setEditingId(null);
//     setEditFormData({});
//   };

//   // Handle input changes in edit form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit updated plan
//   const handleUpdateClick = async () => {
//     try {
//       await axios.put(`http://localhost:9002/plans/${editingId}`, editFormData, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       // Update local state
//       setPlans((prev) =>
//         prev.map((plan) => (plan.id === editingId ? editFormData : plan))
//       );
//       setEditingId(null);
//       setError(null);
//     } catch (err) {
//       setError("Update failed");
//     }
//   };

//   // Delete plan
//   const handleDeleteClick = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this plan?")) return;

//     try {
//       await axios.delete(`http://localhost:9002/plans/${id}`, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setPlans((prev) => prev.filter((plan) => plan.id !== id));
//       setError(null);
//     } catch (err) {
//       setError("Delete failed");
//     }
//   };

//   // Admin view with dynamic headers and editable table
//   if (user?.role.toLowerCase() === "admin") {
//     return (
//       <div className="container mt-4">
//         <h2>Welcome, {user?.sub} (Admin)</h2>
//         {error && <div className="alert alert-danger">{error}</div>}

//         <h3 className="mb-3">Manage Plans</h3>

//         <table style={styles.table}>
//           <thead>
//             <tr>
//               {/* Dynamically generate headers */}
//               {plans.length > 0 &&
//                 Object.keys(plans[0]).map((key) => (
//                   <th key={key} style={styles.th}>
//                     {key.charAt(0).toUpperCase() + key.slice(1)}
//                   </th>
//                 ))}

//               {/* Actions column */}
//               <th style={styles.th}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {plans.map((plan) => (
//               <tr key={plan.id} style={styles.tr}>
//                 {Object.keys(plan).map((key) => (
//                   <td key={key} style={styles.td}>
//                     {editingId === plan.id && key !== "id" ? (
//                       <input
//                         type={
//                           key === "price" || key === "validity" ? "number" : "text"
//                         }
//                         name={key}
//                         value={editFormData[key] || ""}
//                         onChange={handleInputChange}
//                         style={styles.input}
//                       />
//                     ) : (
//                       plan[key]
//                     )}
//                   </td>
//                 ))}

//                 <td style={styles.td}>
//                   {editingId === plan.id ? (
//                     <>
//                       <button
//                         style={{ ...styles.button, ...styles.saveButton }}
//                         onClick={handleUpdateClick}
//                       >
//                         Update
//                       </button>
//                       <button
//                         style={{ ...styles.button, ...styles.cancelButton }}
//                         onClick={handleCancelClick}
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         style={{ ...styles.button, ...styles.editButton }}
//                         onClick={() => handleEditClick(plan)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         style={{ ...styles.button, ...styles.deleteButton }}
//                         onClick={() => handleDeleteClick(plan.id)}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   // Customer or other roles view
//   return (
//     <div className="container mt-4">
//       <h2>
//         Welcome, {user?.sub} ({user?.role})
//       </h2>
//       {error && <div className="alert alert-danger">{error}</div>}

//       <h4>Available Plans:</h4>
//       <ul className="list-group">
//         {plans.map((plan) => (
//           <li key={plan.id} className="list-group-item">
//             <strong>{plan.name}</strong> - {plan.type} - ₹{plan.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// const styles = {
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
//   },
//   th: {
//     backgroundColor: "#4a90e2",
//     color: "white",
//     padding: "12px",
//     textAlign: "left",
//     borderBottom: "2px solid #ddd",
//   },
//   tr: {
//     borderBottom: "1px solid #ddd",
//     transition: "background-color 0.3s ease",
//   },
//   td: {
//     padding: "12px",
//     verticalAlign: "middle",
//   },
//   input: {
//     width: "100%",
//     padding: "6px 8px",
//     fontSize: "1rem",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     margin: "0 4px",
//     padding: "6px 12px",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "0.9rem",
//     transition: "background-color 0.3s ease",
//   },
//   editButton: {
//     backgroundColor: "#4caf50",
//     color: "white",
//   },
//   saveButton: {
//     backgroundColor: "#2196f3",
//     color: "white",
//   },
//   cancelButton: {
//     backgroundColor: "#f44336",
//     color: "white",
//   },
//   deleteButton: {
//     backgroundColor: "#e91e63",
//     color: "white",
//   },
// };

// lav's code
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [plans, setPlans] = useState([]);
//   const [error, setError] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [editFormData, setEditFormData] = useState({});
//   const [isAdding, setIsAdding] = useState(false);
//   const [newPlanData, setNewPlanData] = useState({});

//   useEffect(() => {
//     if (!user || !user.role) return;

//     const fetchPlans = async () => {
//       try {
//         let url = "";

//         if (user.role.toLowerCase() === "customer") {
//           url = "http://localhost:9003/users";
//         } else if (user.role.toLowerCase() === "admin") {
//           url = "http://localhost:9002/plans";
//         } else {
//           throw new Error(`Unsupported role: ${user.role}`);
//         }

//         const response = await axios.get(url, {
//           headers: {
//             Authorization: `Bearer ${user.token}`, // Remove if not needed
//           },
//         });
//         setPlans(response.data);
//         setError(null);
//       } catch (err) {
//         setError("Failed to load data");
//       }
//     };

//     fetchPlans();
//   }, [user]);

//   // Start editing a plan
//   const handleEditClick = (plan) => {
//     setEditingId(plan.id);
//     setEditFormData({ ...plan });
//     setIsAdding(false);
//   };

//   // Cancel editing or adding
//   const handleCancelClick = () => {
//     setEditingId(null);
//     setEditFormData({});
//     setIsAdding(false);
//     setNewPlanData({});
//   };

//   // Handle input changes in edit form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editingId !== null) {
//       setEditFormData((prev) => ({ ...prev, [name]: value }));
//     } else if (isAdding) {
//       setNewPlanData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Submit updated plan
//   const handleUpdateClick = async () => {
//     try {
//       await axios.put(`http://localhost:9002/plans/${editingId}`, editFormData, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       // Update local state
//       setPlans((prev) =>
//         prev.map((plan) => (plan.id === editingId ? editFormData : plan))
//       );
//       setEditingId(null);
//       setError(null);
//     } catch (err) {
//       setError("Update failed");
//     }
//   };

//   // Delete plan
//   const handleDeleteClick = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this plan?")) return;

//     try {
//       await axios.delete(`http://localhost:9002/plans/${id}`, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setPlans((prev) => prev.filter((plan) => plan.id !== id));
//       setError(null);
//     } catch (err) {
//       setError("Delete failed");
//     }
//   };

//   // Add new plan submit
//   const handleAddClick = async () => {
//     try {
//       const response = await axios.post(`http://localhost:9002/plans`, newPlanData, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setPlans((prev) => [...prev, response.data]); // Add new plan to state
//       setIsAdding(false);
//       setNewPlanData({});
//       setError(null);
//     } catch (err) {
//       setError("Add failed");
//     }
//   };

//   if (user?.role.toLowerCase() === "admin") {
//     // Get all keys for headers (including new plan keys if adding)
//     const headers = plans.length > 0 ? Object.keys(plans[0]) : [];

//     return (
//       <div className="container mt-4">
//         <h2>Welcome, {user?.sub} (Admin)</h2>
//         {error && <div className="alert alert-danger">{error}</div>}

//         <h3 className="mb-3">Manage Plans</h3>

//         <button
//           onClick={() => {
//             setIsAdding(true);
//             setEditingId(null);
//             setNewPlanData({});
//           }}
//           style={{ ...styles.button, marginBottom: "10px" }}
//           disabled={isAdding || editingId !== null}
//         >
//           Add New Plan
//         </button>

//         <table style={styles.table}>
//           <thead>
//             <tr>
//               {headers.map((key) => (
//                 <th key={key} style={styles.th}>
//                   {key.charAt(0).toUpperCase() + key.slice(1)}
//                 </th>
//               ))}
//               <th style={styles.th}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* New Plan Row */}
//             {isAdding && (
//               <tr style={styles.tr}>
//                 {headers.map((key) => (
//                   <td key={key} style={styles.td}>
//                     {/* ID field typically generated by backend, so disable input */}
//                     {key === "id" ? (
//                       "-"
//                     ) : (
//                       <input
//                         type={
//                           key === "price" || key === "validity" ? "number" : "text"
//                         }
//                         name={key}
//                         value={newPlanData[key] || ""}
//                         onChange={handleInputChange}
//                         style={styles.input}
//                         placeholder={`Enter ${key}`} 
//                       />
//                     )}
//                   </td>
                  
//                 ))}
//                 <td style={styles.td}>
//                   <button
//                     style={{ ...styles.button, ...styles.saveButton }}
//                     onClick={handleAddClick}
//                   >
//                     Save
//                   </button>
//                   <button
//                     style={{ ...styles.button, ...styles.cancelButton }}
//                     onClick={handleCancelClick}
//                   >
//                     Cancel
//                   </button>
//                 </td>
//               </tr>
//             )}

//             {/* Existing Plans Rows */}
//             {plans.map((plan) => (
//               <tr key={plan.id} style={styles.tr}>
//                 {headers.map((key) => (
//                   <td key={key} style={styles.td}>
//                     {editingId === plan.id && key !== "id" ? (
//                       <input
//                         type={
//                           key === "price" || key === "validity" ? "number" : "text"
//                         }
//                         name={key}
//                         value={editFormData[key] || ""}
//                         onChange={handleInputChange}
//                         style={styles.input}
//                       />
//                     ) : (
//                       plan[key]
//                     )}
//                   </td>
//                 ))}
//                 <td style={styles.td}>
//                   {editingId === plan.id ? (
//                     <>
//                       <button
//                         style={{ ...styles.button, ...styles.saveButton }}
//                         onClick={handleUpdateClick}
//                       >
//                         Update
//                       </button>
//                       <button
//                         style={{ ...styles.button, ...styles.cancelButton }}
//                         onClick={handleCancelClick}
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         style={{ ...styles.button, ...styles.editButton }}
//                         onClick={() => handleEditClick(plan)}
//                         disabled={isAdding}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         style={{ ...styles.button, ...styles.deleteButton }}
//                         onClick={() => handleDeleteClick(plan.id)}
//                         disabled={isAdding}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   // Customer or other roles view
//   return (
//     <div className="container mt-4">
//       <h2>
//         Welcome, {user?.sub} ({user?.role})
//       </h2>
//       {error && <div className="alert alert-danger">{error}</div>}

//       <h4>Available Plans:</h4>
//       <ul className="list-group">
//         {plans.map((plan) => (
//           <li key={plan.id} className="list-group-item">
//             <strong>{plan.name}</strong> - {plan.type} - ₹{plan.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// const styles = {
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
//   },
//   th: {
//     backgroundColor: "#4a90e2",
//     color: "white",
//     padding: "12px",
//     textAlign: "left",
//     borderBottom: "2px solid #ddd",
//   },
//   tr: {
//     borderBottom: "1px solid #ddd",
//     transition: "background-color 0.3s ease",
//   },
//   td: {
//     padding: "12px",
//     verticalAlign: "middle",
//   },
//   input: {
//     width: "100%",
//     padding: "6px 8px",
//     fontSize: "1rem",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     margin: "0 4px",
//     padding: "6px 12px",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "0.9rem",
//     transition: "background-color 0.3s ease",
//   },
//   editButton: {
//     backgroundColor: "#4caf50",
//     color: "white",
//   },
//   saveButton: {
//     backgroundColor: "#2196f3",
//     color: "white",
//   },
//   cancelButton: {
//     backgroundColor: "#f44336",
//     color: "white",
//   },
//   deleteButton: {
//     backgroundColor: "#e91e63",
//     color: "white",
//   },
// };



// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [plans, setPlans] = useState([]);
//   const [error, setError] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [editFormData, setEditFormData] = useState({});
//   const [isAdding, setIsAdding] = useState(false);
//   const [newPlanData, setNewPlanData] = useState({});

//   useEffect(() => {
//     if (!user || !user.role) return;

//     const fetchPlans = async () => {
//       try {
//         let url = "";

//         if (user.role.toLowerCase() === "customer") {
//           url = "http://localhost:9003/users";
//         } else if (user.role.toLowerCase() === "admin") {
//           url = "http://localhost:9002/plans";
//         } else {
//           throw new Error(`Unsupported role: ${user.role}`);
//         }

//         const response = await axios.get(url, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });
//         setPlans(response.data);
//         setError(null);
//       } catch (err) {
//         setError("Failed to load data");
//       }
//     };

//     fetchPlans();
//   }, [user]);

//   const handleEditClick = (plan) => {
//     setEditingId(plan.id);
//     setEditFormData({ ...plan });
//     setIsAdding(false);
//   };

//   const handleCancelClick = () => {
//     setEditingId(null);
//     setEditFormData({});
//     setIsAdding(false);
//     setNewPlanData({});
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editingId !== null) {
//       setEditFormData((prev) => ({ ...prev, [name]: value }));
//     } else if (isAdding) {
//       setNewPlanData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleUpdateClick = async () => {
//     try {
//       await axios.put(`http://localhost:9002/plans/${editingId}`, editFormData, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setPlans((prev) =>
//         prev.map((plan) => (plan.id === editingId ? editFormData : plan))
//       );
//       setEditingId(null);
//       setError(null);
//     } catch (err) {
//       setError("Update failed");
//     }
//   };

//   const handleDeleteClick = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this plan?")) return;

//     try {
//       await axios.delete(`http://localhost:9002/plans/${id}`, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setPlans((prev) => prev.filter((plan) => plan.id !== id));
//       setError(null);
//     } catch (err) {
//       setError("Delete failed");
//     }
//   };

//   const handleAddClick = async () => {
//     try {
//       const response = await axios.post(`http://localhost:9002/plans`, newPlanData, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setPlans((prev) => [...prev, response.data]);
//       setIsAdding(false);
//       setNewPlanData({});
//       setError(null);
//     } catch (err) {
//       setError("Add failed");
//     }
//   };

//   if (user?.role.toLowerCase() === "admin") {
//     const headers = plans.length > 0 ? Object.keys(plans[0]) : [];

//     return (
//       <div className="container mt-4">
//         <h2>Welcome, {user?.sub} (Admin)</h2>
//         {error && <div className="alert alert-danger">{error}</div>}

//         <h3 className="mb-3">Manage Plans</h3>

//         <button
//           onClick={() => {
//             setIsAdding(true);
//             setEditingId(null);
//             setNewPlanData({});
//           }}
//           style={{ ...styles.button, marginBottom: "10px" }}
//           disabled={isAdding || editingId !== null}
//         >
//           Add New Plan
//         </button>

//         <table style={styles.table}>
//           <thead>
//             <tr>
//               {headers.map((key) => (
//                 <th key={key} style={styles.th}>
//                   {key.charAt(0).toUpperCase() + key.slice(1)}
//                 </th>
//               ))}
//               <th style={styles.th}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {isAdding && (
//               <tr style={styles.tr}>
//                 {headers.map((key) => (
//                   <td key={key} style={styles.td}>
//                     {key === "id" ? (
//                       "-"
//                     ) : key === "validity" && newPlanData.type !== "prepaid" ? (
//                       <span style={{ color: "#888" }}>N/A</span>
//                     ) : (
//                       <input
//                         type={key === "price" || key === "validity" ? "number" : "text"}
//                         name={key}
//                         value={newPlanData[key] || ""}
//                         onChange={handleInputChange}
//                         style={styles.input}
//                         placeholder={`Enter ${key}`}
//                       />
//                     )}
//                   </td>
//                 ))}
//                 <td style={styles.td}>
//                   <button
//                     style={{ ...styles.button, ...styles.saveButton }}
//                     onClick={handleAddClick}
//                   >
//                     Save
//                   </button>
//                   <button
//                     style={{ ...styles.button, ...styles.cancelButton }}
//                     onClick={handleCancelClick}
//                   >
//                     Cancel
//                   </button>
//                 </td>
//               </tr>
//             )}

//             {plans.map((plan) => (
//               <tr key={plan.id} style={styles.tr}>
//                 {headers.map((key) => (
//                   <td key={key} style={styles.td}>
//                     {editingId === plan.id && key !== "id" ? (
//                       key === "validity" && editFormData.type !== "prepaid" ? (
//                         <span style={{ color: "#888" }}>N/A</span>
//                       ) : (
//                         <input
//                           type={key === "price" || key === "validity" ? "number" : "text"}
//                           name={key}
//                           value={editFormData[key] || ""}
//                           onChange={handleInputChange}
//                           style={styles.input}
//                           placeholder={`Enter ${key}`}
//                         />
//                       )
//                     ) : (
//                       plan[key] ?? "-"
//                     )}
//                   </td>
//                 ))}
//                 <td style={styles.td}>
//                   {editingId === plan.id ? (
//                     <>
//                       <button
//                         style={{ ...styles.button, ...styles.saveButton }}
//                         onClick={handleUpdateClick}
//                       >
//                         Update
//                       </button>
//                       <button
//                         style={{ ...styles.button, ...styles.cancelButton }}
//                         onClick={handleCancelClick}
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         style={{ ...styles.button, ...styles.editButton }}
//                         onClick={() => handleEditClick(plan)}
//                         disabled={isAdding}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         style={{ ...styles.button, ...styles.deleteButton }}
//                         onClick={() => handleDeleteClick(plan.id)}
//                         disabled={isAdding}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <h2>
//         Welcome, {user?.sub} ({user?.role})
//       </h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <h4>Available Plans:</h4>
//       <ul className="list-group">
//         {plans.map((plan) => (
//           <li key={plan.id} className="list-group-item">
//             <strong>{plan.name}</strong> - {plan.type} - ₹{plan.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// const styles = {
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
//   },
//   th: {
//     backgroundColor: "#4a90e2",
//     color: "white",
//     padding: "12px",
//     textAlign: "left",
//     borderBottom: "2px solid #ddd",
//   },
//   tr: {
//     borderBottom: "1px solid #ddd",
//     transition: "background-color 0.3s ease",
//   },
//   td: {
//     padding: "12px",
//     verticalAlign: "middle",
//   },
//   input: {
//     width: "100%",
//     padding: "6px 8px",
//     fontSize: "1rem",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     margin: "0 4px",
//     padding: "6px 12px",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "0.9rem",
//     transition: "background-color 0.3s ease",
//   },
//   editButton: {
//     backgroundColor: "#4caf50",
//     color: "white",
//   },
//   saveButton: {
//     backgroundColor: "#2196f3",
//     color: "white",
//   },
//   cancelButton: {
//     backgroundColor: "#f44336",
//     color: "white",
//   },
//   deleteButton: {
//     backgroundColor: "#e91e63",
//     color: "white",
//   },
// };

//works perfect
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [editFormData, setEditFormData] = useState({});
//   const [isAdding, setIsAdding] = useState(false);
//   const [newPlanData, setNewPlanData] = useState({});

//   useEffect(() => {
//     if (!user || !user.role) return;

//     const fetchData = async () => {
//       try {
//         let url = "";

//         if (user.role.toLowerCase() === "customer") {
//           url = "http://localhost:9003/users"; // Customer endpoint
//         } else if (user.role.toLowerCase() === "admin") {
//           url = "http://localhost:9002/plans"; // Admin plans endpoint
//         } else {
//           throw new Error(`Unsupported role: ${user.role}`);
//         }

//         const response = await axios.get(url, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });

//         // For customer, wrap object in array if it's a single user object
//         const responseData = Array.isArray(response.data)
//           ? response.data
//           : [response.data];

//         setData(responseData);
//         setError(null);
//       } catch (err) {
//         setError("Failed to load data");
//       }
//     };

//     fetchData();
//   }, [user]);

//   const handleEditClick = (item) => {
//     setEditingId(item.id);
//     setEditFormData({ ...item });
//     setIsAdding(false);
//   };

//   const handleCancelClick = () => {
//     setEditingId(null);
//     setEditFormData({});
//     setIsAdding(false);
//     setNewPlanData({});
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editingId !== null) {
//       setEditFormData((prev) => ({ ...prev, [name]: value }));
//     } else if (isAdding) {
//       setNewPlanData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleUpdateClick = async () => {
//     try {
//       await axios.put(`http://localhost:9002/plans/${editingId}`, editFormData, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setData((prev) =>
//         prev.map((item) => (item.id === editingId ? editFormData : item))
//       );
//       setEditingId(null);
//       setError(null);
//     } catch (err) {
//       setError("Update failed");
//     }
//   };

//   const handleDeleteClick = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;

//     try {
//       await axios.delete(`http://localhost:9002/plans/${id}`, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setData((prev) => prev.filter((item) => item.id !== id));
//       setError(null);
//     } catch (err) {
//       setError("Delete failed");
//     }
//   };

//   const handleAddClick = async () => {
//     try {
//       const response = await axios.post(`http://localhost:9002/plans`, newPlanData, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setData((prev) => [...prev, response.data]);
//       setIsAdding(false);
//       setNewPlanData({});
//       setError(null);
//     } catch (err) {
//       setError("Add failed");
//     }
//   };

//   const isAdmin = user?.role.toLowerCase() === "admin";

//   const headers = data.length > 0 ? Object.keys(data[0]) : [];

//   return (
//     <div className="container mt-4">
//       <h2>
//         Welcome, {user?.sub} ({user?.role})
//       </h2>
//       {error && <div className="alert alert-danger">{error}</div>}

//       <h3 className="mb-3">{isAdmin ? "Manage Plans" : "Customer Info"}</h3>

//       {isAdmin && (
//         <button
//           onClick={() => {
//             setIsAdding(true);
//             setEditingId(null);
//             setNewPlanData({});
//           }}
//           style={{ ...styles.button, marginBottom: "10px" }}
//           disabled={isAdding || editingId !== null}
//         >
//           Add New Plan
//         </button>
//       )}

//       <table style={styles.table}>
//         <thead>
//           <tr>
//             {headers.map((key) => (
//               <th key={key} style={styles.th}>
//                 {key.charAt(0).toUpperCase() + key.slice(1)}
//               </th>
//             ))}
//             {isAdmin && <th style={styles.th}>Actions</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {/* New Row */}
//           {isAdding && (
//             <tr style={styles.tr}>
//               {headers.map((key) => (
//                 <td key={key} style={styles.td}>
//                   {key === "id" ? (
//                     "-"
//                   ) : (
//                     <input
//                       type={
//                         key === "price" || key === "validity" || key.includes("Limit")
//                           ? "number"
//                           : "text"
//                       }
//                       name={key}
//                       value={newPlanData[key] || ""}
//                       onChange={handleInputChange}
//                       style={styles.input}
//                       placeholder={`Enter ${key}`}
//                     />
//                   )}
//                 </td>
//               ))}
//               <td style={styles.td}>
//                 <button
//                   style={{ ...styles.button, ...styles.saveButton }}
//                   onClick={handleAddClick}
//                 >
//                   Save
//                 </button>
//                 <button
//                   style={{ ...styles.button, ...styles.cancelButton }}
//                   onClick={handleCancelClick}
//                 >
//                   Cancel
//                 </button>
//               </td>
//             </tr>
//           )}

//           {/* Existing Rows */}
//           {data.map((item) => (
//             <tr key={item.id} style={styles.tr}>
//               {headers.map((key) => (
//                 <td key={key} style={styles.td}>
//                   {editingId === item.id && key !== "id" && isAdmin ? (
//                     <input
//                       type={
//                         key === "price" || key === "validity" || key.includes("Limit")
//                           ? "number"
//                           : "text"
//                       }
//                       name={key}
//                       value={editFormData[key] || ""}
//                       onChange={handleInputChange}
//                       style={styles.input}
//                     />
//                   ) : (
//                     item[key]
//                   )}
//                 </td>
//               ))}
//               {isAdmin && (
//                 <td style={styles.td}>
//                   {editingId === item.id ? (
//                     <>
//                       <button
//                         style={{ ...styles.button, ...styles.saveButton }}
//                         onClick={handleUpdateClick}
//                       >
//                         Update
//                       </button>
//                       <button
//                         style={{ ...styles.button, ...styles.cancelButton }}
//                         onClick={handleCancelClick}
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         style={{ ...styles.button, ...styles.editButton }}
//                         onClick={() => handleEditClick(item)}
//                         disabled={isAdding}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         style={{ ...styles.button, ...styles.deleteButton }}
//                         onClick={() => handleDeleteClick(item.id)}
//                         disabled={isAdding}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const styles = {
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
//   },
//   th: {
//     backgroundColor: "#4a90e2",
//     color: "white",
//     padding: "12px",
//     textAlign: "left",
//     borderBottom: "2px solid #ddd",
//   },
//   tr: {
//     borderBottom: "1px solid #ddd",
//     transition: "background-color 0.3s ease",
//   },
//   td: {
//     padding: "12px",
//     verticalAlign: "middle",
//   },
//   input: {
//     width: "100%",
//     padding: "6px 8px",
//     fontSize: "1rem",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     margin: "0 4px",
//     padding: "6px 12px",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "0.9rem",
//     transition: "background-color 0.3s ease",
//   },
//   editButton: {
//     backgroundColor: "#4caf50",
//     color: "white",
//   },
//   saveButton: {
//     backgroundColor: "#2196f3",
//     color: "white",
//   },
//   cancelButton: {
//     backgroundColor: "#f44336",
//     color: "white",
//   },
//   deleteButton: {
//     backgroundColor: "#e91e63",
//     color: "white",
//   },
// };


import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newPlanData, setNewPlanData] = useState({});
  const [plans, setPlans] = useState([]); // 👈 New: All plans for dropdown
  const [selectedPlanId, setSelectedPlanId] = useState(""); // 👈 Selected plan ID

  const isAdmin = user?.role.toLowerCase() === "admin";

  useEffect(() => {
    if (!user || !user.role) return;

    const fetchData = async () => {
      try {
        let url = isAdmin
          ? "http://localhost:9002/plans"
          : "http://localhost:9003/users";

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const responseData = Array.isArray(response.data)
          ? response.data
          : [response.data];

        setData(responseData);
        setError(null);
      } catch (err) {
        setError("Failed to load data");
      }
    };

    // Fetch plans for customer dropdown
    const fetchPlans = async () => {
      if (user?.role.toLowerCase() === "customer") {
        try {
          const response = await axios.get("http://localhost:9002/plans", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setPlans(response.data);
        } catch (err) {
          console.error("Failed to load plans for dropdown");
        }
      }
    };

    fetchData();
    fetchPlans();
  }, [user]);

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditFormData({ ...item });
    setIsAdding(false);
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditFormData({});
    setIsAdding(false);
    setNewPlanData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingId !== null) {
      setEditFormData((prev) => ({ ...prev, [name]: value }));
    } else if (isAdding) {
      setNewPlanData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateClick = async () => {
    try {
      await axios.put(`http://localhost:9002/plans/${editingId}`, editFormData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setData((prev) =>
        prev.map((item) => (item.id === editingId ? editFormData : item))
      );
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError("Update failed");
    }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`http://localhost:9002/plans/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setData((prev) => prev.filter((item) => item.id !== id));
      setError(null);
    } catch (err) {
      setError("Delete failed");
    }
  };

  const handleAddClick = async () => {
    try {
      const response = await axios.post(`http://localhost:9002/plans`, newPlanData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setData((prev) => [...prev, response.data]);
      setIsAdding(false);
      setNewPlanData({});
      setError(null);
    } catch (err) {
      setError("Add failed");
    }
  };

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="container mt-4">
      <h2>
        Welcome, {user?.sub} ({user?.role})
      </h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <h3 className="mb-3">{isAdmin ? "Manage Plans" : "Customer Info"}</h3>

      {/* 🔽 Plan dropdown for customers */}
      {!isAdmin && plans.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>
            Select a Plan:
          </label>
          <select
            value={selectedPlanId}
            onChange={(e) => setSelectedPlanId(e.target.value)}
            style={{ padding: "6px 12px", fontSize: "1rem" }}
          >
            <option value="">-- Choose Plan --</option>
           {console.log(plans,'Gurumoorthy')}
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - ₹{plan.price}
              </option>
            ))}
          </select>
        </div>
      )}

      {isAdmin && (
        <button
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setNewPlanData({});
          }}
          style={{ ...styles.button, marginBottom: "10px" }}
          disabled={isAdding || editingId !== null}
        >
          Add New Plan
        </button>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            {headers.map((key) => (
              <th key={key} style={styles.th}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            ))}
            {isAdmin && <th style={styles.th}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {isAdding && (
            <tr style={styles.tr}>
              {headers.map((key) => (
                <td key={key} style={styles.td}>
                  {key === "id" ? (
                    "-"
                  ) : (
                    <input
                      type={
                        key === "price" || key === "validity" || key.includes("Limit")
                          ? "number"
                          : "text"
                      }
                      name={key}
                      value={newPlanData[key] || ""}
                      onChange={handleInputChange}
                      style={styles.input}
                      placeholder={`Enter ${key}`}
                    />
                  )}
                </td>
              ))}
              <td style={styles.td}>
                <button
                  style={{ ...styles.button, ...styles.saveButton }}
                  onClick={handleAddClick}
                >
                  Save
                </button>
                <button
                  style={{ ...styles.button, ...styles.cancelButton }}
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </td>
            </tr>
          )}

          {data.map((item) => (
            <tr key={item.id} style={styles.tr}>
              {headers.map((key) => (
                <td key={key} style={styles.td}>
                  {editingId === item.id && key !== "id" && isAdmin ? (
                    <input
                      type={
                        key === "price" || key === "validity" || key.includes("Limit")
                          ? "number"
                          : "text"
                      }
                      name={key}
                      value={editFormData[key] || ""}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  ) : (
                    item[key]
                  )}
                </td>
              ))}
              {isAdmin && (
                <td style={styles.td}>
                  {editingId === item.id ? (
                    <>
                      <button
                        style={{ ...styles.button, ...styles.saveButton }}
                        onClick={handleUpdateClick}
                      >
                        Update
                      </button>
                      <button
                        style={{ ...styles.button, ...styles.cancelButton }}
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        style={{ ...styles.button, ...styles.editButton }}
                        onClick={() => handleEditClick(item)}
                        disabled={isAdding}
                      >
                        Edit
                      </button>
                      <button
                        style={{ ...styles.button, ...styles.deleteButton }}
                        onClick={() => handleDeleteClick(item.id)}
                        disabled={isAdding}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
  },
  th: {
    backgroundColor: "#4a90e2",
    color: "white",
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  },
  tr: {
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.3s ease",
  },
  td: {
    padding: "12px",
    verticalAlign: "middle",
  },
  input: {
    width: "100%",
    padding: "6px 8px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    margin: "0 4px",
    padding: "6px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "background-color 0.3s ease",
  },
  editButton: {
    backgroundColor: "#4caf50",
    color: "white",
  },
  saveButton: {
    backgroundColor: "#2196f3",
    color: "white",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    color: "white",
  },
  deleteButton: {
    backgroundColor: "#e91e63",
    color: "white",
  },
};
