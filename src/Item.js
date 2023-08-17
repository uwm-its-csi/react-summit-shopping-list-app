import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ItemContext } from './ItemContext';

const Item = () => {

    const { handleAdd, message } = useContext(ItemContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
          item: '',
          quantity: '1',
        }
      });

    const onSubmit = (data) => {
        handleAdd(data);
        reset();
    };

    return (
        <div>
            { message !== '' &&
                <h5>{message}</h5>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="formLabel">Item</label>
                    <input className="formInput" name="item" { ...register('item', { required: true })} /> 
                    {errors.item && errors.item.type === "required" && (
                        <span style={{ paddingLeft : '10px', color: 'red' }}>*** This is required ***</span>
                    )}
                </div>
                <div>    
                    <label className="formLabel">Quantity</label>
                    <input className="formInput" name="quantity" { ...register('quantity', { required: true })} /> 
                    {errors.quantity && errors.quantity.type === "required" && (
                        <span style={{ paddingLeft : '10px', color: 'red'  }}>*** This is required ***</span>
                    )}
                </div>
                <button style={{ margin: '10px' }}>Add Item</button>
            </form>
         </div>
    );
}

export default Item;