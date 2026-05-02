import { supabase } from './src/models/supabase';
async function run() {
  const { data, error } = await supabase.from('marketing_products').select('*');
  console.log(data ? Object.keys(data[0] || {}) : error);
}
run();
