import React, {useEffect} from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {Property, Room} from "../../../lib/helpers/types";
import {useProperties} from "../../../lib/helpers/hooks";

type RoomFormProps = {
    onSubmit: SubmitHandler<Partial<Room>>;
    initialData?: Room; // Optional initial data for editing
    showProperties?: boolean
};

const RoomForm = ({onSubmit, initialData, showProperties = true}: RoomFormProps) => {
    const {handleSubmit, control, reset, formState} = useForm<Partial<Room>>({
        defaultValues: initialData,
    });

    const {data: properties, isLoading} = useProperties()

    const {isDirty, isValid} = formState;

    useEffect(() => {
        // Reset the form when initialData changes (for editing)
        reset(initialData);
    }, [initialData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-black bg-white w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <label>Name:</label>
                <Controller
                    name="name"
                    control={control}
                    rules={{required: 'Name is required'}}
                    render={({field}) => <input  {...field} className="bg-white border border-black"/>}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <label>Size (sq ft):</label>
                <Controller
                    name="size"
                    control={control}
                    rules={{required: 'Size is required'}}
                    render={({field}) => <input  {...field} type="number" max={200} min={1}
                                                 className="bg-white border border-black"/>}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <label>Unit Size:</label>
                <Controller
                    name="unit_size"
                    control={control}
                    render={({field}) => (
                        <select {...field} className="bg-white border border-black">
                            <option value="Feet">Feet</option>
                            <option value="Metres">Metres</option>
                        </select>
                    )}
                />
            </div>
            {showProperties && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <label>Property</label>
                    <Controller
                        name="property_id"
                        control={control}
                        render={({field}) => (
                            <select {...field} className="bg-white border border-black">
                                {properties?.map((property: Property) => <option
                                    value={property.id}>{property.name}</option>)}
                            </select>
                        )}
                    />
                </div>)}
            <button type="submit" disabled={!isDirty || !isValid}>
                {initialData ? 'Save Changes' : 'Create Room'}
            </button>
        </form>
    );
};

export default RoomForm;
