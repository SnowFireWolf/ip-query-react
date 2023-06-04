import React from "react";
import styled from "@/windboxes";

import { ipApiResultType } from "@/types";
import Card from "./base/Card";
import Heading from "./base/Heading";
import TextDetails from "./TextDetails";



const styles = {
  heading1: styled('font-bold text-green-900'),
  infoField: styled('grid grid-cols-1 sm:grid-cols-12'),
  span6: styled('col-span-6'),
  span4: styled('col-span-4'),
  textLg: styled('text-lg'),
};



interface IProps {
  resultInfo: ipApiResultType;
  sx?: string;
}

const DetailTitle = ({ ...props }) => {
  const classNames = styled('font-bold text-green-900 text-xl');
  return (
    <div className={classNames} {...props} />
  )
}



export default function InfoCard({
  resultInfo,
  sx,
}: IProps) {
  return (
    <Card sx={sx}>
      <Heading className={styles.heading1}>一般資訊</Heading>

      <div className={styled('mt-5 ' + styles.infoField)}>
        <div className={styles.span6}>
          <DetailTitle>IP 位址</DetailTitle>
          <TextDetails>{resultInfo.ip}</TextDetails>
        </div>

        <div className={styles.span6}>
          <DetailTitle>網際協定版本</DetailTitle>
          <TextDetails>{resultInfo.type}</TextDetails>
        </div>
      </div>

      <div className={styled('mt-10 text-3xl')}>地理位置</div>

      <div className={styled('mt-3 ') + ' ' + styles.infoField}>
        <div className={styles.span6}>
          <DetailTitle>緯度</DetailTitle>
          <TextDetails>{resultInfo.latitude}</TextDetails>
        </div>

        <div className={styles.span6}>
          <DetailTitle>經度</DetailTitle>
          <TextDetails>{resultInfo.longitude}</TextDetails>
        </div>
      </div>

      <div className={styled('mt-5') + ' ' + styles.infoField}>
        <div className={styles.span4}>
          <DetailTitle>地區</DetailTitle>
          <TextDetails>
            <img className={styled('rounded-md')} src={resultInfo.country_flag} width="68" height="48" alt="region_flag" />
            {resultInfo.country}, {resultInfo.country_code}
          </TextDetails>
        </div>

        <div className={styles.span4}>
          <DetailTitle>城市</DetailTitle>
          <TextDetails>{resultInfo.city}</TextDetails>
        </div>

        <div className={styles.span4}>
          <DetailTitle>國際電話區號</DetailTitle>
          <TextDetails>{resultInfo.country_phone}</TextDetails>
        </div>
      </div>

      <Heading className={styled('mt-10 text-3xl')}>時區資訊</Heading>

      <Heading className={styled('mt-3 text-lg')}>時區</Heading>
      <TextDetails>{resultInfo.timezone}</TextDetails>
      
      <Heading className={styled('mt-5 text-lg')}>時區名稱</Heading>
      <TextDetails>{resultInfo.timezone_name}</TextDetails>

      <div className={styled('mt-5') + ' ' + styles.infoField}>
        <div className={styles.span6}>
          <DetailTitle>GMT 時區</DetailTitle>
          <TextDetails>{resultInfo.timezone_gmt}</TextDetails>
        </div>

        <div className={styles.span6}>
          <DetailTitle>GMT 時區偏移</DetailTitle>
          <TextDetails>{resultInfo.timezone_gmtOffset}</TextDetails>
        </div>
      </div>

      <Heading className={styled('mt-10 text-3xl')}>ISP 資訊</Heading>

      <Heading className={styled('mt-5')}>ASN</Heading>
      <TextDetails>{resultInfo.asn}</TextDetails>

      <Heading className={styled('mt-5 text-lg')}>ORG</Heading>
      <TextDetails>{resultInfo.org}</TextDetails>

      <Heading className={styled('mt-5 text-lg')}>網路供應商</Heading>
      <TextDetails>{resultInfo.isp}</TextDetails>

      <Heading className={styled('mt-10 text-3xl')}>貨幣資訊</Heading>

      <div className={styled('mt-5') + ' ' + styles.infoField}>
        <div className={styles.span4}>
          <DetailTitle>貨幣</DetailTitle>
          <TextDetails>{resultInfo.currency}</TextDetails>
        </div>

        <div className={styles.span4}>
          <DetailTitle>貨幣代碼</DetailTitle>
          <TextDetails>{resultInfo.currency_code}</TextDetails>
        </div>

        <div className={styles.span4}>
          <DetailTitle>貨幣符號</DetailTitle>
          <TextDetails>{resultInfo.currency_symbol}</TextDetails>
        </div>
      </div>

      <DetailTitle>匯率 USD to</DetailTitle>
      <TextDetails>{resultInfo.currency_rates}</TextDetails>

      <DetailTitle>已完成的查詢次數</DetailTitle>
      <TextDetails>{resultInfo.completed_requests}</TextDetails>
    </Card>
  );
}