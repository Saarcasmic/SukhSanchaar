const url = "https://ypdtaswsurcjhfvnqdvo.supabase.co/rest/v1/marketing_products?select=*";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHRhc3dzdXJjamhmdm5xZHZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAxMjI2OSwiZXhwIjoyMDczNTg4MjY5fQ.OScOBLpsdkFgk1MbkoAyjF2zGwxdOsw4pM_wTLz3cyQ";
fetch(url, { headers: { apikey: key, Authorization: `Bearer ${key}` } })
  .then(r => r.json())
  .then(d => console.log(d.length > 0 ? Object.keys(d[0]) : d))
  .catch(e => console.error(e));
