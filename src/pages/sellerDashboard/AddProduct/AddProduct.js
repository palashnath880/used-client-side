import React from 'react';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    return (
        <div>
            <h2 className='font-semibold text-2xl border-b pb-3'>Add Car For Sale</h2>
            <form></form>
        </div>
    );
}

export default AddProduct;
