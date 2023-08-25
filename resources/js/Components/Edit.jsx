import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";


function EditModal(props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');

    const updateProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('title', title);
        formData.append('content', content);
        formData.append('date', date);
      
        axios
          .post(`/postupdate/${props.postId}`, formData)
          .then((response) => {

            props.onClose();
          })
          .catch((error) => {
            console.log(error); 
          });
      };
    
      
  
    useEffect(()=>{
        if (props.productId) {
            setTitle(props.productId.title || '');
            setContent(props.productId.content || '');
            setDate(props.productId.date || '');
        
          }
    },[props.productId])

  
      
    //   console.log(props)
    return (
        <>
            <AnimatePresence>
                {props.editModal ? (
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
                                    onSubmit={updateProduct}
                                    encType="multipart/form-data"
                                >
                                    <label htmlFor="name">Name</label>
                                    <input
                                        placeholder="Name"
                                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />

                                    <label htmlFor="desc">Description</label>
                                    <input
                                        placeholder="Description"
                                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                                        type="text"
                                        id="desc"
                                        name="desc"
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                    />

                                    <label htmlFor="price">Price</label>
                                    <input
                                        placeholder="1x.xxx"
                                        type="text"
                                        id="price"
                                        name="price"
                                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                                        value={date}
                                        onChange={(e) =>
                                            setDate(e.target.value)
                                        }
                                    />

                                 
                                    <div className="flex justify-end">

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
                ) : (
                    ""
                )}
            </AnimatePresence>
        </>
    );
}

export default EditModal;
