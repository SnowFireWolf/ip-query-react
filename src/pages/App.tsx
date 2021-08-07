import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CSS from 'csstype';
import logo from '../logo.png'

// components
import {
  Spinner,
  Card,
  Button,
  Input,
  Heading,
  TextDetails,
  Footer,
} from '../components'

//css
import st from '../css/tailwind.module.css'


interface apiResultType {
  message?: string,
  ip: string,
  success: boolean,
  type: string,
  continent: string,
  continent_code: string,
  country: string,
  country_code: string,
  country_flag: string,
  country_capital: string,
  country_phone: string,
  country_neighbours: string,
  region: string,
  city: string,
  latitude: string,
  longitude: string,
  asn: string,
  org: string,
  isp: string,
  timezone: string,
  timezone_name: string,
  timezone_dstOffset: string,
  timezone_gmtOffset: string,
  timezone_gmt: string,
  currency: string,
  currency_code: string,
  currency_symbol: string,
  currency_rates: string,
  currency_plural: string,
  completed_requests: string,
}

const maxWidth: CSS.Properties = {
  maxWidth: '720px'
};



const IndexPage = ({}, ipResult: apiResultType) => {
  let [searchString, setSearchString] = useState('');
  let [resultInfo, setResultInfo] = useState(ipResult);
  let [isLaoding, setLoading] = useState(true);
  let [cacheSearchString, setCacheSearchString] = useState('');



  // componentDidMount
  useEffect(() => {
    setResultInfo({ ...resultInfo, ['country_flag']: '' })

    // Your code here
    axios.get(`https://ipwhois.app/json/`)
      .then((res) => {
        let resultInfo = res.data
        setResultInfo(resultInfo)
      })
      .catch(() => {
      })
      .finally(() => setLoading(false))
  }, []);



  // onChange
  let onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value)
      //setValues({ ...values, [event.target.name]: event.target.value });
  };

  let onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(searchString !== undefined && searchString.length !== 0) {
      setLoading(true)

      // request 
      await axios.get(`https://ipwhois.app/json/${searchString}?lang=en`)
      .then((res) => {
        let resultInfo = res.data
        setResultInfo(resultInfo)
        setCacheSearchString(searchString)
      })
      .catch(() => {
      }).finally(() => setLoading(false))
      //if(cacheSearchString !== searchString) {
      //}
    } 
  };




  let resultCard
  if(isLaoding) {
    resultCard = '';
  } else {
    if(resultInfo.success === false) {
      
      resultCard = 
        <Card className={`${st['border-red-300']} ${st['bg-red-100']}`}>
          <Heading className={st['text-2xl']}>查詢錯誤</Heading>
          <p className={st['mt-4']}>{ resultInfo.message }</p>
        </Card>;

    } else {
      resultCard = 
        <Card>
          <Heading className={st['text-3xl']}>一般資訊</Heading>

          <div className={`${st['mt-5']} ${st['grid']} ${st['grid-cols-1']} ${st['sm:grid-cols-12']}`}>
            <div className={st['col-span-6']}>
              <Heading className={st['text-lg']}>IP 位址</Heading>
              <TextDetails>{ resultInfo.ip }</TextDetails>
            </div>

            <div className={st['col-span-6']}>
              <Heading className={st['text-lg']}>網際協定版本</Heading>
              <TextDetails>{ resultInfo.type }</TextDetails>
            </div>
          </div>


          <div className={`${st['mt-10']} ${st['text-3xl']}`}>地理位置</div>

          <div className={`${st['mt-3']} ${st['grid']} ${st['grid-cols-1']} ${st['sm:grid-cols-12']}`}>
            <div className={st['col-span-6']}>
              <Heading className={st['text-lg']}>緯度</Heading>
              <TextDetails>{ resultInfo.latitude }</TextDetails>
            </div>

            <div className={st['col-span-6']}>
              <Heading className={st['text-lg']}>經度</Heading>
              <TextDetails>{ resultInfo.longitude }</TextDetails>
            </div>
          </div>

          <div className={`${st['mt-5']} ${st['grid']} ${st['grid-cols-1']} ${st['sm:grid-cols-12']}`}>
            <div className={st['col-span-4']}>
              <Heading className={st['text-lg']}>地區</Heading>
              <TextDetails>
                <img className={st['rounded-md']} src={resultInfo.country_flag} width="68" height="48" alt="region_flag" />
                { resultInfo.country }, { resultInfo.country_code }
              </TextDetails>
            </div>

            <div className={st['col-span-4']}>
              <Heading className={st['text-lg']}>城市</Heading>
              <TextDetails>{ resultInfo.city }</TextDetails>
            </div>

            <div className={st['col-span-4']}>
              <Heading className={st['text-lg']}>國際電話區號</Heading>
              <TextDetails>{ resultInfo.country_phone }</TextDetails>
            </div>
          </div>



          <Heading className={`${st['mt-10']} ${st['text-3xl']}`}>時區資訊</Heading>

          <Heading className={`${st['mt-3']} ${st['text-lg']}`}>時區</Heading>
          <TextDetails>{ resultInfo.timezone }</TextDetails>

          <Heading className={`${st['mt-5']} ${st['text-lg']}`}>時區名稱</Heading>
          <TextDetails>{ resultInfo.timezone_name }</TextDetails>

          <div className={`${st['mt-5']} ${st['grid']} ${st['grid-cols-1']} ${st['sm:grid-cols-12']}`}>
            <div className={st['col-span-6']}>
              <Heading className={st['text-lg']}>GMT 時區</Heading>
              <TextDetails>{ resultInfo.timezone_gmt }</TextDetails>
            </div>

            <div className={st['col-span-6']}>
              <Heading className={st['text-lg']}>GMT 時區偏移</Heading>
              <TextDetails>{ resultInfo.timezone_gmtOffset }</TextDetails>
            </div>
          </div>



          <Heading className={`${st['mt-10']} ${st['text-3xl']}`}>ISP 資訊</Heading>
    
          <Heading className={st['mt-5']}>ASN</Heading>
          <TextDetails>{ resultInfo.asn }</TextDetails>

          <Heading className={`${st['mt-5']} ${st['text-lg']}`}>ORG</Heading>
          <TextDetails>{ resultInfo.org }</TextDetails>
          
          <Heading className={`${st['mt-5']} ${st['text-lg']}`}>網路供應商</Heading>
          <TextDetails>{ resultInfo.isp }</TextDetails>
          
          
          
          <Heading className={`${st['mt-10']} ${st['text-3xl']}`}>貨幣資訊</Heading>

          <div className={`${st['mt-5']} ${st['grid']} ${st['grid-cols-1']} ${st['sm:grid-cols-12']}`}>
            <div className={st['col-span-4']}>
              <Heading className={st['text-lg']}>貨幣</Heading>
              <TextDetails>{ resultInfo.currency }</TextDetails>
            </div>

            <div className={st['col-span-4']}>
              <Heading className={st['text-lg']}>貨幣代碼</Heading>
              <TextDetails>{ resultInfo.currency_code }</TextDetails>
            </div>

            <div className={st['col-span-4']}>
              <Heading className={st['text-lg']}>貨幣符號</Heading>
              <TextDetails>{ resultInfo.currency_symbol }</TextDetails>
            </div>
          </div>

        <Heading className={st['text-lg']}>匯率 USD to</Heading>
        <TextDetails>{ resultInfo.currency_rates }</TextDetails>

        <Heading className={st['text-lg']}>已完成的查詢次數</Heading>
        <TextDetails>{ resultInfo.completed_requests }</TextDetails>
      </Card>;
    }
  }




  return (
    <div className={[st['min-h-screen'], st['container'], st['mx-auto'], st['py-4'], st['bg-grey-100']].join(' ')} style={ maxWidth }>
      <img src={logo} className={st['mx-auto']} width="200px;" />

      <h2 className={`${st['mt-20']} ${st['text-center']} ${st['text-5xl']} ${st['font-bold']}`}>
        IP 位址資訊查詢
      </h2>

      { /*<h2 className="mt-20 text-center text-5xl font-bold">
        Result: { values.link } <br/>
        Loading: { loadingSpinner }
  </h2>*/ }

      <form onSubmit={onSubmit}>
        <Card>
          <div className={st['mt-1']}>
            <div className={`${st['font-bold']} ${st['text-xl']} ${st['mb-2']}`}>查詢</div>
            <Input
              id="searchString"
              name="searchString"
              placeholder="貼上 IP 位址，例如： 216.58.200.46"
              onChange={onChange}
            />
          </div>

          <p className={`${st['mt-2']} ${st['text-sm']} ${st['text-gray-500']}`}>
            現在查詢的 IP 是： { cacheSearchString }
          </p>

          <p className={`${st['text-sm']} ${st['text-gray-500']}`}>
            查詢任何 IP 位址，並顯示 IP 位址的結果
          </p>
        </Card>

        <Button submit={true}>
          { isLaoding ? <Spinner/> : <span>查詢</span>}
        </Button>
      </form>

      { resultCard }
      
      <Footer/>
    </div>
  )
}



export default IndexPage
