// types
import { ipApiResultType } from '@/types';

import React, { useState, useEffect } from 'react';
import styled from '@/windboxes';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import Card from '@/components/base/Card';
import Input from '@/components/base/Input';
import Button from '@/components/base/Button';
import Spinner from '@/components/base/Spinner';

import InfoCard from '@/components/InfoCard';
import ErrorCard from '@/components/ErrorCard';

import { apiRequest } from '@/apiRequest';

import {
  containerClass,
} from './App.styled';
import Box from '@/components/system/Box';



const searchTitleClass = styled('font-bold text-xl mt-2 mb-2');
const placeholderTipClass = styled('mt-2 text-sm text-gray-500');



export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState({
    value: '',
    cache: '',
  });
  const [resultInfo, setResultInfo] = useState<ipApiResultType | null>(null);

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setSearch({
      ...search,
      value,
    });
  };

  const handleSubmit = async () => {
    const searchString = search.value;

    if (searchString !== undefined && searchString.length !== 0) {
      setIsLoading(true)

      try {
        const response = await apiRequest(searchString);
        const resultInfo = response.data;
        setResultInfo(resultInfo);

        setSearch({
          ...search,
          cache: searchString,
        });

        // URL set query
        const url = new URL(window.location.href);
        url.searchParams.set('ip', searchString);
        window.history.pushState({}, '', url.href);
      } catch (error) {
        console.error('[get error]', error);
      }

      setIsLoading(false);
    }
  };



  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryIpAddress = searchParams.get("ip");
    let searchString = "";

    if (queryIpAddress !== null) {
      searchString = queryIpAddress;

      setSearch({
        value: searchString,
        cache: searchString,
      });
    }

    apiRequest(searchString)
      .then((res) => {
        let resultInfo = res.data
        setResultInfo(resultInfo)
      })
      .catch(() => {
      })
      .finally(() => setIsLoading(false))
  }, []);



  return (
    <div
      className={containerClass}
      style={{
        maxWidth: '720px',
      }}
    >
      <Header />

      <Card>
        <div className={searchTitleClass}>查詢</div>

        <Input
          id="searchString"
          name="searchString"
          // placeholder="貼上 IP 位址，例如： 216.58.200.46，或是 google.com"
          onChange={handleInputOnChange}
          value={search.value}
        />

        <Box sx="mt-5">
          <p className={placeholderTipClass}>
            {
              search.cache.length !== 0
                ? `現在查詢的 IP 是：${search.cache}`
                : '在輸入匡貼上 IP 位址，例如： 216.58.200.46，或是 google.com'
            }
          </p>
          { /* tip */}
          <p className={placeholderTipClass}>
            查詢任何 IP 位址，並顯示 IP 位址的結果
          </p>
        </Box>
      </Card>

      <Button
        sx="mt-5"
        onClick={handleSubmit}
      >
        {
          isLoading
            ? <Spinner />
            : <span>查詢</span>
        }
      </Button>

      {
        !isLoading && resultInfo !== null && resultInfo.success === false
          ? <ErrorCard sx="mt-10" message={resultInfo.message} />
          : null
      }

      {
        !isLoading && resultInfo !== null
          ? <InfoCard sx="mt-10" resultInfo={resultInfo} />
          : null
      }

      <Footer />
    </div>
  );
}
