import './CurrencyComponent.css'
const CurrencyComponent = (props)=>{
    const {currencyChoice,selectCurrency,changeCurrency,amount,OnChangeAmount} = props   //รับค่าต่างๆ ใน props
            
   
    return(
        <div className="currency">
            {/* <select value={selectCurrency} onChange={changeCurrency}>
                {currencyChoice.map((choice)=>  // ดึงข้อมูลตัวเลือกของสกุลเงิน 
                    <option key={choice} value={choice}>{choice}</option>    //สร้างตัวเลือกของข้อมูลที่ดึงมากจาก API value ก็อ้างอิงจากการวนลูป ตัวเลือก ในสตัวแปร choice
                )}
            </select>                */}
                <input type="number" value={amount} onChange={OnChangeAmount} />      
                {/* จำนวนเงินที่กรอกเข้ามา */}
        </div>
    )
}


export default CurrencyComponent;