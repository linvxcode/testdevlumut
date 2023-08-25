import { motion, AnimatePresence} from "framer-motion";
import React, { useEffect, useState } from "react";

function Detail(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (props.productId) {
            setTitle(props.productId.title || "");
            setContent(props.productId.content || "");
            setDate(props.productId.date || "");
        }
    }, [props.productId]);

    //   console.log(props)
    return (
        <>
            <AnimatePresence>
                {props.editModal ? (
                    <motion.div className="">
                        <motion.div
                            className="modall h-[100rem] modal-bg "
                            initial={{ opacity: 0, scale: 0.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.1 }}
                        >
                            <motion.div className="modal-content">
                                <motion.span
                                    className="close-button"
                                    onClick={props.onClose}
                                >
                                    &times;
                                </motion.span>

                                <label htmlFor="name">Title</label>
                                <h1 className=" mb-3 text-xl">{title}</h1>

                                <label htmlFor="desc" className="">
                                    Content
                                </label>
                                <h1 className="mb-3 text-xl">{content}</h1>

                                <label htmlFor="price">Author</label>
                                <h1 className="mb-3 text-xl">{props.productId.user.name}</h1>


                                <label htmlFor="price">Date</label>
                                <h1>{date}</h1>

                                <div className="flex  justify-end">
                                    <button
                                        className="btn btn-outline"
                                        onClick={props.onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ) : (
                    ""
                )}
            </AnimatePresence>
        </>
    );
}

export default Detail;
