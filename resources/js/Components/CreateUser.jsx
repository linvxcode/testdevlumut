import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

const CreateUser = (props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        role: "",
        password_confirmation: "",
    });
    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = async (e) => {
        e.preventDefault();
        const lowercaseRole = data.role.toLowerCase();
    
        // Update the role value in the data object
        setData('role', lowercaseRole); 
       await post(route('regis'))
       props.onClose();
    };

    return (
        <div>
            <AnimatePresence>
                {/* {props.editModal ? ( */}
                <motion.div className="">
                    <motion.div
                        className="modall h-[100rem] modal-bg"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <motion.div className="modal-content">
                            <motion.span
                                className="close-button"
                                onClick={props.onClose}
                            >
                                &times;
                            </motion.span>

                            <form
                                onSubmit={submit}
                                encType="multipart/form-data"
                            >
                                <div className="mt-9">
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full input input-bordered"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={handleOnChange}
                                        required
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full input input-bordered"
                                        autoComplete="username"
                                        onChange={handleOnChange}
                                        required
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full input input-bordered"
                                        autoComplete="new-password"
                                        onChange={handleOnChange}
                                        required
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="role"
                                        value="role"
                                    />

                                    <TextInput
                                        id="role"
                                        type="role"
                                        name="role"
                                        value={data.role}
                                        className="mt-1 block w-full input input-bordered"
                                        autoComplete="role"
                                        onChange={handleOnChange}
                                        required
                                    />

                                    <InputError
                                        message={errors.role}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />

                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full input input-bordered"
                                        autoComplete="new-password"
                                        onChange={handleOnChange}
                                        required
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex justify-end mt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-outline"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </motion.div>
                {/* ) : (
                    ""
                )} */}
            </AnimatePresence>
        </div>
    );
};

export default CreateUser;
