// types
import { apiResultType } from '../types';
import React, { useState, useEffect } from 'react'
import CSS from 'csstype';
import { apiRequest } from '../apiRequest';
import logo from '../logo.png'
// css module
import st from '../css/tailwind.module.css'
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



const maxWidth: CSS.Properties = {
  maxWidth: '720px'
};

const IndexPage = ({}, ipResult: apiResultType) => {
  let [searchString, setSearchString] = useState('');
  let [resultInfo, setResultInfo] = useState(ipResult);
  let [isLaoding, setLoading] = useState(true);
  let [cacheSearchString, setCacheSearchString] = useState('');
  let resultCard

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
      await apiRequest(searchString).then((res) => {
        let resultInfo = res.data
        setResultInfo(resultInfo)
        setCacheSearchString(searchString)
        // URL set query
        const url = new URL(window.location.href);
        url.searchParams.set('ip', searchString);
        window.history.pushState({}, '', url.href);

      })
      .catch(() => {
      }).finally(() => setLoading(false))
    } 
  };

  // componentDidMount
  useEffect(() => {
    setResultInfo({ ...resultInfo, ['country_flag']: '' })

    let searchParams = new URLSearchParams(window.location.search);
    let queryIpAddress = searchParams.get("ip");
    let searchString = "";

    if(queryIpAddress !== null) {
      searchString = queryIpAddress;
      setCacheSearchString(searchString)
    }

    apiRequest(searchString)
      .then((res) => {
        let resultInfo = res.data
        setResultInfo(resultInfo)
      })
      .catch(() => {
      })
      .finally(() => setLoading(false))
  }, []);



  if(isLaoding) {
    resultCard = '';
  } else {
    if(resultInfo.success === false) {
      
      resultCard = 
        <Card className={`${st['border-red-300']} ${st['bg-red-100']}`}>
          <Heading className={st['text-2xl']}>????????????</Heading>
          <p className={st['mt-4']}>{ resultInfo.message }</p>
        </Card>;

    } else {
      resultCard = 
        <Card>
          <Heading className={st['text-3xl']}>????????????</Heading>

          <div className={`${st['mt-5']} ${st['grid']} ${st['grid-cols-1']} ${st['sm:grid-cols-12']}`}>
            <div className={st['col-span-6']}>
              <Heading className={st['text-lg']}>IP ??????</Heading>
              <TextDetails>{ resultInfo.ip }</TextDetails>
            </div>

            <div className={st['col-span-6']}>
              <Heading className={st['text-lg']}>??????????????????</Heading>
              <TextDetails>{ resultInfo.type }</TextDetails>
            </div>
          </div>

          <div className={`${st['mt-10']} ${st['text-3xl']}`}>????????????</div>

          <div className={`${st['mt-3']} ${st['grid']} ${st['grid-cols-1']} ${st['sm:grid-cols-12']}`}>
            <div className={st['col-span-6']}>
              <Heading className={st['text-lg']}>??????</Heading>
              <TextDetails>{ resultInfo.latitude }</TextDetails>
            </div>

            <div className={st['col-span-6']}>
              <Heading className={st['text-lg']}>??????</Heading>
              <TextDetails>{ resultInfo.longitude }</TextDetails>
            </div>
          </div>

          <div className={`${st['mt-5']} ${st['grid']} ${st['grid-cols-1']} ${st['sm:grid-cols-12']}`}>
            <div className={st['col-span-4']}>
              <Heading className={st['text-lg']}>??????</Heading>
              <TextDetails>
                <img className={st['rounded-md']} src={resultInfo.country_flag} width="68" height="48" alt="region_flag" />
                { resultInfo.country }, { resultInfo.country_code }
              </TextDetails>
            </div>

            <div className={st['col-span-4']}>
              <Heading className={st['text-lg']}>??????</Heading>
              <TextDetails>{ resultInfo.city }</TextDetails>
            </div>

            <div className={st['col-span-4']}>
              <Heading className={st['text-lg']}>??????????????????</Heading>
              <TextDetails>{ resultInfo.country_phone }</TextDetails>
            </div>
          </div>

          <Heading className={`${st['mt-10']} ${st['text-3xl']}`}>????????????</Heading>

          <Heading className={`${st['mt-3']} ${st['text-lg']}`}>??????</Heading>
          <TextDetails>{ resultInfo.timezone }</TextDetails>

          <Heading className={`${st['mt-5']} ${st['text-lg']}`}>????????????</Heading>
          <TextDetails>{ resultInfo.timezone_name }</TextDetails>

          <div className={`${st['mt-5']} ${st['grid']} ${st['grid-cols-1']} ${st['sm:grid-cols-12']}`}>
            <div className={st['col-span-6']}>
              <Heading className={st['text-lg']}>GMT ??????</Heading>
              <TextDetails>{ resultInfo.timezone_gmt }</TextDetails>
            </div>

            <div className={st['col-span-6']}>
              <Heading className={st['text-lg']}>GMT ????????????</Heading>
              <TextDetails>{ resultInfo.timezone_gmtOffset }</TextDetails>
            </div>
          </div>

          <Heading className={`${st['mt-10']} ${st['text-3xl']}`}>ISP ??????</Heading>
    
          <Heading className={st['mt-5']}>ASN</Heading>
          <TextDetails>{ resultInfo.asn }</TextDetails>

          <Heading className={`${st['mt-5']} ${st['text-lg']}`}>ORG</Heading>
          <TextDetails>{ resultInfo.org }</TextDetails>
          
          <Heading className={`${st['mt-5']} ${st['text-lg']}`}>???????????????</Heading>
          <TextDetails>{ resultInfo.isp }</TextDetails>

          <Heading className={`${st['mt-10']} ${st['text-3xl']}`}>????????????</Heading>

          <div className={`${st['mt-5']} ${st['grid']} ${st['grid-cols-1']} ${st['sm:grid-cols-12']}`}>
            <div className={st['col-span-4']}>
              <Heading className={st['text-lg']}>??????</Heading>
              <TextDetails>{ resultInfo.currency }</TextDetails>
            </div>

            <div className={st['col-span-4']}>
              <Heading className={st['text-lg']}>????????????</Heading>
              <TextDetails>{ resultInfo.currency_code }</TextDetails>
            </div>

            <div className={st['col-span-4']}>
              <Heading className={st['text-lg']}>????????????</Heading>
              <TextDetails>{ resultInfo.currency_symbol }</TextDetails>
            </div>
          </div>

        <Heading className={st['text-lg']}>?????? USD to</Heading>
        <TextDetails>{ resultInfo.currency_rates }</TextDetails>

        <Heading className={st['text-lg']}>????????????????????????</Heading>
        <TextDetails>{ resultInfo.completed_requests }</TextDetails>
      </Card>;
    }
  }

  /* test
  <h2 className="mt-20 text-center text-5xl font-bold">
        Result: { values.link } <br/>
        Loading: { loadingSpinner }
  </h2>
  */
  return (
    <div className={[st['min-h-screen'], st['container'], st['mx-auto'], st['py-4'], st['bg-grey-100']].join(' ')} style={ maxWidth }>
      { /* logo */ }
      <img src={logo} className={st['mx-auto']} width="200px;" />
      { /* title */ }
      <h2 className={`${st['mt-20']} ${st['text-center']} ${st['text-5xl']} ${st['font-bold']}`}>
        IP ??????????????????
      </h2>
      { /* form */ }
      <form onSubmit={onSubmit}>
        <Card>
          <div className={st['mt-1']}>
            <div className={`${st['font-bold']} ${st['text-xl']} ${st['mb-2']}`}>??????</div>
            <Input
              id="searchString"
              name="searchString"
              placeholder="?????? IP ?????????????????? 216.58.200.46"
              onChange={onChange}
            />
          </div>
          { /* searching */ }
          <p className={`${st['mt-2']} ${st['text-sm']} ${st['text-gray-500']}`}>
            ??????????????? IP ?????? { cacheSearchString }
          </p>
          { /* tip */ }
          <p className={`${st['text-sm']} ${st['text-gray-500']}`}>
            ???????????? IP ?????????????????? IP ???????????????
          </p>
        </Card>
        { /* button */ }
        <Button submit={true}>
          { isLaoding ? <Spinner/> : <span>??????</span>}
        </Button>
      </form>
      { /* result component */ }
      { resultCard }
      <Footer/>
    </div>
  )
}



export default IndexPage
