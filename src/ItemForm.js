import { useContext } from "react";
import { useForm } from "react-hook-form";
import { muiTheme } from './CreateTheme';
import { Button, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { ItemContext } from './ItemContext';

const ItemForm = () => {

    const { handleAdd } = useContext(ItemContext);

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
        <Paper
          sx={{ mt: 1, border: "2px solid #bbb", borderRadius: '16px' }}
          style={{
            display: "grid",
            gridRowGap: "20px",
            padding: "20px",
            margin: "10px 10px",
          }}
        >
          <Typography 
            style={{ background: muiTheme.palette.primary.mainGradient }}
            sx={{ p:2 }}
            variant="h5"
            align='center'
            color='white'
          >
            Add Items to the Shopping List
          </Typography>
          <form>
            <div style={{ margin: '5px', padding: '5px' }}>
                <TextField 
                    label="Item" 
                    name="item" 
                    { ...register('item', { required: true })} 
                />
                {errors.item?.type === 'required' && <div style={{ fontSize: '14px', color:'#FF0000' }}> *** This field is required ***</div>}

            </div>
            <div style={{ margin: '5px', padding: '5px' }}>
                <TextField 
                    label="Quantity" 
                    name="quantity" 
                    { ...register('quantity', { required: true })} 
                />
                    {errors.quantity?.type === 'required' && <div style={{ fontSize: '14px', color:'#FF0000' }}> *** This field is required ***</div>}
            </div>
            <div style={{ margin: '5px', padding: '5px' }} >
                <Tooltip title="Add Item to the Shopping List">
                    <Button onClick={handleSubmit(onSubmit)} variant={"contained"} color="secondary" sx={{ mr: 5 }}>
                        Add Item
                    </Button>
                </Tooltip>
                <Tooltip title="Reset Your Answers">
                    <Button onClick={() => reset()} variant={"outlined"} color="secondary">
                        Reset
                    </Button>
                </Tooltip>
            </div>
          </form>
        </Paper> 
    );
}

export default ItemForm;