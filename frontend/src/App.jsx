import {useEffect,useState} from "react";
import {createStudent,deleteStudent,getStudents,updateStudent} from "./api";

const empty={name:"",email:"",course:"",age:""};

export default function App(){
  const [students,setStudents]=useState([]),[form,setForm]=useState(empty);
  const [editing,setEditing]=useState(null),[search,setSearch]=useState(""),[message,setMessage]=useState("");
  const load=async()=>{try{setStudents(await getStudents(search))}catch(e){setMessage(e.message)}};
  useEffect(()=>{load()},[]);
  useEffect(()=>{const t=setTimeout(load,250);return()=>clearTimeout(t)},[search]);
  const change=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=async e=>{e.preventDefault();try{
    const data={...form,age:Number(form.age)};
    if(editing){await updateStudent(editing,data);setMessage("Student updated successfully.")}
    else{await createStudent(data);setMessage("Student added successfully.")}
    setForm(empty);setEditing(null);load();
  }catch(e){setMessage(e.message)}};
  const edit=s=>{setEditing(s._id);setForm({name:s.name,email:s.email,course:s.course,age:s.age});scrollTo(0,0)};
  const remove=async id=>{if(!confirm("Delete this student?"))return;try{await deleteStudent(id);setMessage("Student deleted successfully.");load()}catch(e){setMessage(e.message)}};
  return <main className="container">
    <header><p className="eyebrow">MERN PROJECT</p><h1>Student Management System</h1><p>Manage student records with React, Express and MongoDB.</p></header>
    <section className="card"><h2>{editing?"Edit Student":"Add Student"}</h2>
      <form onSubmit={submit} className="grid">
        <input name="name" placeholder="Student name" value={form.name} onChange={change} required/>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={change} required/>
        <input name="course" placeholder="Course" value={form.course} onChange={change} required/>
        <input name="age" type="number" min="1" max="100" placeholder="Age" value={form.age} onChange={change} required/>
        <div><button>{editing?"Update Student":"Add Student"}</button>{editing&&<button type="button" className="secondary" onClick={()=>{setEditing(null);setForm(empty)}}>Cancel</button>}</div>
      </form>{message&&<p className="message">{message}</p>}
    </section>
    <section className="card"><div className="head"><h2>Students ({students.length})</h2><input placeholder="Search name, email or course..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      {students.length===0?<p className="muted">No students found.</p>:<div className="table"><table><thead><tr><th>Name</th><th>Email</th><th>Course</th><th>Age</th><th>Actions</th></tr></thead><tbody>
      {students.map(s=><tr key={s._id}><td>{s.name}</td><td>{s.email}</td><td>{s.course}</td><td>{s.age}</td><td><button onClick={()=>edit(s)}>Edit</button> <button className="danger" onClick={()=>remove(s._id)}>Delete</button></td></tr>)}
      </tbody></table></div>}
    </section>
  </main>
}