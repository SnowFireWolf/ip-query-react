import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CSS from 'csstype';
import logo from '../logo.png'

// components
import { Spinner, Footer } from '../components'



interface apiResultType {
  message?: String,
  ip: String,
  success: boolean,
  type: String,
  continent: String,
  continent_code: String,
  country: String,
  country_code: String,
  country_flag: String,
  country_capital: String,
  country_phone: String,
  country_neighbours: String,
  region: String,
  city: String,
  latitude: String,
  longitude: String,
  asn: String,
  org: String,
  isp: String,
  timezone: String,
  timezone_name: String,
  timezone_dstOffset: String,
  timezone_gmtOffset: String,
  timezone_gmt: String,
  currency: String,
  currency_code: String,
  currency_symbol: String,
  currency_rates: String,
  currency_plural: String,
  completed_requests: String,
}

const maxWidth: CSS.Properties = {
  maxWidth: '720px'
};



const IndexPage = ({}, ipResult: apiResultType) => {
  let [searchString, setSearchString] = useState(String);
  let [resultInfo, setResultInfo] = useState(ipResult);
  let [isLaoding, setLoading] = useState(true);
  let [cacheSearchString, setCacheSearchString] = useState(String);

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
      await axios.get(`http://ipwhois.app/json/${searchString}?lang=en`)
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



  // componentDidMount
  useEffect(() => {
    setLoading(true)
    // Your code here
    axios.get(`http://ipwhois.app/json/`)
      .then((res) => {
        let resultInfo = res.data
        setResultInfo(resultInfo)
      })
      .catch(() => {
      })
      .finally(() => setLoading(false))
  }, []);





  let resultCard
  if(isLaoding) {
    resultCard = '';
  } else {
    if(resultInfo.success === false) {
      
      resultCard = 
        <div
          className="mt-10 p-3 border border-red-300 bg-red-100 rounded-xl shadow-xl"
        >
          <div className="px-4 py-5">
            <div className="font-bold text-red-900 text-2xl">查詢錯誤</div>
            <p className="mt-4">{ resultInfo.message }</p>
          </div>
        </div>;

    } else {
      resultCard = 
        <div className="mt-10 p-3 border bg-white rounded-xl shadow-xl">
          <div className="px-4 py-5">
            <div className="font-bold text-green-900 text-3xl">一般資訊</div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-12">
                <div className="col-span-6">
                  <div className="text-lg font-bold text-green-900">IP 位址</div>
                  <div className="text-2xl font-bold text-red-800">{ resultInfo.ip }</div>
                </div>

                <div className="col-span-6">
                  <div className="text-lg font-bold text-green-900">網際協定版本</div>
                  <div className="text-2xl font-bold text-red-800">{ resultInfo.type }</div>
                </div>
              </div>


              <div className="mt-10 font-bold text-green-900 text-3xl">地理位置</div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-12">
                <div className="col-span-6">
                  <div className="text-lg font-bold text-green-900">緯度</div>
                  <div className="text-2xl font-bold text-red-800">{ resultInfo.latitude }</div>
                </div>

                <div className="col-span-6">
                  <div className="text-lg font-bold text-green-900">經度</div>
                  <div className="text-2xl font-bold text-red-800">{ resultInfo.longitude }</div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-12">
                <div className="col-span-4">
                  <div className="text-lg font-bold text-green-900">地區</div>
                  <div className="text-2xl font-bold text-red-800">
                    <img className="rounded-md" src={resultInfo.country_flag} width="68" height="48" alt="region_flag" />
                    { resultInfo.country }, { resultInfo.country_code }
                  </div>
                </div>

                <div className="col-span-4">
                  <div className="text-lg font-bold text-green-900">城市</div>
                  <div className="text-2xl font-bold text-red-800">{ resultInfo.city }</div>
                </div>

                <div className="col-span-4">
                  <div className="text-lg font-bold text-green-900">國際電話區號</div>
                  <div className="text-2xl font-bold text-red-800">{ resultInfo.country_phone }</div>
                </div>
              </div>



              <div className="mt-10 font-bold text-green-900 text-3xl">時區資訊</div>

              <div className="mt-3 text-lg font-bold text-green-900">時區</div>
              <div className="text-2xl font-bold text-red-800">{ resultInfo.timezone }</div>

              <div className="mt-5 text-lg font-bold text-green-900">時區名稱</div>
              <div className="text-2xl font-bold text-red-800">{ resultInfo.timezone_name }</div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-12">
                <div className="col-span-6">
                  <div className="text-lg font-bold text-green-900">GMT 時區</div>
                  <div className="text-2xl font-bold text-red-800">{ resultInfo.timezone_gmt }</div>
                </div>

                <div className="col-span-6">
                  <div className="text-lg font-bold text-green-900">GMT 時區偏移</div>
                  <div className="text-2xl font-bold text-red-800">{ resultInfo.timezone_gmtOffset }</div>
                </div>
              </div>



              <div className="mt-10 font-bold text-green-900 text-3xl">ISP 資訊</div>
        
              <div className="mt-5 text-lg font-bold text-green-900">ASN</div>
              <div className="text-2xl font-bold text-red-800">{ resultInfo.asn }</div>

              <div className="mt-5 text-lg font-bold text-green-900">ORG</div>
              <div className="text-2xl font-bold text-red-800">{ resultInfo.org }</div>
              
              <div className="mt-5 text-lg font-bold text-green-900">網路供應商</div>
              <div className="text-2xl font-bold text-red-800">{ resultInfo.isp }</div>
              
              
              
              <div className="mt-10 font-bold text-green-900 text-3xl">貨幣資訊</div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-12">
                <div className="col-span-4">
                  <div className="text-lg font-bold text-green-900">貨幣</div>
                  <div className="text-2xl font-bold text-red-800">{ resultInfo.currency }</div>
                </div>

                <div className="col-span-4">
                  <div className="text-lg font-bold text-green-900">貨幣代碼</div>
                  <div className="text-2xl font-bold text-red-800">{ resultInfo.currency_code }</div>
                </div>

                <div className="col-span-4">
                  <div className="text-lg font-bold text-green-900">貨幣符號</div>
                  <div className="text-2xl font-bold text-red-800">{ resultInfo.currency_symbol }</div>
                </div>
              </div>

              <div className="mt-5 text-lg font-bold text-green-900">匯率 USD to</div>
              <div className="text-2xl font-bold text-red-800">{ resultInfo.currency_rates }</div>

              <div className="mt-10 text-lg font-bold text-green-900">已完成的查詢次數</div>
              <div className="text-2xl font-bold text-red-800">{ resultInfo.completed_requests }</div>
          </div>
        </div>;
    }
  }




  return (
    <div className="min-h-screen container mx-auto py-4 bg-grey-100" style={ maxWidth }>

      <img src={logo} className="mx-auto" width="200px;" />

      <h2 className="mt-20 text-center text-5xl font-bold">
        IP 位址資訊查詢
      </h2>

      { /*<h2 className="mt-20 text-center text-5xl font-bold">
        Result: { values.link } <br/>
        Loading: { loadingSpinner }
  </h2>*/ }

      <form onSubmit={onSubmit}>
        <div className="mt-10 border bg-white rounded-xl shadow-lg">
          <div className="px-4 py-5 space-y-6 sm:p-6">
            <div className="mt-1">
              <div className="font-bold text-xl mb-2">查詢</div>
              <input
                className="mt-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                type="text"
                name="searchString"
                id="searchString"
                autoComplete="off"
                placeholder="貼上 IP 位址，例如： 216.58.200.46"
                onChange={onChange}
              />
            </div>

            <p className="mt-2 text-sm text-gray-500">
              現在查詢的 IP 是： { cacheSearchString }
            </p>

            <p className="text-sm text-gray-500">
              查詢任何 IP 位址，並顯示 IP 位址的結果
            </p>
          </div>
        </div>
        {
          // button
        }
        <button
          className="mt-5 w-full flex flex-row justify-center items-center p-3 bg-indigo-900 text-white rounded-lg shadow-lg focus:outline-none active:bg-indigo-800 disabled:opacity-80"
          type="submit"
        >
          { isLaoding ? <Spinner/> : <span>查詢</span>}
        </button>
  
      </form>
      
      { resultCard }
      
      <Footer/>
    </div>
  )
}



export default IndexPage
