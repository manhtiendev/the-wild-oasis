import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {},
  } = useSettings();

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input defaultValue={minBookingLength} type='number' id='min-nights' />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input defaultValue={maxBookingLength} type='number' id='max-nights' />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input defaultValue={maxGuestsPerBooking} type='number' id='max-guests' />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input defaultValue={breakfastPrice} type='number' id='breakfast-price' />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
