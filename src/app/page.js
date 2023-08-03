"use client";
import { collection, addDoc, getDocs, querySnapshot, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
export default function Home() {
  const [allUser, setAllUser] = useState([]);
  const [user, setUser] = useState({ name: "", age: "" });

  const addUser = async (e) => {
    e.preventDefault();
    if (user.name !== "" && user.age !== "") {
      // setAllUser([...allUser, user]);
       await addDoc(collection(db, "User"), {
        name: user.name.trim(),
        age: user.age,
      });
      setUser({name: '', age: '',})
    }
  };

  useEffect(()=>{
    const q =  query(collection(db,'User'));
    const unsubscribe = onSnapshot(q, (querySnapshot) =>{
      let userArr = [];

      querySnapshot.forEach((doc)=> {
        userArr.push({ ...doc.data(), id: doc.id })
      })
      console.log("ddbb", userArr)
      setAllUser(userArr);
    })
  },[]);

  const deleteUser = async (id) =>{
    await deleteDoc(doc(db, 'User', id));
  }
  // console.log("here obj", allUser);

  const currentYear = new Date().getFullYear();
  return (
    <main className="h-screen w-full flex justify-center items-center">
      <section className="bg-gray-300 rounded-lg px-5 py-10 w-full md:w-[45%] lg:w-[40%] xl:w-[35%]">
        <form>
          <label className="font-bold">Type your Name:</label> <br />
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="px-4 py-2 my-2 w-full"
            placeholder="Enter Your Name"
          />
          <br />
          <label className="font-bold">Type your Age:</label> <br />
          <input
            type="number"
            value={user.age}
            onChange={(e) => setUser({ ...user, age: e.target.value })}
            className="px-4 py-2 my-2 w-full"
            placeholder="Enter Your birth Year eg: 1990"
          />
          <br />
          <button
            onClick={addUser}
            className="bg-blue-600 text-white hover:bg-blue-500 px-3 py-2 rounded"
          >
            Submit
          </button>
        </form>
        <div className="">
          {allUser.map((t, i) => 
          {
            const userAge = currentYear - t.age;
            return(
            <>
              <section className="my-5 px-3 py-2 bg-slate-400 rounded flex justify-between items-center" key={i}>
                <h1 className="font-bold text-xs">
                  {t.name} your age is: <span>{userAge}</span>
                </h1>
                <button onClick={()=> deleteUser(t.id)} className="font-bold text-xs bg-slate-500 px-2 py-1 rounded cursor-pointer hover:bg-[#738298] text-white">x</button>
              </section>
            </>
          )})}
        </div>
      </section>
    </main>
  );
}


