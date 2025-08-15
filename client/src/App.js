import {useEffect,useState} from "react";
import axios from "axios";

const API = "http://localhost:4000/api";

function Pomodoro({onTick}) {
  const [sec,setSec] = useState(25*60);
  useEffect(()=>{ const t=setInterval(()=>{ setSec(s=>Math.max(0,s-1)); onTick&&onTick(); },1000); return ()=>clearInterval(t); },[onTick]);
  const mm = String(Math.floor(sec/60)).padStart(2,"0");
  const ss = String(sec%60).padStart(2,"0");
  return <h3>Pomodoro: {mm}:{ss}</h3>;
}

function App(){
  const [tasks,setTasks]=useState([]);
  const [title,setTitle]=useState("");
  const [quadrant,setQuadrant]=useState("Q2");
  const load=async()=> setTasks((await axios.get(`${API}/tasks`)).data);
  useEffect(()=>{ load(); },[]);
  const add=async()=>{ await axios.post(`${API}/tasks`,{title,quadrant}); setTitle(""); load(); };
  const toggle=async id=>{ const t=tasks.find(x=>x._id===id); await axios.patch(`${API}/tasks/${id}`,{done:!t.done}); load(); };

  return (
    <div style={{fontFamily:"system-ui",margin:"2rem"}}>
      <h2>Maximo – Focus & Priorities</h2>
      <Pomodoro />
      <div>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New task" />
        <select value={quadrant} onChange={e=>setQuadrant(e.target.value)}>
          <option>Q1</option><option>Q2</option><option>Q3</option><option>Q4</option>
        </select>
        <button onClick={add}>Add</button>
      </div>
      <ul>
        {tasks.map(t=>(
          <li key={t._id}>
            <input type="checkbox" checked={t.done} onChange={()=>toggle(t._id)} />
            [{t.quadrant}] {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
