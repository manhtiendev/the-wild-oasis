import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import PropTypes from 'prop-types';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  function onSubmit(values) {
    const image = typeof values.image === 'string' ? values.image : values.image[0];
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...values, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...values, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label={'Maximum capacity'} error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label={'Regular price'} error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label={'Discount'} error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) <= Number(getValues('regularPrice')) ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow label={'Description'} error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label={'Cabin photo'} error={errors?.image?.message}>
        <FileInput
          id='image'
          disabled={isWorking}
          accept='image/*'
          {...register('image', { required: isEditSession ? false : 'This field is required' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onCloseModal?.()} variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit Cabin' : 'Add Cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
};
