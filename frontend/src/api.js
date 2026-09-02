const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
async function request(path, options={}) {
  const r = await fetch(API + path, {headers: {"Content-Type":"application/json"}, ...options});
  const data = await r.json().catch(()=>({}));
  if (!r.ok) throw new Error(data.message || "Request failed");
  return data;
}
export const getStudents = q => request("/students?search="+encodeURIComponent(q || ""));
export const createStudent = x => request("/students",{method:"POST",body:JSON.stringify(x)});
export const updateStudent = (id,x) => request("/students/"+id,{method:"PUT",body:JSON.stringify(x)});
export const deleteStudent = id => request("/students/"+id,{method:"DELETE"});