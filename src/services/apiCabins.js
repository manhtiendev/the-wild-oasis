import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

//https://tidmrcrbhrqjcrtnnihm.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}-${Date.now()}`.replaceAll('/', '');

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase.from('cabins').insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error('Cabin image could not be uploaded and the cabin was not created');
  }

  return data;
}

export async function deleteCabin(cabinId) {
  const { error, data } = await supabase.from('cabins').delete().eq('id', cabinId);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}
