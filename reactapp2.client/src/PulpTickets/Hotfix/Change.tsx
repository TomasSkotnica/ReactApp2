import React, {useState} from "react";
function Change(){
    const [n, setN] = useState("");
    const [pm, setPm] =useState("");
    const [ship, setShip] =useState("Delivery");
    //const [ship, setShip] =useState("");
    function hschange(event){
        setShip(event.target.value);
    }
    function hpmchange(event){
        setPm(event.target.value);
        console.log("hpmchange end");
    }
    function hnchange(event){
        console.log("n before " + n);
        setN(event.target.value);
        console.log("n after " + n);
    }
    return(<div>
        <label>
            <input type="radio" value="Pick Up" checked={ship==="Pick Up"}
            onChange={hschange}/>
            pickup
        </label><br/>
        <label>
            <input type="radio" value="Delivery" checked={ship==="Delivery"}
            onChange={hschange}/>
            Delivery
        </label>
        <p>shipping: {ship}</p>

        <select value={pm} onChange={hpmchange} name="" id="">
            <option value="">select an option</option>
            <option value="visa">visa</option>
        </select>
        <p>payment: {pm}</p>
        <input value={n} onChange={hnchange}/>
        <p>Name: {n}</p>
        <p>When value= curly braces(n) is not in input, then you get to the console: Warning: A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components </p>
    </div>)
}
export default Change