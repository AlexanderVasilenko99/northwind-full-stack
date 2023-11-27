import { useEffect, useState } from "react";
import bread from "../../../Assets/Images/bread.png";
import iceCoffee from "../../../Assets/Images/iceCoffe.png";
import "./Home.css";
import UseTitle from "../../../Utils/UseTitle";
import NotificationService from "../../../Services/NotificationService";
import ClockFc from "../ClockFc/ClockFc";
import ClockCc from "../ClockFc/ClockCc";

function Home(): JSX.Element {
    UseTitle("NorthWind");
    console.log("home rendered")
    const num = Math.floor(Math.random() * 2 + 1);
    const desserts = [
        { id: 1, name: "American apple pie", price: 69 },
        { id: 2, name: "Special brownie", price: 69 },
        { id: 3, name: "Banana ice cream", price: 420 },
        { id: 4, name: "Pancakes", price: 20 }
    ];
    function displaySale(): void {
        NotificationService.success("all products are currently on 50% sale");
    }
    function displaySale2(): void {
        setMsg("Banana ice cream now comes with hot white chocolate on top!");
    }
    function displaySale3(): void {
        setMsg2("yis");
    }
    const arr = useState<string>("test");
    let msg = arr[0];
    const setMsg = arr[1];


    const [msg2, setMsg2] = useState<string>("saleTest");
    // const arr2 = useState<string>("saleTest");
    // const msg2 = arr2[0];
    // const setMsg2 = arr2[1];


    const [curTime, setCurTime] = useState<string>();
    useEffect(() => {
        const intervalID = setInterval(() => {
            setCurTime(new Date().toLocaleString())
        }, 1000);

        return () => clearInterval(intervalID);
    }, [])

    // const [curTime, setCurTime] = useState<string>();
    // setInterval(() => {
    //     setCurTime(new Date().toLocaleString())
    // }, 1000)


    return (
        <div className="Home">
            <h2>Welcome to NorthWind Traders Inc website</h2>


            <ClockFc />
            <ClockCc format="24h"/>

            {/* <p>{curTime}</p> */}
            {/* opt1 conditional rendering */}
            {/* {num === 1 ? <img src={bread} /> : <img src={iceCoffee} />} */}

            {/* opt2 conditional rendering */}
            {/* {<img src={num === 1 ? bread : iceCoffee} />} */}

            {/* opt3 conditional rendering */}
            {/* {num === 1 && <img src={bread} />} */}
            {/* {num === 2 && <img src={iceCoffee} />} */}

            <p>Our Desserts: </p>
            {desserts.map(item => <span key={item.id}>{item.name} - {item.price}🍪<br /></span>)}
            <hr />
            <button onClick={displaySale}>Sale</button>
            <br /><br />
            <button onClick={displaySale2}>Sale2</button>
            <p>{msg}</p>

            <button onClick={displaySale3}>Sale3</button>
            <p>{msg2}</p>



        </div>
    );
}

export default Home;
