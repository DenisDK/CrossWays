// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { DataGrid } from "@mui/x-data-grid";
// import Paper from "@mui/material/Paper";
// import Avatar from "@mui/material/Avatar";
// import TextField from "@mui/material/TextField";
// import Header from "@/components/Header/Header";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// const columns = [
//   {
//     field: "avatar",
//     headerName: "Avatar",
//     width: 90,
//     renderCell: (params) => (
//       <div className="flex items-center justify-center h-full">
//         <Avatar alt={params.row.name} src={params.value || "/noavatar.png"} />
//       </div>
//     ),
//     sortable: false,
//   },
//   { field: "name", headerName: "Name", width: 130 },
//   { field: "nickname", headerName: "Nickname", width: 130 },
//   { field: "gender", headerName: "Gender", width: 90 },
//   { field: "age", headerName: "Age", type: "number", width: 90 },
//   {
//     field: "isPremium",
//     headerName: "Premium",
//     width: 120,
//     renderCell: (params) => (params.value ? "Yes" : "No"),
//   },
// ];

// const UserSearchPage = () => {
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const usersCollection = collection(db, "Users");
//       const usersSnapshot = await getDocs(usersCollection);
//       const usersList = usersSnapshot.docs.map((doc) => {
//         const userData = doc.data();
//         const age = userData.birthday ? calculateAge(userData.birthday) : null;

//         return {
//           id: doc.id,
//           name: userData.name,
//           nickname: userData.nickname,
//           gender: userData.gender,
//           age: age,
//           avatar: userData.profileImage || "/noavatar.png",
//           isPremium: userData.isPremium,
//         };
//       });

//       setUsers(usersList);
//     };

//     fetchUsers();
//   }, []);

//   const calculateAge = (birthday) => {
//     const birthDate = birthday.toDate();
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();

//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }

//     return age;
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleRowClick = (params) => {
//     router.push(`/en/Users/${params.id}`);
//   };

//   const filteredUsers = users.filter((user) =>
//     user.nickname.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       <Header />
//       <div className="max-w-screen-xl mx-auto mt-12 px-3">
//         <h2 className="text-2xl font-bold text-[#876447]">Search Users</h2>
//         <TextField
//           label="Search by Nickname"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//         <Paper sx={{ height: 400, width: "100%", mt: 2 }}>
//           <DataGrid
//             rows={filteredUsers}
//             columns={columns}
//             pageSize={5}
//             rowsPerPageOptions={[5, 10]}
//             sx={{ border: 0 }}
//             onRowClick={handleRowClick}
//           />
//         </Paper>
//       </div>
//     </>
//   );
// };

// export default UserSearchPage;

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "@/components/Header/Header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const columns = [
  {
    field: "avatar",
    headerName: "Avatar",
    width: 90,
    renderCell: (params) => (
      <div className="flex items-center justify-center h-full">
        <Avatar alt={params.row.name} src={params.value || "/noavatar.png"} />
      </div>
    ),
    sortable: false,
  },
  { field: "name", headerName: "Name", width: 130 },
  { field: "nickname", headerName: "Nickname", width: 130 },
  { field: "gender", headerName: "Gender", width: 90 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
  {
    field: "isPremium",
    headerName: "Premium",
    width: 120,
    renderCell: (params) => (params.value ? "Yes" : "No"),
  },
];

const UserSearchPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading
      const usersCollection = collection(db, "Users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => {
        const userData = doc.data();
        const age = userData.birthday ? calculateAge(userData.birthday) : null;

        return {
          id: doc.id,
          name: userData.name,
          nickname: userData.nickname,
          gender: userData.gender,
          age: age,
          avatar: userData.profileImage || "/noavatar.png",
          isPremium: userData.isPremium,
        };
      });

      setUsers(usersList);
      setLoading(false); // End loading
    };

    fetchUsers();
  }, []);

  const calculateAge = (birthday) => {
    const birthDate = birthday.toDate();
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRowClick = (params) => {
    router.push(`/en/Users/${params.id}`);
  };

  const filteredUsers = users.filter((user) =>
    user.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto mt-12 px-3">
        <h2 className="text-2xl font-bold text-[#876447]">Search Users</h2>
        <TextField
          label="Search by Nickname"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Paper sx={{ height: 400, width: "100%", mt: 2 }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            sx={{ border: 0 }}
            onRowClick={handleRowClick}
          />
        </Paper>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default UserSearchPage;
