import React, {useEffect} from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {Property} from "../../../lib/helpers/types";

type PropertyFormProps = {
    onSubmit: SubmitHandler<Partial<Property>>;
    initialData?: Property; // Optional initial data for editing
};

const PropertyForm = ({onSubmit, initialData}: PropertyFormProps) => {
    const {handleSubmit, control, reset, formState} = useForm<Partial<Property>>({
        defaultValues: initialData,
    });

    const {isDirty, isValid} = formState;

    useEffect(() => {
        // Reset the form when initialData changes (for editing)
        reset(initialData);
    }, [initialData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-black bg-white w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <div>
                    <label>Name:</label>
                    <Controller
                        name="name"
                        control={control}
                        rules={{required: 'Name is required'}}
                        render={({field}) => <input  {...field} className="bg-white border border-black"/>}
                    />
                </div>
                <div>
                    <label>Address Line 1:</label>
                    <Controller
                        name="address_line_1"
                        control={control}
                        rules={{required: 'Address Line 1 is required'}}
                        render={({field}) => <input  {...field} className="bg-white border border-black"/>}
                    />
                </div>
                <div>
                    <label>Address Line 2:</label>
                    <Controller
                        name="address_line_2"
                        control={control}
                        render={({field}) => <input  {...field} className="bg-white border border-black"/>}
                    />
                </div>
                <div>
                    <label>Postal Code:</label>
                    <Controller
                        name="code"
                        control={control}
                        rules={{required: 'Postal Code is required'}}
                        render={({field}) => <input  {...field} className="bg-white border border-black"/>}
                    />
                </div>
                <div>
                    <label>County:</label>
                    <Controller
                        name="county"
                        control={control}
                        rules={{required: 'County is required'}}
                        render={({field}) => <input  {...field} className="bg-white border border-black"/>}
                    />
                </div>
                <button type="submit" disabled={!isDirty || !isValid}>
                    {initialData ? 'Save Changes' : 'Create Property'}
                </button>
            </div>
        </form>
    );
};

export default PropertyForm;
