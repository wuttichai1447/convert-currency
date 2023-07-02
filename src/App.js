import CurrencyComponent from './component/CurrencyComponent';

import {useEffect, useState} from "react"
function App() {  
  // console.log("5")   
  const [currencyChoice,setcurrencyChoice] = useState([])  //สร้าง state เพื่อเก็บตัวเลือกของสกุลเงิน

 

  const [fromCurrency,setFromCurrency] = useState(["USD"])  // สร้าง state เพื่อรับค่าสกุลเงินต้นทาง
  const [toCurrency,setToCurrency] = useState(["THB"])      // สร้าง state เพื่อรับค่าสกุลเงินปลายทาง
  const [amount,setAmount] = useState(1)                    // สร้าง state  เพื่อรับค่าจำนวนเงิน
  const [exchangeRate,setExchangeRate] = useState(0)        // ส้ราง state เพื่อรับค่าอัตราการแลกเปลี่ยน
  const [checkFromCurrency,setChcekFromCurrency] = useState(true)  



  let fromAmout,toAmout


  if (checkFromCurrency) {
    fromAmout = amount
    toAmout = (amount*exchangeRate).toFixed(2)     //แปลงจำนวนเงินต้นทางเป็นจำนวนเงินปลายทาง
  }else{
    toAmout =  amount
    fromAmout = (amount/exchangeRate).toFixed(2)    //แปลงจำนวนเงินปลายทางเป็นจำนวนเงินต้นทาง    
  }
  useEffect(()=>{
    console.log('data')


    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`  // ลิ้งค์ที่อยู่ api
    fetch(url)
    .then(res=>res.json())
    // .then(data=>console.log(data.rates[toCurrency]))
    .then(data=>{
    setcurrencyChoice([...Object.keys(data.rates)])     //ดึงข้อมูลจาก API โดยกำหนดข้อมูลที่ต้องการมาเฉพาะ เรทของเงิน
    setExchangeRate(data.rates[toCurrency])  
  })
  // })
    //  setExchangerate(data.rates[toCurrency])
    //  .then(data=>setcurrencyChoice([...Object.keys(data.rates)]))
    
  },[fromCurrency,toCurrency])

const amountFromCurrency=(e)=>{
  setAmount(e.target.value)
  setChcekFromCurrency(true)
}

const amountToCurrency=(e)=>{
  setAmount(e.target.value)
  setChcekFromCurrency(false)   // ใช้ false เพื่อให้ทราบวว่า จำนวนเงินนี้เป็นจำนวนเงินที่ส่งเข้ามาจากปลายทาง
}
  // console.log('currencyChoice',currencyChoice)

  //CurrencyComponent  รายชื่อของสกุลเงิน
  return (
    <div>
      <h1>คำนวณเกรด</h1>
      <div className="container">   
          <CurrencyComponent currencyChoice={currencyChoice} 
          selectCurrency={fromCurrency} 
          changeCurrency={(e)=>setFromCurrency(e.target.value)} // เปลี่ยนแปลงค่า state ตามที่เลือกใน selecte
          amount={fromAmout} 
          OnChangeAmount = {amountFromCurrency} />
         <button class="favorite styled" type="button">
              click me
          </button>

          <div className="equal">=</div>
          <CurrencyComponent currencyChoice={currencyChoice} 
          selectCurrency={toCurrency} 
          changeCurrency={(e)=>setToCurrency(e.target.value)}   // เปลี่ยนแปลงค่า state ตามที่เลือกใน selecte
          amount={toAmout} 
          OnChangeAmount = {amountToCurrency}/>  
      </div>
    </div>
  )
}

export default App;
