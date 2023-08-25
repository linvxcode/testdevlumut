import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import CreateUser from "@/Components/CreateUser";
import EditUser from "@/Components/EditUser";

const User = (props) => {

    const [isOpen, setIsopen] = useState(false);
    const [editisOpen, setEditIsopen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleCRU = () => {
        setIsopen(true);
    };
    const handlecloseCRU = () => {
        setIsopen(false);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditIsopen(true);
    };
    const handleDelete = async (userId) => {
        const confirm = window.confirm("Are You Sure");
        try {
            if (confirm) {
                await axios.delete(`/userdelete/${userId}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="User" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="overflow-x-auto">
                                <button
                                    className="btn btn-outline"
                                    onClick={handleCRU}
                                >
                                    Create User
                                </button>
                                <table className="table table-zebra">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.user.map((item, index) => (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <th>{item.name}</th>
                                                <th>{item.email}</th>
                                                <th>{item.role}</th>
                                                <th>
                                                    <div
                                                        className="tooltip"
                                                        data-tip="Detail"
                                                    >
                                                        {/* <button
                                                            className="btn"
                                                            onClick={() =>
                                                                handleDetail(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                width="24"
                                                                height="24"
                                                                src="https://img.icons8.com/material-sharp/24/fine-print.png"
                                                                alt="fine-print"
                                                            />
                                                        </button> */}
                                                    </div>
                                                    <div
                                                        className="tooltip"
                                                        data-tip="Edit"
                                                    >
                                                        <button
                                                            className="btn"
                                                            onClick={() =>
                                                                handleEdit(item)
                                                            }
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div
                                                        className="tooltip"
                                                        data-tip="Delete"
                                                    >
                                                        <button
                                                            className="btn"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {editisOpen && (
                                    <EditUser
                                        onClose={() => setEditIsopen(false)}
                                        user={selectedUser}
                                    />
                                )}
                                {isOpen && (
                                    <CreateUser onClose={handlecloseCRU} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default User;
